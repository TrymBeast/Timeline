

timeline.presenter.image = {


	shown: false,

	init: function() {

		var self = this;

		$(document).keyup(function(e){
		    if(e.keyCode === 27 && self.shown) self.hide();
		});

	},

	show: function(obj) {

		this.shown = true;
		var html = this.createHTML(obj);
		$('#imageGallery').append(html);

		var galleries = $('#imageGallery .ad-gallery').adGallery({
		 	
		 	loader_image: 'lib/AD Gallery 1.2.7/lib/loader.gif',
			// Width of the image, set to false and it will 
			// read the CSS width
			width: 1150, 
			// Height of the image, set to false and it 
			// will read the CSS height
			height: 500, 
			// Opacity that the thumbs fades to/from, (1 removes fade effect)
			// Note that this effect combined with other effects might be 
			// resource intensive and make animations lag
			thumb_opacity: 0.7,

			start_at_index: 0,
			scroll_jump: 0
		});

		$('#imageGallery, #overlay').show();
	},

	hide: function() {
		this.shown = false;
		$('#imageGallery').children().remove();
		$('#imageGallery, #overlay').hide();
	},

	createHTML: function(obj) {


		var html = $('<div class="ad-gallery">' +
						'<div class="ad-image-wrapper"></div>' + 
						'<div class="ad-controls"></div>' + 
						'<div class="ad-nav">' +
							'<div class="ad-thumbs">' +
								'<ul class="ad-thumb-list">' +
								'</ul>' + 
							'<div>' +
						'<div>' +
					'</div>');

		var ul = html.find('ul');
		var related = timeline.repository.getRelatedEvents(obj);

        function createNode(obj) {

        	var title = obj.title + " " + obj.start;
        	return '<li>' + 
        			'<a href="' + obj.image + '">' +
        				'<img src="' + obj.icon + '" title ="' + title + '" />'
        			'</a>' +
        		'</li>';
        }

        $(related).each(function(){
        	ul.append( $(createNode( $(this)[0] )) );
        });

		return html;
	}

};