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
  alert('popup_show()');
}
function popup_hide() {
  alert('popup_hide()');
}
function take_pict() {
  alert('take_pict()');
}
