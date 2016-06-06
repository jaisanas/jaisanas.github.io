var Word = Backbone.Model.extend({
	move: function() {
		this.set({y:this.get('y') + this.get('speed')});
	}
});

var Words = Backbone.Collection.extend({
	model:Word
});

var WordView = Backbone.View.extend({
	initialize: function() {
		$(this.el).css({position:'absolute'});
		var string = this.model.get('string');
		var letter_width = 25;
		var word_width = string.length * letter_width;
		if(this.model.get('x') + word_width > $(window).width()) {
			this.model.set({x:$(window).width() - word_width});
		}
		for(var i = 0;i < string.length;i++) {
			$(this.el)
				.append($('<div>').addClass('letter')
					.css({
						width:letter_width + 'px',
						'min-width':letter_width + 'px',
						padding:'5px 2px',
						'border-radius':'4px',
						'background-color':'#fff',
						border:'1px solid #ccc',
						'text-align':'center',
						float:'left'
					})
					.text(string.charAt(i).toUpperCase()));
		}
		
		this.listenTo(this.model, 'remove', this.remove);
		
		this.render();
	},
	
	render:function() {
		var string = this.model.get('string');
		var letter_width = 25;
		var word_width = string.length * letter_width;
		$(this.el).addClass('word').css({
			'min-width':word_width + 'px',
			top:this.model.get('y') + 'px',
			left:this.model.get('x') + 'px'
		});
		
		
		var highlight = this.model.get('highlight');
		$(this.el).find('div').each(function(index,element) {
			if(index < highlight) {
				$(element).css({'font-weight':'bolder','background-color':'#aaa',color:'#fff'});
			} else {
				$(element).css({'font-weight':'normal','background-color':'#fff',color:'#000'});
				//score1.decrement();
			}
		});
	}
});

var Button = Backbone.Model.extend({
	
});

var Score = Backbone.Model.extend({
	
	increment: function() {
				this.set({score: this.get('score') +1});
			  },
	decrement: function() {
				this.set({score: this.get('score') - 1});
			 }
});

var ScoreView = Backbone.View.extend({
	initialize: function () {
		var score = this.model.get('score');
		var scoreView = $(this.el).append($('<div>').addClass('score').css({
							'top':'10',
							'left':'10',
							'width':'20px',
							padding:'5px 2px',
							'border-radius':'4px',
							'background-color':'#fff',
							border:'1px solid #ccc',
							'text-align':'center',
							'margin-left':'10px',
							'margin-top':'10px',
							'z-index':'1000'
						}).text(score));
		},
		
	render: function () {
		$('.score').text(this.model.get('score'));
	}
});

var StopView = Backbone.View.extend({
	initialize: function() {
	 var button = $(this.el).append($('<button>').addClass('btn btn-danger').
			css({'left':'78px',
				'margin-bottom':'10px',
				'bottom':'0',
				'z-index':'1000',
				position:'absolute'}).append('stop')).click(function() {
					
				})
	},
	render: function() {
	}
});

var StartView = Backbone.View.extend({
	initialize: function() {
		var string = 'stop';
		var stop_width = string.length*15;
		var button = $(this.el).append($('<button>').addClass('btn btn-success').
			css({'left':stop_width+75+'px',
				'margin-bottom':'10px',
				'bottom':'0',
				'z-index':'1000',
				position:'absolute'}).append('start'));
	},
	render: function() {
	}
});

var PauseView = Backbone.View.extend({
	initialize: function() {
		var left = this.model.get('value');
		var button = $(this.el).append($('<button>').addClass('btn btn-primary').
			css({'left':left+'px',
				'margin-bottom':'10px',
				'bottom':'0',
				'z-index':'1000',
				position:'absolute'}).append('Pause'));
	},
	render: function() {
	}
});

var ResumeView = Backbone.View.extend({
	initialize: function() {
		var left = this.model.get('value1');
		var button = $(this.el).append($('<button>').addClass('btn btn-warning').
			css({'left':left+'px',
				'margin-bottom':'10px',
				'bottom':'0',
				'z-index':'1000',
				position:'absolute'}).append('Resume'));
	},
	render: function() {
	}
});



