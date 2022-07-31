let targetDate=new Date("2025/05/20");
let timeArray=[]
window.setInterval(()=>{
    setTime();
    showTime();
}, 1000)


function setTime(){
timeArray.length = 0
let now=new Date();
let distanceDay=parseInt((targetDate-now)/1000/60/60/24); 
let distance=(targetDate-now)-(distanceDay*(1000*60*60*24));
let distanceHour=parseInt(distance/60/60/1000) 
let distanceMin=parseInt((distance-(distanceHour*60*60*1000))/1000/60)
let distanceSec=parseInt((distance-(distanceHour*60*60*1000)-(distanceMin*1000*60))/1000)
timeArray.push(distanceDay)
timeArray.push(distanceHour)
timeArray.push(distanceMin)
timeArray.push(distanceSec)
}

function showTime(){
    let day=document.querySelector(".time-d");
    day.dataset.timenum = timeArray[0];
    let hour=document.querySelector(".time-h");
    hour.dataset.timenum = timeArray[1];
    let min=document.querySelector(".time-m");
    min.dataset.timenum = timeArray[2];
    let sec=document.querySelector(".time-s");
    sec.dataset.timenum = timeArray[3];
}
