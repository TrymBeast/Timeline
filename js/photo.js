

timeline.photo = {

	shown: false,

	videoObj: { "video": true },

	elements: {
		canvas: null,
		context: null,
		video: null,
	},

	init: function() {

		this.elements.canvas = document.getElementById("canvas");
		this.elements.context = this.elements.canvas.getContext("2d");
		this.elements.video = document.getElementById("video");

		var self = this;
		// Trigger photo take
		document.getElementById("snap").addEventListener("click", function() {
			self.takePhoto();
		});

		$(document).keyup(function(e){
		    if(e.keyCode === 27 && self.shown) self.hide();
		});

		$("#fakePhotos .action-more").click(function() {
			$("#fakePhotos").hide();
			$("#female").show();
		});

		$("#female .action-more").click(function() {
			$("#female").hide();
			$("#fakePhotos").show();
		});

		$(".action-add").click(function() {
			$("#female").hide();
			$("#fakePhotos").hide();
			self.hide();
		});
	},


	show: function() {

		this.shown = true;
		$('#media, #overlay').show();

		var self = this;
		$("#video").show();

		// Put video listeners into place
		if(navigator.getUserMedia) { // Standard
			navigator.getUserMedia(this.videoObj, function(stream) {
		  		self.elements.video.src = stream;
		  		self.elements.video.play();
			}, this.notSupported);
		} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
			navigator.webkitGetUserMedia(this.videoObj, function(stream){
		  		self.elements.video.src = window.webkitURL.createObjectURL(stream);
		  		self.elements.video.play();
			}, this.notSupported);
		}
	},

	hide: function() {
		this.shown = true;
		$("#canvas, #video").hide();
		$('#media, #overlay').hide();
		this.stopWebCam();
	},

	takePhoto: function() {
		$("#canvas").show();
		this.elements.context.drawImage(video, 0, 0, 640, 480);
		$("#video, #snap").hide();
		this.stopWebCam();

		$('.loading').show();
		window.setTimeout(function() {
			$("#canvas").hide();
			$('.loading').hide();
			$("#fakePhotos").show();
		}, 3000);

	},

	stopWebCam: function() {
		this.elements.video.pause();
		this.elements.video.src="";
	},

	notSupported: function(err) {
		console.log("Video capture error: ", error.code); 
	}
};