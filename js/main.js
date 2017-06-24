
//curid 获取当前层级的id
var curId = 0 ;
//提示框
var tip = document.querySelector(".tip");

var rename = false; 
//左边菜单..................................
var leftNav = document.querySelector(".leftNav");
viewLeft();
function viewLeft(){
	leftNav.innerHTML = createLeftHtml( getItemDataById(data,0).children );
}
var leftNavTitle = document.querySelectorAll(".leftNav h5");

for(var i=0;i<leftNavTitle.length;i++){
	leftNavTitle[i].onclick = function(){
		this.parentNode.classList.toggle("titleactive")
	}
}




leftNav.addEventListener("click",function(e){
	e.stopPropagation();
	e.preventDefault();
	var target = e.target,targetCls = target.classList;
	curId = target.dataset.id * 1;
	 picLocHtml(data,curId);
})

//图视列表
var filePic = document.querySelector(".filePic");
var fileList = document.querySelector(".fileList");
var locNav = document.querySelector(".locNav");
var locNavNum = document.querySelector(".locNavNum");
var locPack = document.querySelector(".locPack");
var checkAll = document.querySelector(".checkAll");


picLocHtml(data,curId);
function  picLocHtml(data,curId){
       filePic.innerHTML = createPicHtml(getItemDataById(data,curId).children);
	   if(!filePic.innerHTML){filePic.innerHTML = '<P class="nocon">没有文件内容</p>'}
	   
	   fileList.innerHTML = createPicHtml(getItemDataById(data,curId).children);
	   if(!fileList.innerHTML){fileList.innerHTML = '<P class="nocon">没有文件内容</p>'}
	   
   //面包屑导航栏
	var locHtml = createLocHtml( getAllParentById(data,curId) );
	    locNav.innerHTML = locHtml;
	    locNavNum.innerHTML =`已全部加载 共${getAllParentById(data,curId)[0].children.length}个`;
}


//点击导航栏返回上一级...................
locNav.addEventListener('click',function(e){
	e.stopPropagation();
	e.preventDefault();
	var target = e.target,targetCls = target.classList;
	   if(targetCls.contains("nava")){
	   	  curId = target.dataset.id * 1;
	   	  
		  picLocHtml(data,curId);
	   }else if(targetCls.contains("pack_btn")){
	   	  pId = target.dataset.pid * 1;
	   	  curId = target.dataset.pid * 1;
	   	  
		  picLocHtml(data,curId);
		 
	   }
	   
	   if(isCheckedAll( getItemDataById(data,curId).children )){
			checkAll.classList.add("active");
		}else{
			checkAll.classList.remove("active");
		}
	
})
//全选。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
checkAll.addEventListener('click',function(){
	    this.classList.toggle('active');
	var curData = getItemDataById(data,curId).children;
		  for(var i=0; i<curData.length; i++){
		    if(this.classList.contains('active')){
		      curData[i].checked = true;
		      filePic.children[i].classList.add('active');
		      fileList.children[i].classList.add('active');
		    }else{
		      curData[i].checked = false;
		      filePic.children[i].classList.remove('active');
		      fileList.children[i].classList.remove('active');
		    }
		  }
	
})
//取消全选.......................................
function canCheck(data,curId){
	    checkAll.classList.remove("active");
		var curData = getItemDataById(data,curId).children;
		for(var i=0; i<curData.length; i++){
			    curData[i].checked = false;
			    filePic.children[i].classList.remove('active');
		 }
}
//选中文件夹。。。。。。。。。。。。。。。。。。。。。。。。。。。
filePic.addEventListener('click',function(e){
	e.stopPropagation();
	var target = e.target,targetCls = target.classList;
	if(targetCls.contains("fa-check")){//选中checkbox
		currentId = target.dataset.checkid * 1;
		getItemDataById(data,currentId).checked  = e.target.parentNode.parentNode.classList.toggle('active');
	    curId = curpId = getItemDataById(data,currentId).pId;
	}
	
	
	if(isCheckedAll( getItemDataById(data,curId).children )){
		checkAll.classList.add("active");
	}else{
		checkAll.classList.remove("active");
	}
})

fileList.addEventListener('click',function(e){
	e.stopPropagation();
	var target = e.target,targetCls = target.classList;
	if(targetCls.contains("fa-check")){//选中checkbox
		currentId = target.dataset.checkid * 1;
		getItemDataById(data,currentId).checked  = e.target.parentNode.parentNode.classList.toggle('active');
	    curId = curpId = getItemDataById(data,currentId).pId;
	}
	
	
	if(isCheckedAll( getItemDataById(data,curId).children )){
		checkAll.classList.add("active");
	}else{
		checkAll.classList.remove("active");
	}
})

