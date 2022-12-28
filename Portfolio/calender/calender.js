//前置作業
let dataCollection = [{
    data_m: true,
    data_day: "6",
    date_todo: [true, true, false],
    data_mon: 0,
    data_year: 2023,
    data_diary: "今天送親戚孩子玩具，小朋友超喜歡我^O^"
}, {
    data_m: true,
    data_day: "15",
    date_todo: [true, false, false],
    data_mon: 0,
    data_year: 2023,
    data_diary: "老公今天加班，美麗的我獨守空閨QQ"
}, {
    data_m: false,
    data_day: "7",
    date_todo: [true, true, false],
    data_mon: 0,
    data_year: 2023,
    data_diary: "把老公的模型拿去送給親戚朋友，家裡終於少了一些垃圾"
}, {
    data_m: false,
    data_day: "16",
    date_todo: [true, false, true],
    data_mon: 0,
    data_year: 2023,
    data_diary: "老公不在好寂寞，邀請老王來陪我><"
}];

//變數區域
let btn = document.querySelector(".btn-arr");
let dayblock = document.querySelector(".days");
let maincard = document.querySelector(".main-card");
let last = document.querySelector("#last");
let next = document.querySelector("#next");
let monthPick = document.querySelector("#month-pick");
let yearPick = document.querySelector("#year-pick");
let mainMenu = document.querySelector(".main-menu");
let mode = true;
//手打資料表ㄏㄏ
const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let nowday = new Date();
let day = nowday.getDate();
let Lmonth = nowday.getMonth() + 1;
let month = nowday.getMonth();
let monthEng = monthArray[nowday.getMonth()];
let year = nowday.getFullYear();
//menu
let dayArray = ["上廳堂", "下廚房", "進臥房"]
let nightArray = ["曬太陽", "賣家當", "找老王"]
let daytodolistArray = new Array(dayArray.length).fill(false);
let nighttodolistArray = new Array(nightArray.length).fill(false);
//window.onload
window.onload = () => {
    dataCollection.forEach((e) => {
        storageKey = `${e.data_m}-${e.data_day}-${e.data_mon}-${e.data_year}`;
        localStorage.setItem(storageKey, JSON.stringify(e));
    })
    layOutSwitch();
    btnSwitch();
    createCalendar();
    yearSwitch();
    monthSwitch();
    mainManuPoP();
    saveData();
    ReadMemory();
    cancelMenu();
    deletelBtn();
}

