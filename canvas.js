window.onload=function(){
	
	var draw=new Draw("#cj");
	UpdateImage();
	function Draw(id){
		var me=this;
		me.stored=[];
		me.canvas=document.querySelector(id);
		me.context=me.canvas.getContext('2d');
		//console.log(me.context);
		me.draw_img=function(data){
			var img = new Image();
				img.src = data;
				img.onload=function(){
					me.context.drawImage(img,0,0);
				}
		}
		me.draw_rect=function(options){
			me.context.beginPath();
			me.context.rect(options.x,options.y,options.width,options.height);
			me.context.strokeStyle="red";
			me.context.lineWidth=2;
			me.context.stroke();
		}
		me.save_img=function(options){
			var temp=document.querySelector("#bg").getContext('2d');
			var imgData=temp.getImageData(options.x,options.y,options.width,options.height);
			var temp1=document.querySelector("#out_canvas").getContext('2d');
				temp1.clearRect(0, 0, 400, 400);
				temp1.putImageData(imgData,0,0);
			var dataURL = document.querySelector("#out_canvas").toDataURL("image/png");
			console.log(dataURL)
		}
		me.canvas.addEventListener("mousedown",function(event){
			me.startX=event.offsetX;
			me.startY=event.offsetY;
		},false);
		me.canvas.addEventListener("mousemove",function(event){
			me.endX=event.offsetX;
			me.endY=event.offsetY;
			if(me.startX){
				var rectOptions={
					x:me.startX,
					y:me.startY,
					height:(me.endY-me.startY),
					width:(me.endX-me.startX)
				}
				me.stored.length=0;
				me.stored.push(rectOptions);
				me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);
				me.draw_rect(me.stored[0]);
			}
		},false);
		me.canvas.addEventListener("mouseup",function(event){
			me.startX=null;
			me.save_img(me.stored[0]);
			/*var stored=JSON.parse(window.localStorage.getItem("stored"));
			if(stored){
				stored.push(me.stored[0]);
				window.localStorage.setItem("stored",JSON.stringify(stored));
			}else{
				window.localStorage.setItem("stored",JSON.stringify(me.stored));
			}*/

		},false);
	}
	function UpdateImage(){
		var update=document.querySelector("#update");
		update.addEventListener("click",function(event){
			var file=document.querySelector("#image_file");
			console.dir(file)
			getImgInfo(file.files[0],function(data) {
				console.dir(data);
				var setDraw=new Draw("#bg");
				setDraw.draw_img(data.data);
			});
		},false);
	}
	function getImgInfo(file,callback){
		var img={};
		img.name=file.name;
		img.size=file.size;
		img.type=file.type;
		img.time=file.lastModified;4
		var reader = new FileReader();  
		//console.dir(reader)   
		reader.readAsDataURL(file, "UTF-16");
		reader.onprogress = function(){
			console.log("开始上传了");
		};
		reader.onload = function(event){
			img.data=event.target.result;
			callback(img);
		};
		reader.onerror = function(){
			console.log("上传出错了");
		};
	}
}