//进入文件夹。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
fnfiles();
function fnfiles(){
	if(filePic.classList.contains("fileActive")){
		filePic.addEventListener('dblclick',fnjrfile);
	}else{
		fileList.addEventListener('dblclick',fnjrfile);
	}
}




function fnjrfile(e){
	e.stopPropagation();
	 removeRnav();
	rename = true;
	var target = e.target,targetCls = target.classList;
	//双击进入文件夹
	if(targetCls.contains("fileImg") || targetCls.contains("fileLi")){
	    curId = target.dataset.id * 1;
	    rename = false;
	    canCheck(data,getItemDataById(data,curId).pId);
		picLocHtml(data,curId);
	}
	//双击修改名字
	else if( targetCls.contains("fileName") && target.parentNode.classList.contains("active")){
		  //获取到被选中的数据
		  var arrcheck = isCheckArr( getItemDataById(data,curId).children );
		  console.log(arrcheck);
		  if(arrcheck.length>1){
		  	return fnTip(tip,"red","请选中一条数据");//提示框
		  }
		  currentId = target.dataset.id * 1;
		  //alert(currentId);
		  curId = getItemDataById(data,currentId).pId;
		  //alert(curId);
		target.style.display = "none";
		target.nextElementSibling.style.display ="block";
		target.nextElementSibling.focus();
		
		target.nextElementSibling.onblur = function(){
			if(this.value.trim() == '' || this.value ==getItemDataById(data,currentId).name){
				this.value = getItemDataById(data,currentId).name;
				rename = false;
				fnqkarrcheck(curId);
				picLocHtml(data,curId);
			}else if(dataName(this.value,curId)){//如果名字不重复的话
				getItemDataById(data,currentId).name = this.value;//数据中的name就等于我修改的名字
				fnTip(tip,"green","修改文件名字成功");//提示框
				localStorage.setItem("getdata",JSON.stringify(data));
				fnqkarrcheck(curId);
				  viewLeft();
				picLocHtml(data,curId);
				rename = false;
			}else if(!dataName(this.value,curId)){
				rename = false;
				fnTip(tip,"red","重名了，修改文件名字失败");//提示框
			}
		}
	}else if(targetCls.contains("fileName") && !target.parentNode.classList.contains("active")){
		fnTip(tip,"red","请选中文件，再双击名字，才能修改名字哦");//提示框
	}
}

//新建文件夹.......................................................................
var fileText = document.querySelector(".fileText");
var fileName = document.querySelector(".fileName");
var fileNew = document.querySelector(".fileNew");
fileNew.onclick = function(){
	removeRnav();
	if(rename) return;
    fnClick();	
}
function  fnClick(){
	//新建文件时，先把选中的清除掉
	fnqkarrcheck(curId);
	picLocHtml(data,curId);
	rename = true;
	var fileNode = createFileNode();
	    
	    if(filePic.classList.contains("fileActive")){
	    	filePic.insertBefore(fileNode,filePic.firstElementChild); //插入在第一条数据的前面
	    }else{
	    	fileList.insertBefore(fileNode,fileList.firstElementChild); //插入在第一条数据的前面
	    }
	    
	var inputNode = fileNode.querySelector("input");//获取这条的input标签
	    inputNode.focus();//给input标签加上光标
	    //当光标离开的时候
	    inputNode.onblur = function (){
	    	if(this.value.trim() == ""){ //如果input的value为空，就移除这个li标签
	    		filePic.removeChild(fileNode);
	    		rename = false;
	    		fnTip(tip,"red","取消创建文件夹");//提示框\
	    	}else if(dataName(this.value,curId)){ //判断这个id和这个id下的子集有没有和this.value相等的，如果不相等就执行
	    		var fileData = {
	    			  id :maxId(),
	    			 // id : ++maxIds,
	    			  name : this.value,
	    			  pId : curId,
	    			  checked : false,
	    			  children : []
	    		}
	    		localStorage.setItem("maxsId",maxId());
	    		
	    		var arr = getItemDataById(data,curId).children;
	    		arr.unshift(fileData);
	    		rename = false;
	    		fnTip(tip,"green","创建文件夹成功");//提示框\
	    		localStorage.setItem("getdata",JSON.stringify(data));
	    		  viewLeft();
	    		picLocHtml(data,curId);
	    	}else{
	    		 fnTip(tip,"red","重名了，创建失败");//提示框
	    		 picLocHtml(data,curId);
	    		 rename = false;
	    	}
	    }
}

