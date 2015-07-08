var update = document.querySelector("#update");

update.addEventListener("click", function(event) {
  var file = document.querySelector("#image_file");
  getImgInfo(file.files[0], function(data) {

    var img = new Image();
    img.src = data;
    img.onload = function() {
			var context = document.querySelector("#bg").getContext('2d');
      context.drawImage(img, 0, 0);
    };
  });
}, false);

var canvas = document.querySelector('#cj');
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
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw_rect(rectOptions);
	}
}, false);

canvas.addEventListener("mouseup", function(event) {
  startX = null;
	save_img(rectOptions);
}, false);

function draw_rect(options) {
  context.beginPath();
  context.rect(options.x, options.y, options.width, options.height);
  context.strokeStyle = "red";
  context.lineWidth = 1;
  context.stroke();
}

function save_img(options) {
  var bg_context = document.querySelector("#bg").getContext('2d');
  var imgData = bg_context.getImageData(options.x, options.y, options.width, options.height);
  var out_context = document.querySelector("#out_canvas").getContext('2d');
  out_context.clearRect(0, 0, 400, 400);
  out_context.putImageData(imgData, 0, 0);
  var dataURL = document.querySelector("#out_canvas").toDataURL("image/png");
}

function getImgInfo(file, callback) {
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
