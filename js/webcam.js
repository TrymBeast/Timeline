
var webcam = {

	video: null,
	button: null,
	
	init: function(video, button)
	{
		this.video = video;
		this.button = button;
	},
	show: function() {
		$('#webcam').fadeTo("slow", 0.8, webcam.start);
	},
	hide: function() {
		$('#webcam').fadeTo("slow", 0, webcam.stop);
	}
};