//重命名.............................................................
var filecmm = document.querySelector(".filecmm");
filecmm.onclick =function(e){
	removeRnav();
	rename = true;
	var arrcheck = isCheckArr( getItemDataById(data,curId).children );
	if(arrcheck.length === 0){ return fnTip(tip,'red','请选中一条数据'); }
	if(arrcheck.length > 1){ return fnTip(tip,"red","请选中一条数据");}
	var filePicLi = document.querySelectorAll(".filePic li");	
	var fileListli = document.querySelectorAll(".fileList li");
	fnfileli(filePicLi);
	fnfileli(fileListli);
	function fnfileli(filePicLi){
		for(var i=0;i<filePicLi.length;i++){
			if(filePicLi[i].classList.contains("active")){
				filePicLi[i].children[2].style.display = "none";
				filePicLi[i].children[3].style.display ="block";
				filePicLi[i].children[3].focus();
				filePicLi[i].children[3].onblur = function(){
					if(this.value.trim() == '' || this.value ==getItemDataById(data,currentId).name){
						this.value = getItemDataById(data,currentId).name;
						fnqkarrcheck(curId);
						picLocHtml(data,curId);
						rename = false;
	    		        fnTip(tip,"red","取消重命名");
					}else if(dataName(this.value,arrcheck[0].id)){//如果名字不重复的话
						getItemDataById(data,arrcheck[0].id).name = this.value;//数据中的name就等于我修改的名字
						rename = false;
						fnTip(tip,"green","修改文件名字成功");//提示框
						fnqkarrcheck(curId);
						localStorage.setItem("getdata",JSON.stringify(data));
						  viewLeft();
						picLocHtml(data,curId);
					}else if(!dataName(this.value,curId)){
						fnTip(tip,"red","重名了，修改文件名字失败");//提示框
					}
				}
				
			}
		}
	}
		 
}

//删除。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
var fileDelete = document.querySelector(".fileDelete");
fileDelete.onclick =function (e){
	removeRnav();
	var arrcheck = isCheckArr( getItemDataById(data,curId).children );
	if(arrcheck.length === 0){ 
		fnqkarrcheck(curId);
		picLocHtml(data,curId);
		return fnTip(tip,'red','没有要删除的数据'); 
	}
   if(arrcheck.length){
   	    createDeleteNode();//创建删除提示节点
   	   var btnOk = document.querySelector(".btnOk");
       var btnCan = document.querySelector(".btnCan");
       var tipBg = document.querySelector(".tipBg");
       
       
       //点击确认
   	   btnOk.onclick = function(){
   	   	  tip.style.top="-200px";
   	   	  tip.classList.remove("hui");
   	   	  tip.innerHTML = "";
   	   	  tipBg.style.display ="none";
   	   	  
		  fndelete(getItemDataById(data,curId));
		    viewLeft();
		  picLocHtml(data,curId);
	      localStorage.setItem("getdata",JSON.stringify(data));
   	   }
   	   
   	   //点击取消
   	   btnCan.onclick = function(){
   	   	    tip.style.top="-200px";
   	   	    tip.classList.remove("hui");
   	   	    tipBg.style.display ="none";
   	     	fnqkarrcheck(curId);
   	     	picLocHtml(data,curId);
   	   }
   }
		
	
}


//移动到...................................................................................
var movedId = 0;//要把数据移动到那个id的下面
var fileMove = document.querySelector(".fileMove");//移动到
var move_bg = document.querySelector(".move_bg");//移动提示框的div
var move_btnOk = document.querySelectorAll(".move_btn a")[0];//移动提示框的确认
var move_btnCan = document.querySelectorAll(".move_btn a")[1];//移动提示框的取消
var moveSpan = document.querySelectorAll("#move_nav span");
var fileMove = document.querySelector(".fileMove");
//生成移动到的菜单数据
function MoveHtml(movedata){
   move_nav.innerHTML= createMoveHtml(movedata);
}
fnclick(move_nav);
function fnclick(move_nav){
				var li=move_nav.children;
				for(var i=0;i<li.length;i++){
					var span=li[i].firstElementChild;
					span.onclick=function(e){
						for(var i=0;i<moveSpan.length;i++){
							 moveSpan[i].classList.remove("active");
						}
						this.parentNode.parentNode.previousElementSibling.classList.remove("active");
						this.classList.add("active")
						 movedId = e.target.dataset.id * 1;
						var next=this.nextElementSibling;
						var allul=this.parentNode.parentNode.querySelectorAll("ul");
						Array.from(allul).forEach(function(item,i){
							if(next!=item){
								allul[i].previousElementSibling.classList.remove("lines");
								allul[i].style.display="none";
							}
						})
						if(next){
							next.style.display=this.classList.toggle("lines")?'block' :'';
							fnclick(next);
						}
						
					}
				}
				
}

