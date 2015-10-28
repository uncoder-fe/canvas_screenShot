var update = document.querySelector("#update");

/**
 * 上传图片并绘制到canvas里面
 */
var CanvasImage = document.createElement('canvas');
    CanvasImage.height = 300;
    CanvasImage.width = 300;
update.addEventListener("click", function(event) {
  var file = document.querySelector("#image_file");
  getImg(file.files[0], function(data) {
    var img = new Image();
    img.src = data;
    img.onload = function(e) {
      console.dir(this);
      //图片真实尺寸
      //this.height;this.width;
      //存储选择的图片
      CanvasImage.getContext('2d').drawImage(img, 0, 0,300,300);
      //页面显示
      document.querySelector("#bg").src = data;
    };
  });
}, false);

var canvas = document.querySelector('#mask');
var context = canvas.getContext('2d');
var startX, startY, endX, endY,rectOptions;

canvas.addEventListener("mousedown", function(event) {
  startX = event.offsetX;
  startY = event.offsetY;
}, false);

canvas.addEventListener("mousemove", function(event) {
  endX = event.offsetX;
  endY = event.offsetY;
	if(startX){
		rectOptions = {
			x: startX,
			y: startY,
			height: (endY - startY),
			width: (endX - startX)
		};
		context.clearRect(0, 0, 300, 300);
    context.beginPath();
    context.rect(rectOptions.x, rectOptions.y, rectOptions.width, rectOptions.height);
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.stroke();
	}
}, false);

canvas.addEventListener("mouseup", function(event) {
  startX = null;
  //截取
	var imgData = CanvasImage.getContext('2d').getImageData(rectOptions.x, rectOptions.y, rectOptions.width, rectOptions.height);
  //存储截取的图片
  var StoreImage = document.createElement('canvas');
      StoreImage.height = rectOptions.height;
      StoreImage.width = rectOptions.width;
      StoreImage.getContext('2d').putImageData(imgData, 0, 0); 
  //由canvas转成png图片    
  var dataURL = StoreImage.toDataURL("image/png");
  //显示到页面上  
  document.querySelector("#output").src = dataURL;
}, false);

function getImg(file, callback) {
  var img = {};
  img.name = file.name;
  img.size = file.size;
  img.type = file.type;
  img.time = file.lastModified;
  var reader = new FileReader();
  reader.readAsDataURL(file, "UTF-16");
  reader.onload = function(event) {
    img.data = event.target.result;
    callback(img.data);
  };
}
