//1.
let trainArea = document.querySelector(".down-wrap");
let train = document.querySelector(".train");
let trainBlock = document.querySelector(".train-wrap");
let peopleArea = document.querySelectorAll(".rail-box");
let btnNext = document.querySelector(".question-li button");
let train_btn = document.querySelectorAll(".up-wrap button");
let choose_box = document.querySelectorAll(".box");
let que_index=0;
let questionList=creatAns(4, 0, 3);
//2.
const pData = [
    {
        id: 0,
        type: "hum-man",
        imglink: "./icon/b01.png"
    },
    {
        id: 1,
        type: "hum-man",
        imglink: "./icon/b02.png"
    },
    {
        id: 2,
        type: "hum-man",
        imglink: "./icon/b03.png"
    },
    {
        id: 3,
        type: "hum-man",
        imglink: "./icon/b04.png"
    },
    {
        id: 4,
        type: "hum-female",
        imglink: "./icon/g01.png"
    },
    {
        id: 5,
        type: "hum-female",
        imglink: "./icon/g02.png"
    },
    {
        id: 6,
        type: "hum-female",
        imglink: "./icon/g03.png"
    },
    {
        id: 7,
        type: "gohst",
        imglink: "./icon/g.png"
    },
];
const qData = [
    {
        Q: "火車往哪開？",
        a:
            [{
                C: "世界上，年收入前1%的富人",
                indexp: 3,
                type: "hum"
            },
            {
                C: "世界上，年收入最後1%的窮人",
                indexp: 3,
                type: "hum"
            }]
    },
    {
        Q: "鐵軌A上有一個易碎的神燈（且除了你以外，沒人注意到），鐵軌B上是5個活生生的人？",
        a:
            [{
                C: "火車開向神燈，神燈碎裂！",
                indexp: 1,
                type: "gohst"
            },
            {
                C: "火車開向路人，神燈精靈感恩您，讓您許三個願望",
                indexp: 3,
                type: "hum"
            }]
    },
    {
        Q: "撞哪條？",
        a:
            [{
                C: "這輩子最愛的人",
                indexp: 1,
                type: "hum"
            },
            {
                C: "100位活著的諾貝爾獎得主",
                indexp: 5,
                type: "hum"
            }]
    },
    {
        Q: "遙遠且你完全看不到的地方鐵軌上躺著5個人，但離你咫尺之遙也躺一個人，你能預期如果他死了，血肉模糊的屍塊會噴的你到處都是",
        a:
            [{
                C: "讓列車開向1個人",
                indexp: 1,
                type: "hum"
            },
            {
                C: "讓列車開向5個人，眼不見為淨",
                indexp: 5,
                type: "hum"
            }]
    },
    {
        Q: "離你近的鐵道上，躺著您這輩子最討厭的人，但火車行駛有2%的機率出軌把您也一併撞死。鐵軌的另一側是無辜善良的一群村民",
        a:
            [{
                C: "撞過來，賭一把！",
                indexp: 1,
                type: "hum"
            },
            {
                C: "攻擊村莊！",
                indexp: 3,
                type: "hum"
            }]
    }
];
//3.
window.onload = () => {
    createPeople(qData[questionList[que_index]]);
    settitle(qData[questionList[que_index]]);
    trainSituation();
    peopleSituation();
    trainGo();
    lineHover();
    reStart();
    gameStart();
}


