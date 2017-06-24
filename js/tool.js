var data = user_data.files;
var locgetdata = localStorage.getItem("getdata");
if(locgetdata){
	 data = JSON.parse(locgetdata);
}
 user_data.maxId = Number(localStorage.getItem("maxsId"));
   console.log(user_data); 
   console.log(data);
//根据指定的id，拿到数据中对应id的那个文件的数据

function getItemDataById(data,id){
	if(typeof id ==="undefined")  return null;
    var len=data.length,target = null;
    for(var i=0;i<len;i++){
    	if( data[i].id === id ){
    		target = data[i]; //如果id相等的话，就return这个id的数据
    		break;
    	}
    	
    	if(!target && data[i].children.length){ //target是false的实收 并且有子集而且长度大于1 ，再递归查找
    		target = getItemDataById(data[i].children,id);
    		if(target) break;//如果找到了，就直接跳出循环
    	}
    }
    return  target;
} 
    
//根据指定的id找到这个数据它自己以及它所有的祖先数据
function  getAllParentById(data,id){
	var arr = []; //声明一个数组，方便下面找到存到数组中
    var objAll = getItemDataById(data,id); //返回id的整条数据
    	 
    	 parentId = objAll.pId; //pId
    	 targetId = objAll.id; // id
    	 arr.push(objAll); //把找的数据存在数组中
	      while( targetId ){
	    	arr = arr.concat(getAllParentById(data,parentId));
	    }
       return arr;  
}

function getRect(ele,type){
  return ele.getBoundingClientRect()[type];
}

//判断名字重复不
function dataName(value,curId){
	var item = getItemDataById(data,curId);
	var len = item.children.length
	if(len){//长度超过一个了，就判断下有没有相等的名字*/
		for(var j=0;j<len;j++){
			if(item.children[j].name === value){
			   return false;
			}
	    }
		return true;
	}else{//如果没有子集的话，直接不相等
		if(item.name == value){
			return false;
		}
			return true;
	}
}

//获取maxid
function maxId(){
	return user_data.maxId = user_data.maxId + 1;
}

//提示框
function fnTip(ele,colorName,cont){
	ele.classList.add(colorName);
	ele.style.top = 0;
	ele.innerHTML = cont;
	setTimeout(function(){
		ele.classList.remove(colorName);
	    ele.style.top = "";
	    ele.innerHTML = "";
	},1000)
}

//当前数据中的子集的checked都改为位选中
function fnqkarrcheck(curId){
	var childrenAll = getItemDataById(data,curId).children;
	for(var i=0;i<childrenAll.length;i++){
		childrenAll[i].checked = false;
		 filePic.children[i].classList.remove('active');
		 fileList.children[i].classList.remove('active');
		 checkAll.classList.remove("active");
	}
}


function wheel(ele,fnUp,fnDown){
				if(window.navigator.userAgent.indexOf('Fiexfox') !=-1){
					ele.addEventListener('DOMMouseScroll',fn);
				}else{
					ele.addEventListener("mousewheel",fn)
				}
				
				function fn(e){
					var dir;
					if(e.detail){
						dir = e.detail < 0 ? true : false ;
					}
					
					if(e.wheelDelta){
						dir = e.wheelDelta > 0 ? true : false ;
					}
					
					if(dir){
						fnUp && fnUp.call(ele);
					}else{
						fnDown && fnDown.call(ele);
					}
				}
			}


// 碰撞检测函数
function duang(current, target){
  var currentRect = current.getBoundingClientRect();
  var targetRect = target.getBoundingClientRect();
  var currentLeft = currentRect.left, 
      currentTop = currentRect.top,
      currentRight = currentRect.right,
      currentBottom = currentRect.bottom;
      currentRectW = currentRect.width;
  var targetLeft = targetRect.left, 
      targetTop = targetRect.top,
      targetRight = targetRect.right,
      targetBottom = targetRect.bottom;
  return currentRight > targetLeft && currentBottom > targetTop && currentLeft < targetRight && currentTop < targetBottom;
  //return currentRight > targetLeft && currentBottom > targetTop;
}

//删除的函数
function fndelete(data){
	for(var i=0;i<data.children.length;i++){
			if(data.children[i].checked){
				data.children.splice(i,1);
				i--;
			}
	}
}
//复制
function deepCopy(target, source, deep){
	target = target || {};
	for(var key in source){
		if(source[key] && typeof source[key] === 'object' && deep){
			if(Array.isArray(source[key])){
				target[key] = [];
			}else{
				target[key] = {};
			}
			deepCopy(target[key], source[key], true);
		}else{
			target[key] = source[key];
		}
	}
	return target;
}

//复制
function fncopys(data,newid){
	/*if(data.children.length >1){
		 for(var i=0;i<data.children.length;i++){
		 	 data.children[i].id = maxId();
		 	 data.children[i].pId = data.id;
		 	 fncopys(data.children[i],data.children[i].pId);
		 }
	}else{
		data.pId = newid;
	    data.id = maxId();
	}*/
	data.pId = newid;
	data.id = maxId();
	for(var i=0;i<data.children.length;i++){
		console.log(1111);
		 data.children[i].id = maxId();
		 data.children[i].pId = data.id;
		 //fncopys(ata.children[i],maxId());
	}
	
	
}


function fnmove(data,index){
	console.log("我是移动函数")
	console.log(data);
	console.log(index);
	arrcheck[index].pId = movedId;
   getItemDataById(data,movedId).children.push( data[index]);//添加在要移动id的子集中
   console.log( getItemDataById(data,movedId) );
}



function moves(data,movedId){
	 if( data.id == movedId){
		  	  alert("不能移动到自己的下面");
	 }else{
	    for(var i=0;i<data.children.length;i++){
	    	if(data.children.length >1){
	    		 moves(data.children[i],movedId);
	    	}else{
	    		 moves(data,movedId);
	    	}
			
		}
	 }
}

// 判断是否全选
function isCheckedAll(data){
  for(var i=0; i<data.length; i++){
    if(!data[i].checked){
      return false;
    }
  }
  return true;
}

//判断是否选中
function  isCheckArr(data){
	var arr = [];
	for(var i=0; i<data.length; i++){
	    if(data[i].checked){
	      arr.push(data[i]);
	    }
  }
  return arr;
}
