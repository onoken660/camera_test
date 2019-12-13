const medias = {
  audio : false,
	video: {
		facingMode: {exact:"environment"}	
	}
};
function init_video() {
  if (navigator.mediaDevices) {
    var promise = navigator.mediaDevices.getUserMedia(medias);
    promise.then(successCallback).catch(errorCallback);
  }
}

if(window.addEventListener) {
  window.addEventListener('load', init_video);
} else if(window.attachEvent) {
  window.attachEvent('load', init_video);
}

function successCallback(stream) {
  var video = document.getElementById('video');
  video.srcObject = stream;
};

function errorCallback(err) {
  alert(err);
};

function popup_show() {
	document.getElementById('layer').style.display = 'block';
	document.getElementById('popup').style.display = 'block';
}
function popup_hide() {
	document.getElementById('layer').style.display = 'none';
	document.getElementById('popup').style.display = 'none';
}

function take_pict() {
  alert('take_pict()');
  popup_hide();
}
