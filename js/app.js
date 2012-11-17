

var timeline = {
	
	presenter: {},

	resizeTimerID: null,

	tl: null,
	
	init: function() {
		this.drawLayout();
		window.onresize = this.resize;

		for(var e in this.presenter) {
			if(this.presenter[e].init) this.presenter[e].init();
		}

		timeline.photo.init();
		$(".camera").click(function(){
			timeline.photo.show();
		});
	},
	
	drawLayout: function() {
		var eventSource = new Timeline.DefaultEventSource(0);
		
		var theme = Timeline.ClassicTheme.create();
		theme.event.instant.icon = "no-image-40.png";
		theme.event.instant.iconWidth = 40;  // These are for the default stand-alone icon
		theme.event.instant.iconHeight = 40;
		
		var d = Timeline.DateTime.parseIso8601DateTime("1939-09-27");
		
		var bandInfos = [
			Timeline.createBandInfo({
				width:          "86%", 
				intervalUnit:   Timeline.DateTime.YEAR, 
				intervalPixels: 150,
				eventSource:    eventSource,
				date:           d,
				theme:          theme,
				eventPainter:   Timeline.CompactEventPainter,
				eventPainterParams: {
					iconLabelGap:     5,
					labelRightMargin: 20,
					iconWidth:        80, // These are for per-event custom icons
					iconHeight:       80,
					stackConcurrentPreciseInstantEvents: {
						limit: 5,
						moreMessageTemplate:    "%0 More Events",
						icon:                   "no-image-80.png", // default icon in stacks
						iconWidth:              80,
						iconHeight:             80
					}
				}
			}),
			Timeline.createBandInfo({
				width:          "7%", 
				intervalUnit:   Timeline.DateTime.DECADE, 
				intervalPixels: 100,
				eventSource:    eventSource,
				date:           d,
				theme:          theme,
				layout:         'overview'  // original, overview, detailed
			}),
			Timeline.createBandInfo({
				width:          "7%", 
				intervalUnit:   Timeline.DateTime.CENTURY, 
				intervalPixels: 100,
				eventSource:    eventSource,
				date:           d,
				theme:          theme,
				layout:         'overview'  // original, overview, detailed
			})
		];
		bandInfos[1].syncWith = 0;
		bandInfos[1].highlight = true;
		
		bandInfos[2].syncWith = 1;
		bandInfos[2].highlight = true;
		
		this.tl = Timeline.create(document.getElementById("tl"), bandInfos, Timeline.HORIZONTAL);
		/*this.tl.loadJSON("data.json?"+ (new Date().getTime()), function(json, url) { 
			eventSource.loadJSON(json, url); 
		});*/
		timeline.repository.getEvents(function(json, url) {	
			eventSource.loadJSON(json, url); 
		});

	},
	
	resize: function() {
	
		if (timeline.resizeTimerID == null) {
			timeline.resizeTimerID = window.setTimeout(function() {
				timeline.resizeTimerID = null;
				timeline.tl.layout();
			}, 50);
		}
	}
};