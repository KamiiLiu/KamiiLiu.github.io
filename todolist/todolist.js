const txt = document.querySelector('.txt');
const save = document.querySelector('.saveBtn');
const list = document.querySelector('.list');
let data = [];
let count = true;

list.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") == "delete") {
        console.log(e.target)
        delectData(e);
        showData();
        saveDataInLocal();
    }
    if (e.target.getAttribute("class") == "reset") {
        whiteData(e);
    }
    if (e.target.getAttribute("class") == "set") {
        resetData(e);
        showData();
        saveDataInLocal();
    }
});
save.onclick = saveDataInArray;

function saveDataInArray() {
    if (txt.value != "") {
        data.push(txt.value);
        saveDataInLocal();
        showData();
    }
}

function saveDataInLocal() {
    localStorage.clear();
    data.forEach((e, i) => {
        localStorage.setItem(i, e);
    })
}
function delectData(e) {
    localStorage.removeItem(e.target.dataset.num);
    data.splice(e.target.dataset.num, 1)
}
function whiteData(e) {
    if (count) {
        count = !count
        e.path[1].innerHTML = `<input type="text" class="txt" value="${localStorage.getItem(e.target.dataset.num)}"> <input class="delete" type="button" data-num="${e.target.dataset.num}" value="刪除"><input class="set" type="button" data-num="${e.target.dataset.num}" value="確定">`
    }
}
function resetData(e) {
    count = !count
    data[e.target.dataset.num]=e.path[1].children[0].value;
}
function showData() {
    list.innerHTML = "";
    data.forEach((e, i) => {
        let li = document.createElement("li");
        li.innerHTML = `${e} <input class="delete" type="button" data-num="${i}" value="刪除"><input class="reset" type="button" data-num="${i}" value="修改">`
        list.appendChild(li);
    })
}

// function renderData(){
//   let str = '';
//   data.forEach(function (item,index) {
//     str+=`<li>${item.content} <input class="delete" type="button" data-num="${index}" value="刪除待辦"></li>`
//   })
//   list.innerHTML = str;
// }



// save.addEventListener('click',function(e){
//   if (txt.value=="") {
//     alert("請輸入內容");
//     return;
//   }
//   let obj = {};
//   obj.content = txt.value
//   data.push(obj);
//   renderData();
// })
// // 刪除待辦功能
// list.addEventListener("click",function(e){
//   if(e.target.getAttribute("class")!=="delete"){
//     return;
//   }
//   let num = e.target.getAttribute("data-num");
//   console.log(num);
//   data.splice(num,1);
//   alert("刪除成功！");
//   renderData();
// })
