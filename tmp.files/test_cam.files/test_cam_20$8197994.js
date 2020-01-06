console.log = function() {
    for (var i in arguments) {
	alert(arguments[i]);
    }
};

function popup_show() {
	document.getElementById('layer').style.display = 'block';
	document.getElementById('popup').style.display = 'block';
}
function popup_hide() {
	document.getElementById('layer').style.display = 'none';
	document.getElementById('popup').style.display = 'none';
}
const medias = {
	audio: false,
	video: true
};
function init_video() {
alert('0');
alert('1');
	if (navigator.mediaDevices) {
alert('2');
		var promise = navigator.mediaDevices.getUserMedia(medias);
alert('3');
		promise.then(successCallback).catch(errorCallback);
alert('4');
	}
}
if(window.addEventListener) {
  window.addEventListener('load', init_video);
} else if(window.attachEvent) {
  window.attachEvent('load', init_video);
}
function successCallback(stream) {
	var video = document.getElementById('video');
alert('7');
	video.srcObject = stream;
alert('7');
	video.play();
}
function errorCallback(err) {
	alert(err);
}
function take_pict() {
	var camera = document.getElementById('video');
	var paint_view = document.getElementById('img_file_table');
	paint_view.style.display = 'block';
	var draw_view = document.getElementById('img_file_draw');
	draw_view.style.width = '450px';
	draw_view.style.height = '350px';
	var canvas = document.getElementById('img_file_canvas');
	canvas.width = 400;
	canvas.height = 300;
	var ctx = canvas.getContext('2d');
	try {
		ctx.drawImage(camera, 0, 0, 400, 300);
	} catch(error) {
		alert(error);
	}
	popup_hide();
}
