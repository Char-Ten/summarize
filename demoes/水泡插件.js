(function(win, doc) {
	function Snow(json) {
		/*
		 * json={
		 *	canvas:the canvas background's id;
		 * 	number:the number of snowflake;
		 * 	maxRadius:the max radius of snowflake;
		 * }
		 * */
		this.cav = doc.getElementById(json.canvas);
		this.cav.height = doc.body.scrollHeight||doc.documentElement.scrollHeight;
		this.cav.width = doc.body.scrollWidth||doc.documentElement.scrollWidth;
		this.number = json.number;
		this.ctx = this.cav.getContext('2d');
		this.maxRadius = json.maxRadius;
		this.index = [];
		this.run();
	}
	Snow.prototype = {
		drawSnow: function(j) {
			/*
			 j={
			 	radius:int,
			 	posX:int,
			 	posY:int,
			 	alpha:int
			 }
			 * */
			var snw = this;
			snw.ctx.beginPath();
			var grad = snw.ctx.createRadialGradient(j.posX, j.posY, 0.5* j.radius, j.posX, j.posY, j.radius);
//			grad.addColorStop(0.4, 'rgba(255,255,255,' + j.alpha / 2 + ')');
			grad.addColorStop(0, 'rgba(255,255,255,' + 0 + ')');
			grad.addColorStop(1, 'rgba(255,255,255,' + j.alpha + ')');
			snw.ctx.fillStyle = grad;
			snw.ctx.arc(j.posX, j.posY, j.radius, snw.reg(0), snw.reg(360), false);
			snw.ctx.fill();
			snw.ctx.closePath();

		},
		reg: function(num) {
			return num * Math.PI / 180;
		},
		beginFrame: function() {
			/*initialise:calculate the speed,position,snowflake's radius and alpha.
			 	
			 	speed:the more radius and alpha,the more speed fasts;
			 * */
			var snw = this;
			var json = {};
			for (var i = 0; i < snw.number; i++) {
				snw.initialiseSnowflake(json);
				json.posY = Math.random() * snw.cav.height;
				snw.index.push(json);
				snw.drawSnow(json);
				json = {};
			}
		},
		moveFrames: function() {
			var snw = this;
			snw.ctx.clearRect(0, 0, snw.cav.width, snw.cav.height);
			snw.index.forEach(function(o, i) {
				o.speed+=0.001*o.radius;
				o.posY -= o.speed;
				snw.drawSnow(o);
			})
		},
		outWin: function() {
			var snw = this;
			snw.index.forEach(function(o, i) {
				if (o.posY > snw.cav.height) {
					snw.initialiseSnowflake(o);
					o.posY = 0;
				}
				if (o.posY < 0) {
					snw.initialiseSnowflake(o);
					o.posY = snw.cav.height;
				}
			});
		},
		initialiseSnowflake: function(json) {
			var snw = this;
			json.posX = Math.random() * snw.cav.width;
			json.radius = parseInt(Math.random() * snw.maxRadius);
			json.alpha = Math.random() + 0.1;
			json.speed = 0.01 * json.radius + 0.5 * json.alpha + Math.random() * 0.01;
		},
		run: function() {
			var snw = this;
			var animation=window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			snw.beginFrame();

			function move() {
				snw.outWin();
				snw.moveFrames();
				animation(move);
			}
			animation(move);

		}
	}
	win.snowBg = function(j) {
		return new Snow(j);
	}
})(window, document)