//点击移动到，把提示框显示出来
fileMove.onclick = function(){
	removeRnav();
	//获取到被选中的数据
    var arrcheck = isCheckArr( getItemDataById(data,curId).children );
	if(!arrcheck.length){
		fnTip(tip,"red",'请选择要移动的文件')
	}else{
		move_bg.style.display = "block";
		fnMoveBtn();//移动方法
	}
}
function  fnMoveBtn(){
	MoveHtml(data);
	fnclick(move_nav);
	move_btnOk.addEventListener('click',function(e){
		e.stopPropagation();
		e.preventDefault();
		var spliceArr =[];
		var moveName ="";
		var movePidData  = getItemDataById(data,curId);//获取选中父级id的数据以及子数据
		var arrcheck = isCheckArr( getItemDataById(data,curId).children );
	   for(var i=0;i<arrcheck.length;i++){//循环选中的数据
	   	    var nameValue = arrcheck[i].name;//选中的名字
	   	    
	   	     moveName +=`${arrcheck[i].name} >>>`;
	   	     //判断是不是移动到自己的下面
	   	     if(arrcheck[i].id == movedId){  //movedId  要移动到那个id下面
	   	     	fnTip(tip,"red",`不能移动到自己的下面`)
	   	     }else{
			   	    //判断名字 移动到文件夹下有没有重复的
			   	    if(dataName(nameValue,movedId)){
			   	    	
			   	    	getItemDataById(data,movedId).children.push( arrcheck[i]);//添加在要移动id的子集中
                       arrcheck[i].pId = movedId;//修改pid为移动id的id
                       
                       fndelete(getItemDataById(data,curId));//删除
		   	    	
				   	 	fnTip(tip,"green",`移动成功了`);
				   	 	fnqkarrcheck(movedId);
					    move_bg.style.display = "none";
					   	localStorage.setItem("getdata",JSON.stringify(data));
						
			   	    }else{
			   	    	fnTip(tip,"red",`移动失败,名字重复了`)
			   	    }
	   	     	
	   	     }
	   }
	   
	   
	   localStorage.setItem("getdata",JSON.stringify(data));
	   picLocHtml(data,curId);
	   MoveHtml(data);
       fnclick(move_nav);
   
})
	
	move_btnCan.addEventListener('click',function(e){
		move_bg.style.display = "none";
		fnqkarrcheck(curId);
		picLocHtml(data,curId);
   })
	
}

///复制到...。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
var fileSlice = document.querySelector(".fileSlice");
//点击移动到，把提示框显示出来
fileSlice.onclick = function(){
	removeRnav();
	//获取到被选中的数据
    var arrcheck = isCheckArr( getItemDataById(data,curId).children );
	if(!arrcheck.length){
		fnTip(tip,"red",'请选择要复制的文件')
	}else{
		move_bg.style.display = "block";
		fnMoveSliceBtn();
	}
}


function  fnMoveSliceBtn(){
	MoveHtml(data);
	fnclick(move_nav);
	move_btnOk.addEventListener('click',function(e){
		e.stopPropagation();
		e.preventDefault();
		var moveName ="";
	//获取到被选中的数据
    var arrcheck = isCheckArr( getItemDataById(data,curId).children );
    for(var i=0;i<arrcheck.length;i++){
    	if(arrcheck[i].id == movedId){
   	     	fnTip(tip,"red",`不能移动到自己的下面`)
   	     }else{
   	     	//判断名字 移动到文件夹下有没有重复的
		   	 if(dataName(arrcheck[i].name,movedId)){
		   	 	var copydata = deepCopy(0,arrcheck[i],true);//复制
		   	 	fncopys(copydata,movedId);//修改复制之后的id和pid
		   	 	getItemDataById(data,movedId).children.push(copydata);//插入到指定的id下
		   	 	//arrcheck[i].pId = movedId;//修改pid为移动id的id
		   	 	
		   	 	
		   	 	fnqkarrcheck(movedId);
		   	 	console.log(getItemDataById(data,movedId));
		   	 	fnTip(tip,"green",`复制成功了`)
			    move_bg.style.display = "none";
			   	localStorage.setItem("getdata",JSON.stringify(data));
		   	 }
		   	 else{fnTip(tip,"red",`移动失败,名字重复了`);}
   	     }
    }
    
	picLocHtml(data,curId);
 
})
	
move_btnCan.addEventListener('click',function(e){
	move_bg.style.display = "none";
	fnqkarrcheck(curId);
	picLocHtml(data,curId);
})
	
}

