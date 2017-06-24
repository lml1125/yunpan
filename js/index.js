//右边的高度 = 浏览器的高度 - 头部的高度
var header = document.querySelector(".header");
var welcome = document.querySelector(".welcome");
var main = document.querySelector(".main");
var left =document.querySelector(".left");
var right =document.querySelector(".right");
    welcome.style.height = main.style.height = window.innerHeight - header.getBoundingClientRect().bottom +"px";
    right.style.width = window.innerWidth - left.getBoundingClientRect().right - 2+"px";
    right.style.height = left.style.height= window.innerHeight - header.getBoundingClientRect().bottom+"px";
//时间。。。。。。。。。。。。
//时间不零函数
function timeZero(num){
		return num < 10 ? "0" + num : "" + num;
}
function getTime(){
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	var time = timeZero(hour) + timeZero(min) + timeZero(sec); //195037
	
	return time;
}

var time = document.querySelector(".time");
var timespan = document.querySelectorAll(".time span");
function autoTime(){
	for(var i=0;i<timespan.length;i++){
	     timespan[i].innerHTML = getTime()[i];
    }
}
autoTime();
setInterval(autoTime,1000)
var date = document.querySelector(".date");
    date.innerHTML = getDate();
function getDate(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var dates = date.getDate();
	var day = date.getDay();
		
	switch(day){
		case 1 : day = "星期一" ; break;
		case 2 : day = "星期二" ; break;
		case 3 : day = "星期三" ; break;
		case 4 : day = "星期四" ; break;
		case 5 : day = "星期五" ; break;
		case 6 : day = "星期六" ; break;
		case 0 : day = "星期日" ; break;
        default: alert('不是一个正确的日期');
	}
	return  year + "年" + month + "月" + dates + "日" +" 　"+day;
}

//点击欢迎按钮
var welbtn = document.querySelector(".welbtn");
welbtn.addEventListener("click",function(e){
	var target = e.target;
	welcome.style.top ="-1000px";
	main.style.opacity = 1;
})


/*var leftColse = document.querySelector(".leftColse");
leftColse.onclick = function(){
	if(main.classList.toggle("active")){
		right.style.width = window.innerWidth - 2 +"px";
	}else{
		right.style.width = window.innerWidth - left.getBoundingClientRect().right - 2+"px";
	}
}*/

//切换视图布局
var view_btn = document.querySelector(".view_btn");

    view_btn.onclick = function () {
    	//默认fileList是false  点击一下是true 
    	filePic.style.display = fileList.classList.toggle("fileActive") ? fileList.classList.remove("fileActive") : fileList.classList.add("fileActive") ;
    	
    	//默认filePic是true 点击是false
    	fileList.style.display = filePic.classList.toggle("fileActive") ? fileList.classList.remove("fileActive") : fileList.classList.add("fileActive") ;
 
        fnfiles();   
    }

