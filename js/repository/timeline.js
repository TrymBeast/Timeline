

timeline.repository = {

	events: null,

	getEvents: function(callback) {

		var url = this.getUrl();
		if(this.events) {
			callback(this.events, url);
			return;
		}

		var self = this;
		$.get(url, function(res, status, xhr) {
			self.events = res;
			callback(res, url);
		});
	},

	getEventById: function(id) {
		for(var i = 0; i < this.events.events.length; ++i){
			if(this.events.events[i].id == id) return this.events.events[i];
		}

		return null;
	},

	getRelatedEvents: function(event, callback) {
		var related = [];

		if(event.related) {
			var rel = eval('(' + event.related + ')');
			for(var i = 0; i < rel.length; ++i){
				related.push( this.getEventById( rel[i] ) );
			}
		}

		return related;
	},

	getUrl: function() {
		return "data.json?" + (new Date().getTime());
	}

};