var TyperView = Backbone.View.extend({
	initialize: function() {
		var viewWrapper = $('<div>');
		
		var score1 = this.model.get('scoreModel');
		new ScoreView({
			model:score1,
			el:viewWrapper
		});
		var wrapper = $('<div>')
			.css({
				position:'fixed',
				top:'0',
				left:'0',
				width:'100%',
				height:'100%'
			});
		this.wrapper = wrapper;
		var string = 'stop';
		var stop_width = string.length*15;
		var self = this;
		var stop = self.model;
		this.wrapper.append(viewWrapper);
		var text_input = $('<input>')
			.addClass('form-control')
			.css({
				'border-radius':'4px',
				position:'absolute',
				bottom:'0',
				'min-width':'70%',
				width:'70%',
				'margin-bottom':'10px',
				'z-index':'1000'
			}).keyup(function() {
				var words = self.model.get('words');
				for(var i = 0;i < words.length;i++) {
					var word = words.at(i);
					var typed_string = $(this).val();
					var string = word.get('string');
					if(string.toLowerCase().indexOf(typed_string.toLowerCase()) == 0) {
						word.set({highlight:typed_string.length});
						if(typed_string.length == string.length) {
							$(this).val('');
						}
						
						if(word.get('highlight') < 1) {
							score1.decrement();
							$('.score').text(score1.get('score'));
							console.log('gagal');
						} 
						console.log('berhasil');
						score1.increment();
						var val = score1.get('score').toString();
						if(val.length < 1) {
							val = 1;
						}
						var scoreWidth = val.length * 20;
						
						$('.score').css('width',scoreWidth+'px').text(score1.get('score'));
					} else {
						word.set({highlight:0});
						score1.set({score:score1.get('score') - 1})
						$('.score').text(score1.get('score'));
						console.log('gagal');
					}
				}
			});
		
		$(this.el)
			.append(wrapper
				.append($('<form>')
					.attr({
						role:'form'
					})
					.submit(function() {
						return false;
					})
					.append(text_input))).append(($('<button>').addClass('test').
						css({'left':'78px',
							'margin-bottom':'10px',
							'bottom':'0',
							'z-index':'1000',
							position:'absolute'}).append('stop')).click(function() {
							var id = stop.start_animation(4);
							self.control = 4;
							$('.word').remove();
					})).append(($('<button>').addClass('test2').
					css({'left':stop_width+75+'px',
						'margin-bottom':'10px',
						'bottom':'0',
						'z-index':'1000',
						position:'absolute'}).append('start')).click(function () {
							$('.word').remove();
							var id = stop.start_animation(1);
						}));
		text_input.css({left:((wrapper.width() - text_input.width()) / 2)-25 + 'px'});
		text_input.focus();
		var left = ((wrapper.width() - text_input.width()) / 2) +text_input.width()+5;
		var left1 = ((wrapper.width() - text_input.width()) / 2) +text_input.width()+75;
		var modelButton = new Button ({
			value : left,
			value1 : left1
			
		});
		new StopView({
			el:viewWrapper
		});
		
		
		new StartView({
			el:viewWrapper
		});
		var view = new PauseView ({
			el:viewWrapper,
			model:modelButton
		});
		
		new ResumeView({
			el:viewWrapper,
			model:modelButton
		})
		
		this.listenTo(this.model, 'change', this.render);
	},
	
	render: function() {
		if(self.control != 4) {
		var model = this.model;
		var words = model.get('words');
		var score1 = model.get('scoreModel');
		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			if(!word.get('view')) {
				var word_view_wrapper = $('<div>');
				this.wrapper.append(word_view_wrapper);
				word.set({
					
					view:new WordView({
						sModel: '5',
						model: word,
						el: word_view_wrapper
					})
				});
			} else {
				word.get('view').render();
			}
		}
		}else {
			var model = this.model;
		var words = model.get('words');
		
		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			if(!word.get('view')) {
				var word_view_wrapper = $('<div>');
				this.wrapper.append(word_view_wrapper);
				word.set({
					view:new WordView({
						model: null,
						el: null
					})
				});
			} else {
				word.get('view').render();
			}
		}
		}
		
	}
});

var Typer = Backbone.Model.extend({
	defaults:{
		scoreModel:new Score({score:0}),
		max_num_words:10,
		min_distance_between_words:50,
		words:new Words(),
		min_speed:1,
		max_speed:5
	},
	
	initialize: function() {
		new TyperView({
			model: this,
			el: $(document.body)
		});
	},
	
	start_animation: function(properties) {
		console.log('animation id');
		var animation_delay = 100;
		var self = this;
		if(properties != 4) {
			this.animateId = setInterval(function() {
			self.iterate();
			},animation_delay);
		}else if (properties == 4){
			clearInterval(this.animateId);
		}
		return this.animateId;
	},
	
	start: function() {
		var id = function () {
			this.start_animation();
		}
	},
	
	iterate: function() {
		var words = this.get('words');
		if(words.length < this.get('max_num_words')) {
			var top_most_word = undefined;
			for(var i = 0;i < words.length;i++) {
				var word = words.at(i);
				if(!top_most_word) {
					top_most_word = word;
				} else if(word.get('y') < top_most_word.get('y')) {
					top_most_word = word;
				}
			}
			
			if(!top_most_word || top_most_word.get('y') > this.get('min_distance_between_words')) {
				var random_company_name_index = this.random_number_from_interval(0,company_names.length - 1);
				var string = company_names[random_company_name_index];
				var filtered_string = '';
				for(var j = 0;j < string.length;j++) {
					if(/^[a-zA-Z()]+$/.test(string.charAt(j))) {
						filtered_string += string.charAt(j);
					}
				}
				
				var word = new Word({
					x:this.random_number_from_interval(0,$(window).width()),
					y:0,
					string:filtered_string,
					speed:this.random_number_from_interval(this.get('min_speed'),this.get('max_speed'))
				});
				words.add(word);
			}
		}
		
		var words_to_be_removed = [];
		for(var i = 0;i < words.length;i++) {
			var word = words.at(i);
			test = word.move();
			if(word.get('y') > $(window).height() || word.get('move_next_iteration')) {
				words_to_be_removed.push(word);
			}
			if(word.get('highlight') && word.get('string').length == word.get('highlight')) {
				word.set({move_next_iteration:true});
			}
		}
		
		for(var i = 0;i < words_to_be_removed.length;i++) {
			words.remove(words_to_be_removed[i]);
		}
		
		this.trigger('change');
	},
	
	iterate2: function() {
		self = this;
		self.defaults = {};
	},
	
	random_number_from_interval: function(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
});