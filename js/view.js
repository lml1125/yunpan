//生成左边菜单
function createLeftHtml(data, id){
	  var str = `<ul>`;
	  for(var i=0; i<data.length; i++){
	    if(data[i].checked) continue; //如果是选中的直接跳过不显示
	    str += `<li>
	              <h5 class="${data[i].id === id ? 'active' : ''}" data-id="${data[i].id}">
	                <span class="add ${data[i].id === id ? 'active' : ''}" data-id="${data[i].id}"></span>
	                <i class="add ${data[i].id === id ? 'active' : ''}" data-id="${data[i].id}"></i>
	                ${data[i].name}
	              </h5>`;
	    // 判断当前数据是否有子数据
	    str += data[i].children ? createLeftHtml(data[i].children, id) : '';
	    str += `</li>`;
	  }
	  str += `</ul>`;
	  return str;
}
//生成文件夹列表  图标视图列表
function createPicHtml(data){
	 var str = '',len = data.length;
	 if(!len) return null;
	 for(var i=0;i<len;i++){
	 		 str +=`<li class="fileLi ${data[i].checked ? 'active' : ' '}" data-id="${data[i].id}">
	     	 		    <div class="checkbox"><i class="fa fa-check" data-checkid='${data[i].id}'></i></div>
				        <div class="fileImg" data-id="${data[i].id}"></div>
				        <div class="fileName" data-id="${data[i].id}">${data[i].name}</div>
				        <input class="fileText" type="text" value="${data[i].name}" data-id="${data[i].id}"/>
	     	 		</li>`;
	 }
	 return str;
}

//生成面包屑导航
  function createLocHtml(data){
  	 var str = '',packstr = '';
  	 if(data.length === 1) return str = `<a href="#">根目录</a>`;
  	 str +=	`<a href="#" data-pid="${data[0].pId}" class="pack_btn">返回上一级</a> | `;
  	  for(var i=data.length-1;i>=0;i--){
  	  	str += ` <a href='#' class="nava" data-id='${data[i].id}'>${data[i].name}</a>`;
  	  	if(i) str += ` > `;
  	  }
     return str;
  }
  
//新建文件夹
function createFileNode(){
	    
  var fileLi = document.createElement("li");
  
  var fileCheck = document.createElement("div");
      fileCheck.className = "checkbox"
      
  var fileI = document.createElement("i");
      fileI.className = "fa fa-check"
      
  var fileImg = document.createElement("div");
      fileImg.className = "fileImg";
      
  var fileName = document.createElement("div");
      fileName.className = "fileName";
      fileName.style.display = "none";
      
  var fileText = document.createElement("input");
      fileText.className = "fileText";
      fileText.type = "text" ;
      fileText.style.display ="block";
      
      fileCheck.appendChild(fileI);
      fileLi.appendChild(fileCheck);
      fileLi.appendChild(fileImg);
      fileLi.appendChild(fileName);
      fileLi.appendChild(fileText);
      
  return fileLi;
}

function createDeleteNode(){
	    tip.classList.add("hui");
		tip.style.top = 0;
		var p = document.createElement("p");
		var buttonCan = document.createElement("span");
		buttonCan.innerHTML = "取消";
		buttonCan.className ="btnCan";
		p.appendChild(buttonCan);
		
		var buttonOk = document.createElement("span");
		buttonOk.innerHTML = "确认";
		buttonOk.className ="btnOk";
		
		var div = document.createElement("div");
		div.innerHTML ="确定要删除数据吗？";
		div.style.fontSize ="16px";
		div.style.padding = "20px";
		
		var bgdiv = document.createElement("div");
		bgdiv.className = "tipBg";
		
		
		p.insertBefore(buttonOk,buttonCan);
		tip.appendChild(p);
		tip.insertBefore(div,p);
		
		tip.style.top ="200px"
		document.body.insertBefore(bgdiv,tip);
}

//移动到，数据
function createMoveHtml(movedata){
		var str="";
		for(var i=0;i<movedata.length;i++){
			 if(movedata[i].checked) continue;
		  str+=`<li>`;
		  str+=`<span data-id="${movedata[i].id}" class="${movedata[i].children ? 'add' : ' '}">${movedata[i].name}</span>`;
		  
		  if(movedata[i].children.length){
			str+=`<ul>${createMoveHtml(movedata[i].children)}</ul>`;
		   }
			
		  str+=`</li>`;
		 }
	  return str;
}

var file_data = file_data.fileRightMenu;
console.log();

function createRightMenu(data, id, isFile){
  var fileRightMenu = document.createElement('div');
  fileRightMenu.className = 'textmenu';
  for(var i=0; i<file_data.length; i++){
    var item = document.createElement('a');
    item.href = 'javascript:;';
    if(typeof file_data[i].name === 'function'){
      item.innerHTML = file_data[i].name(isFile);
      item.onclick = file_data[i].click.bind(null, id, isFile);
    }else{
      if(typeof file_data[i].click === 'function'){
        item.onclick = file_data[i].click.bind(null, id);
      }
    }
    
    if(typeof file_data[i].name === 'string'){
    	item.innerHTML = file_data[i].name;
    }
    fileRightMenu.appendChild(item);
  }
  return fileRightMenu;
}
