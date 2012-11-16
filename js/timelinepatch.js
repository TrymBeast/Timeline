
Timeline.CompactEventPainter.prototype._showBubble = function(x, y, evt) {
    
    // use the obj to show the light window
	//alert (evt[0]._obj.title + ": " + evt[0]._obj.image);
	
	/* Array with images, only possible because we have hacked the lightbox plugin */
    var v_imageArray = [];
	v_imageArray.push(new Array(evt[0]._obj.image,evt[0]._obj.title));
	
	/* Trigger the event to show the image */
	var a = $('<a></a>');
	a.lightBox({imageArray: v_imageArray});
	a.click();
} 