//韓式庫
//創建日曆的韓式
function createCalendar() {
    yearPick.textContent = year;
    monthPick.textContent = monthArray[nowday.getMonth()];
    daySwitch(year, month);
}
//轉換年份的韓式
function yearSwitch() {
    let yearSwitch = document.querySelectorAll(".year-wrap>div")
    yearSwitch[0].onclick = () => {
        year -= 1;
        dayblock.innerHTML = "";
        daySwitch(year, month)
        yearPick.textContent = year;
    }
    yearSwitch[1].onclick = () => {
        year += 1;
        dayblock.innerHTML = "";
        daySwitch(year, month)
        yearPick.textContent = year;
    }
    let content = document.querySelectorAll(".content");
}
function monthSwitch() {
    let monthSwitch = document.querySelectorAll(".month>div")
    monthSwitch[0].onclick = () => {
        month -= 1;
        if (month >= 0) {
            dayblock.innerHTML = "";
            daySwitch(year, month)
            monthPick.textContent = monthArray[month];
        }
    }
    monthSwitch[1].onclick = () => {
        month += 1;
        if (month < 12) {
            dayblock.innerHTML = "";
            daySwitch(year, month)
            monthPick.textContent = monthArray[month];
        }
    }
}
function daySwitch(year, month) {
    let startDay = new Date(year, month, 1).getDay()
    let dayLength = new Date(year, month + 1, 0).getDate()
    for (let i = 0; i < startDay; i++) {
        createDocument("div", dayblock, null);
    }
    for (let i = 0; i < dayLength; i++) {
        createDocument("div", dayblock, i + 1, "dds");
    }
    mainManuPoP();
}
//排版的韓式
function btnSwitch() {
    let ball = document.querySelector(".btn-box .ball");
    let eyes = document.querySelectorAll(".btn-box i");
    btn.addEventListener("click", function () {
        if (ball.style.left != "68%") {
            eyes[0].style.color = "#ebcac0";
            eyes[1].style.color = "#fff";
            maincard.style.left = "5%";
            ball.style.left = "68%";
            mainMenu.style.left = "55%"
            mode = !mode;
        }
        else {
            eyes[1].style.color = "#ebcac0";
            eyes[0].style.color = "#fff";
            maincard.style.left = "45%";
            ball.style.left = "10%";
            mainMenu.style.left = "0%";
            mode = !mode
        };
    })
}
function layOutSwitch() {
    let daymode = document.querySelectorAll(".dayMode")
    btn.addEventListener("click", function () {
        daymode.forEach((i) => {
            i.classList.toggle("nightMode");
        })
    })
}
function createDocument(e, fatherNode, text, classN = null) {
    let el = document.createElement(e);
    fatherNode.append(el);
    el.innerText = text;
    el.classList.add(classN);
}
function todolist() {
    let dl = document.querySelector(".to-do-list");
    dl.innerHTML = "";
    let dt = document.createElement("dt");
    dt.innerText = "待辦清單";
    dl.appendChild(dt);
    if (mode) {
        for (

            let i = 0; i < dayArray.length; i++) {
            let dd = document.createElement("dd");
            dd.innerText = dayArray[i];
            dl.appendChild(dd);
        }
    } else {
        for (let i = 0; i < nightArray.length; i++) {
            let dd = document.createElement("dd");
            dd.innerText = nightArray[i];
            dl.appendChild(dd);
        }
    }
}
function todolistSelect() {
    let dds = document.querySelectorAll("dd");
    let dayn = document.querySelector(".date-show>.day").innerText;
    let datas = JSON.parse(localStorage.getItem(`${mode}-${dayn}-${month}-${year}`));
    if (datas != null) {
        dds.forEach((e, i) => {
            if (datas.date_todo[i]) {
                e.style.backgroundColor = "#653c29";
                e.style.color = "#ebcac0";
            }
        })
    }
    dds.forEach((e, i) => {
        e.onclick = () => {
            if (mode) {
                daytodolistArray[i] = !daytodolistArray[i];
                if (daytodolistArray[i]) {
                    e.style.backgroundColor = "#653c29";
                    e.style.color = "#ebcac0";
                } else {
                    e.style.backgroundColor = "#e7cdc4";
                    e.style.color = "#ffffff";
                }
            } else {
                nighttodolistArray[i] = !nighttodolistArray[i];
                if (nighttodolistArray[i]) {
                    e.style.backgroundColor = "#653c29";
                    e.style.color = "#ebcac0";
                } else {
                    e.style.backgroundColor = "#e7cdc4";
                    e.style.color = "#ffffff";
                }
            }
        }
    })
}
function mainManuPoP() {
    ReadMemory();
    let diaryMode = document.querySelector(".date-show").lastElementChild;
    let days = document.querySelectorAll(".dds");
    let choseday = document.querySelector(".date-show>.day");
    let mon_year = document.querySelector(".date-show>.year-month");
    days.forEach((e, index) => {
        e.onclick = () => {
            let input = document.querySelector("#diary");
            if (mode) {
                diaryMode.innerText = "我是個好人";
            } else {
                diaryMode.innerText = "我是個壞人";
            }
            let data = JSON.parse(localStorage.getItem(`${mode}-${index + 1}-${month}-${year}`));
            input.value = "";
            if (data != null) {
                input.value = data.data_diary;
            }
            choseday.innerText = index + 1;
            mon_year.innerText = `${monthArray[month]} ${year}`;
            mainMenu.style.opacity = "1";
            todolist();
            todolistSelect();
        }
    })
}
function saveData() {
    let savebtn = document.querySelector("#submitBtn");
    let diary = document.querySelector("#diary");
    savebtn.onclick = () => {
        mainMenu.style.opacity = "0";
        let arr = [];
        if (mode) {
            arr = daytodolistArray
        } else {
            arr = nighttodolistArray
        }
        let onedata = {
            data_m: mode,
            data_day: document.querySelector(".date-show>.day").innerText,
            date_todo: arr,
            data_mon: month,
            data_year: year,
            data_diary: diary.value
        };
        if (localStorage.getItem(`${onedata.data_m}-${onedata.data_day}-${onedata.data_mon}-${onedata.data_year}`) == null) {
            let storageKey = `${onedata.data_m}-${onedata.data_day}-${onedata.data_mon}-${onedata.data_year}`;
            localStorage.setItem(storageKey, JSON.stringify(onedata));
        }else{
            let loghistory =JSON.parse(localStorage.getItem(`${onedata.data_m}-${onedata.data_day}-${onedata.data_mon}-${onedata.data_year}`))
            loghistory.data_m=mode;
            loghistory.data_day=document.querySelector(".date-show>.day").innerText;
            loghistory.date_todo=arr;
            loghistory.data_mon=month;
            loghistory.data_year=year;
            loghistory.data_diary=diary.value;
            let storageKey = `${loghistory.data_m}-${loghistory.data_day}-${loghistory.data_mon}-${loghistory.data_year}`;
            localStorage.setItem(storageKey, JSON.stringify(loghistory));
        }

        ReadMemory();
    }
}
function cancelMenu() {
    let cancelBtn = document.querySelector("#cancelBtn");
    cancelBtn.onclick = () => {
        mainMenu.style.opacity = "0";
    }
}
function ReadMemory() {
    let dayLength = new Date(year, month + 1, 0).getDate();
    let diaryBox = document.querySelector(".schedule-card.sun>.content")
    let diaryBoxN = document.querySelector(".schedule-card.night>.content")
    diaryBox.innerHTML = "";
    diaryBoxN.innerHTML = "";
    for (let i = 0; i < dayLength; i++) {
        let data = JSON.parse(localStorage.getItem(`true-${i + 1}-${month}-${year}`));
        let dataN = JSON.parse(localStorage.getItem(`false-${i + 1}-${month}-${year}`));
        if (data != null) {
            let msg = document.createElement("div");
            let msgday = document.createElement("div");
            let msgtext = document.createElement("div");
            let msgtextbox = document.createElement("div");
            msg.setAttribute("class", "msg col-sb");
            msgday.setAttribute("class", "msg-day");
            msgtext.setAttribute("class", "msg-text");
            diaryBox.appendChild(msg);
            msg.appendChild(msgday);
            msg.appendChild(msgtext);
            let msgp = document.createElement("p");
            msgp.innerHTML = data.data_diary;
            msgday.innerHTML = data.data_day;
            if (data.date_todo.includes(true)) {
                for (let j = 0; j < data.date_todo.length; j++) {
                    if (data.date_todo[j]) {
                        let msgtag = document.createElement("div");
                        msgtag.setAttribute("class", "tag-box");
                        msgtag.innerHTML = dayArray[j];
                        msgtextbox.appendChild(msgtag);
                    }
                }
                msgtext.appendChild(msgtextbox);
                msgtextbox.setAttribute("class", "msgtextbox col-sb");
            }
            msgtext.appendChild(msgp);
        }
        if (dataN != null) {
            let msgtextbox = document.createElement("div");
            let msg = document.createElement("div");
            let msgday = document.createElement("div");
            let msgtext = document.createElement("div");
            msg.setAttribute("class", "msg col-sb");
            msgday.setAttribute("class", "msg-day");
            msgtext.setAttribute("class", "msg-text");
            diaryBoxN.appendChild(msg);
            msg.appendChild(msgday);
            msg.appendChild(msgtext);
            let msgp = document.createElement("p");
            msgp.innerHTML = dataN.data_diary;
            msgday.innerHTML = dataN.data_day;
            if (dataN.date_todo.includes(true)) {
                for (let j = 0; j < dataN.date_todo.length; j++) {
                    if (dataN.date_todo[j]) {
                        let msgtag = document.createElement("div");
                        msgtag.setAttribute("class", "tag-box");
                        msgtag.innerHTML = nightArray[j];
                        msgtextbox.appendChild(msgtag);
                    }
                }
                msgtext.appendChild(msgtextbox);
                msgtextbox.setAttribute("class", "msgtextbox col-sb");
            }
            msgtext.appendChild(msgp);
        }

    }

}
function deletelBtn(){
    let deletelBtn = document.querySelector("#deletelBtn");
    deletelBtn.onclick = () => {
        localStorage.removeItem(`${mode}-${document.querySelector(".date-show>.day").innerText}-${month}-${year}`);
        mainMenu.style.opacity = "0";
        ReadMemory();
    }
}