const txt = document.querySelector('.txt');
const save = document.querySelector('.saveBtn');
const list = document.querySelector('.list');
let e = document.querySelectorAll(".cbox");
let data = [];
let count = true;

window.onload = () => {
    recycleData();
    showData();
}

list.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") == "delete") {
        delectData(e);
        saveDataInLocal();
        showData();
    }
    if (e.target.getAttribute("class") == "reset") {
        whiteData(e);
    }
    if (e.target.getAttribute("class") == "set") {
        resetData(e);
        saveDataInLocal();
        showData();
        
    }
    if (e.target.getAttribute("class") == "cbox") {
        resetUndo(e);
        saveDataInLocal();
        showData();
    }
});

save.onclick = saveDataInArray;

function saveDataInArray() {
    if (!count) {
        count = !count
    }
    if (txt.value != "") {
        let obj = {};
        obj["undo"] = false;
        obj["txt"] = txt.value
        data.push(obj);
        console.log(data)
        console.log(localStorage.length)
        saveDataInLocal();
        showData();
        txt.value = null;
    }
}

function saveDataInLocal() {
    localStorage.clear();
    data.forEach((e, i) => {
        localStorage.setItem(i, JSON.stringify(e));
    })
}
function delectData(e) {
    if (!count) {
        count = !count
    }
    data.splice(e.target.dataset.num, 1)
    //localStorage.removeItem(`${e.target.dataset.num}`, JSON.stringify(e));    
}
function whiteData(e) {
    if (count) {
        count = !count
    }
    e.path[1].innerHTML = `<input type="text" class="txt" value="${JSON.parse(localStorage.getItem(`${e.target.dataset.num}`)).txt}"> <input class="delete" type="button" data-num="${e.target.dataset.num}" value="刪除"><input class="set" type="button" data-num="${e.target.dataset.num}" value="確定">`
}
function resetData(e) {
    count = !count
    data[e.target.dataset.num].txt = e.path[1].children[0].value;
}
function resetUndo(e) {
    //console.log(e.target.value)
    data[e.path[1].children[2].dataset.num].undo = !data[e.path[1].children[2].dataset.num].undo;
}
function recycleData() {
    for (let i = 0; i < localStorage.length; i++) {
        let value = JSON.parse(localStorage.getItem(i));
        data.push(value)
    }
}
function showData() {
    list.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let lie = document.createElement("li");
        let value = JSON.parse(localStorage.getItem(i));
        console.log(value.undo=="true")
        console.log(value)
        if (value.undo) {
            lie.classList.add("checked");
            lie.innerHTML = `<input type="checkbox" class="cbox" checked="true">${value.txt} <input class="delete" type="button" data-num="${i}" value="刪除"><input class="reset" type="button" data-num="${i}" value="修改">`
        } else {
            lie.classList.remove("checked");
            lie.innerHTML = `<input type="checkbox" class="cbox">${value.txt} <input class="delete" type="button" data-num="${i}" value="刪除"><input class="reset" type="button" data-num="${i}" value="修改">`
        }
        list.appendChild(lie);
    }
}
