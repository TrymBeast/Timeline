
Timeline.CompactEventPainter.prototype._showBubble = function(x, y, evt) {
    
    // use the obj to show the light window
	//alert (evt[0]._obj.title + ": " + evt[0]._obj.image);
	
	var eventType = evt[0]._obj.type;
	timeline.presenter[eventType].show(evt[0]._obj);
} 