//画框选中......................................................................
var rightcon = document.querySelector(".rightCon");

rightcon.onmousedown = function(e){
	//removeRnav();
	if(rename) return ;//重命名的时候不画框
	if(rightNav) return;//右键菜单的时候，不画框
	e.preventDefault();
	
	var target = e.target;
	  if(!target.classList.contains('rightCon')){
	    return;
	  }
	  
	  console.log(111);
	fnqkarrcheck(curId);
	
	
	var dragdiv = document.createElement('div');
	  dragdiv.className = 'dragdiv';
	  this.appendChild(dragdiv);
	
	var boxLeft = getRect(rightcon,'left');//201
    var boxTop = getRect(rightcon,'top');//215
      // 按下的时候的横纵坐标
    var startX = e.pageX, startY = e.pageY;
    var disX = e.pageX - boxLeft,disY = e.pageY -boxTop;//距离左边和上边剩下的一小部分
	rightcon.onmousemove = function (e){
	      var currentX = e.pageX - boxLeft, currentY = e.pageY - boxTop;
	     
	       //ischeck(hit(dragdiv));
		  //selectDuang(dragdiv);
		  fnDuang(dragdiv);
            dragdiv.style.width = Math.abs(currentX - disX) + 'px';
	        dragdiv.style.height = Math.abs(currentY - disY) + 'px';
	        dragdiv.style.left =  Math.min(currentX, disX) + 'px'; 
            dragdiv.style.top = Math.min(currentY, disY) + 'px';
            dragdiv.style.zIndex = 9999; 
	      };
	   document.onmouseup = function (){
	        document.onmouseup = rightcon.onmousemove = null;
		         rightcon.removeChild(dragdiv);
	    };
	
}
// 碰撞检测函数
function fnDuang(obj){
  var checked = false;
  fnfileduang(filePic);
  fnfileduang(fileList);
  function fnfileduang(filePic){
  	for(var i=0; i<filePic.children.length; i++){
  	var id = filePic.children[i].dataset.id * 1;
  	  console.log(id);
    var curData = getItemDataById(data, id);
    
    if(duang(obj, filePic.children[i]) && filePic.children[i] !== obj){
      filePic.children[i].classList.add('active');
      curData.checked = true;
      console.log(getItemDataById(data,curId).children);
      if(isCheckedAll(getItemDataById(data,curId).children)){
        checkAll.classList.add('active');
      }else{
        checkAll.classList.remove('active');
      }
    }else{
      if(filePic.children[i].classList.contains('active')){
        filePic.children[i].classList.remove('active');
        curData.checked = false;
      }
    }
  }
  }
}

//右键菜单。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
//右键
var textmenu = document.querySelector(".textmenu");
var textmenu_nav = document.querySelector(".textmenu li")
var menu_fileNew = document.querySelector(".menu_fileNew");
// 右键菜单和画框的状态控制
var rightNav = false;

rightcon.oncontextmenu=function(e){
	removeRnav();
	rightNav = true;
	e.preventDefault();
	var dx = e.pageX - getRect(rightcon,'left'),dy = e.pageY- getRect(rightcon,'top');
	console.log(e.pageY,dy);
     var menunode =  createRightMenu(file_data);
		menunode.style.left = dx +"px";
		menunode.style.top = dy  +"px";
		menunode.style.zIndex = "99999";
		menunode.style.position = "absolute";
	    this.appendChild(menunode);	  
			  	
}

function removeRnav(){
  if(rightNav && rightcon.lastElementChild && rightcon.lastElementChild.classList.contains('textmenu')) {
    rightcon.removeChild(rightcon.lastElementChild);
  }  
}





window.onload = function(){
	
	fnqkarrcheck(curId);
	picLocHtml(data,curId);
//	fnflex();
	
}