//4.
function gameStart() {
    btnNext.style.display = "none";
}
function creatAns(max, min, count) {
    let ansArray = [];
    do {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (ansArray.find(x => x == num) == undefined) {
            ansArray.push(num);
        }
    } while (ansArray.length < count);
    return ansArray;
}
function trainSituation() {
    let trainStartX = trainArea.getBoundingClientRect().width / 6;
    let trainStartY = trainArea.getBoundingClientRect().height / 2 - 25 - 20;
    train.style.top = `${trainStartY}px`;
    train.style.left = `${trainStartX}px`;
}
function peopleSituation() {
    let peopleArray = document.querySelectorAll(".people");
    peopleArray.forEach((iten, index) => {
        let peopleX = peopleArea[index].getBoundingClientRect().width / 4;
        let peopleY = peopleArea[index].getBoundingClientRect().height / 2 - 25;
        iten.style.top = `${peopleY}px`;
        iten.style.left = `${peopleX}px`;
    })
}
function trainGo() {
    train_btn[0].addEventListener("click", function () {
        MovePath(0, -1);
        train_btn[0].disabled = "disabled";
        train_btn[1].disabled = "disabled";
        peopleArea[0].classList.add("line-l-down");
        peopleArea[1].style.opacity = "0.5";
        trainBlock.classList.add("line-l");
        choose_box[1].classList.add("disable");
    });
    train_btn[1].addEventListener("click", function () {
        MovePath(1, 1);
        train_btn[0].disabled = "disabled";
        train_btn[1].disabled = "disabled";
        console.log("a");
        peopleArea[1].classList.add("line-l-up");
        peopleArea[0].style.opacity = "0.5";
        trainBlock.classList.add("line-l");
        choose_box[0].classList.add("disable");
    })
}
function MovePath(i, j) {
    let peopleArray = document.querySelectorAll(".people");
    trainMove(trainArea.getBoundingClientRect().width / 6, trainBlock.getBoundingClientRect().width - 25);
    setTimeout(() => {
        trainDirChange(i, j)
    }, 2000)
    setTimeout(() => {
        trainMove(trainBlock.getBoundingClientRect().width - 25, peopleArea[i].getBoundingClientRect().width / 4 + trainArea.getBoundingClientRect().width / 2 - 50);
    }, 2700)
    setTimeout(() => {
        KillPerson(i);
    }, 5000)
    setTimeout(() => {
        trainMove(parseInt(train.style.left), trainArea.getBoundingClientRect().width - 50);
    }, peopleArray[i].childElementCount * 500 + 5000)
    setTimeout(() => {
        btnNext.style.display = "block";
    }, peopleArray[i].childElementCount * 500 + 8000)
}
function trainMove(start, end) {
    let distance = end - start;
    let speed = distance / 100
    for (let i = 1; i < 100; i++) {
        (function (t) {
            setTimeout(() => {
                start += speed;
                train.style.left = `${start}px`;
            }, 20 * t)
        })(i)
    }
}
function trainDirChange(i, a) {
    let distance = a * (peopleArea[i].getBoundingClientRect().height / 2);
    let speed = distance / 20
    let start = trainArea.getBoundingClientRect().height / 2 - 45;
    for (let i = 0; i < 20; i++) {
        (function (t) {
            setTimeout(() => {
                start += speed;
                train.style.top = `${start}px`;
            }, 30 * t)
        })(i)
    }
}
function KillPerson(index) {
    let peopleArray = document.querySelectorAll(".people");
    let killnumber = peopleArray[index].childElementCount;
    let position = parseInt(train.style.left);
    for (let i = 0; i < killnumber; i++) {
        (function (t) {
            setTimeout(() => {
                position += 50;
                [...peopleArray[index].children][i].style.opacity = '0';
                train.style.left = `${position}px`
            }, 500 * t)
        })(i)
    }
}
function lineHover() {
    choose_box.forEach((iten, index) => {
        iten.onmousemove = function () {
            peopleArea[index].classList.add("choose");
            trainBlock.classList.add("choose");
        }
        iten.onmouseleave = function () {
            peopleArea[index].classList.remove("choose");
            trainBlock.classList.remove("choose");
        }
    })
}
function reStart() {
    btnNext.addEventListener("click", function () {
        reStartSet();
        train_btn[0].removeAttribute("disabled", "disabled");
        train_btn[1].removeAttribute("disabled", "disabled");
        peopleArea.forEach((iten, index) => {
            iten.classList.remove("choose");
            iten.style.opacity = "1";
            trainBlock.classList.remove("choose");
        })
        choose_box.forEach((iten) => {
            iten.classList.remove("disable");

        })
        
    });
}
function creatAns(max, min, count) {
    let ansArray = [];
    do {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (ansArray.find(x => x == num) == undefined) {
            ansArray.push(num);
        }
    } while (ansArray.length < count);
    return ansArray;
}
function settitle(data) {
    let h2 = document.querySelector("h2");
    let h3s = document.querySelectorAll("h3");
    h2.innerText=data.Q
    h3s.forEach((iten,index)=>{
        iten.innerText=data.a[index].C;
    })
}
function createPeople(data) {
    peopleArea.forEach((iten, index) => {
        let imgRowList = pData.filter((x) => x.type.includes(data.a[index].type));
        let imgList=creatAns(imgRowList.length-1, 0, data.a[index].indexp);
        let peoplelist = document.createElement("div");
        for (let i = 0; i < data.a[index].indexp; i++) {
            let person = document.createElement("div");
            person.setAttribute("class", "person");
            let personImg = document.createElement("img");
            personImg.src = imgRowList[imgList[i]].imglink;
            person.appendChild(personImg);
            peoplelist.appendChild(person);
        }
        iten.appendChild(peoplelist);
        peoplelist.setAttribute("class", "people col")
    })
}
function reStartSet(){
    que_index+=1;
    let h1=document.querySelector("h1");
    h1.innerText=`Trolley Problem(${que_index+1}/3)`
    if(que_index<3){
    peopleArea.forEach((iten)=>{
        iten.innerHTML="";
    })
    trainSituation();
        peopleSituation();
        gameStart();
        createPeople(qData[questionList[que_index]]);
        settitle(qData[questionList[que_index]]);
    }else{
        let ending=document.querySelector(".wrap-mask");
        ending.innerHTML="<h1>GoodGame</h1>"
    }
}