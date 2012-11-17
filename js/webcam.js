
var webcam = {

	videoElement: null,
	snapshotButton: null,
	imgElement: null,
	stream: null,
	
	init: function(videoElement, snapshotButton, imgElement)
	{
		this.videoElement = $(videoElement);
		this.snapshotButton = $(snapshotButton);
		this.imgElement = $(imgElement);
		
		this.snapshotButton.click(webcam.snapshot);
	},
	show: function() {
		//$('#webcam').fadeTo("slow", 0.8, function(){webcam.start();});
		//$('#webcam').click(function(){webcam.hide();});
		this.start();
	},
	hide: function() {
		$('#webcam').fadeTo("slow", 0, function(){webcam.stop();});
	},
	start: function() {
		var onFailSoHard = function(e) {
			console.log('Reeeejected!', e);
		};

		navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
								  navigator.mozGetUserMedia || navigator.msGetUserMedia;

		/*navigator.getUserMedia({video: true, audio: false}, function(stream) {
			
			webcam.videoElement.attr('src',window.URL.createObjectURL(stream));
			webcam.stream = stream;
			
		}, onFailSoHard);*/
		
		var videoObj = {video: true, audio: false},
			errBack = function(error) {
		    	console.log("Video capture error: ", error.code); 
		    };

		// Put video listeners into place
	  	if(navigator.getUserMedia) { // Standard
	    	navigator.getUserMedia(videoObj, function(stream) {
	      		webcam.videoElement[0].src = stream;
	      		webcam.videoElement[0].play();
	    	}, errBack);
	  	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	    	navigator.webkitGetUserMedia(videoObj, function(stream){
	      		webcam.videoElement[0].src = window.webkitURL.createObjectURL(stream);
	      		webcam.videoElement[0].play();
	    	}, errBack);
  		}	
	},
	stop: function() {
		webcam.videoElement.attr('src','');
	},
	snapshot: function(evt) {
		if(webcam.stream){
			var video = webcam.videoElement[0];
			var width = webcam.videoElement.width();
			var height = video.videoHeight / (video.videoWidth/width);
			var canvas = $('canvas')[0];
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, width, height);
			// "image/webp" works in Chrome 18. In other browsers, this will fall back to image/png.
			webcam.imgElement.attr('src', canvas.toDataURL('image/webp'));
		}

		return false;
	}
};