Crafty.c("zeldaway", {
	__move: {left: false, right: false, up: false, down: false},	
	_speed: 3,
	
	init: function() {
		if(!this.has("controls")) this.addComponent("controls");
	},
	
	
	zeldaway: function(speed) {
		if(speed) this._speed = speed;
		var move = this.__move;
		
		this.bind("enterframe", function() {
			var old = this.pos(),
				changed = false;
			
			if(move.right) {
				this.x += this._speed;
				changed = true;
			}
			if(move.left) {
				this.x -= this._speed;
				changed = true;
			}
			if(move.up) {
				this.y -= this._speed;
				changed = true;
			}
			if(move.down) {
				this.y += this._speed;
				changed = true;
			}
			
		
		}).bind("keydown", function(e) {
			if(e.keyCode === Crafty.keys.RA) {
				move.right = true;
			}
			if(e.keyCode === Crafty.keys.LA) {
				move.left = true;
			}
			if(e.keyCode === Crafty.keys.UA) {
				move.up = true;
			}
			if(e.keyCode === Crafty.keys.DA) {
				move.down = true;
			
			}
			
			if (e.keyCode === Crafty.keys.L) {
			move.up = true;
			move.left = true;
			}
		
			
			
			this.preventTypeaheadFind(e);
		}).bind("keyup", function(e) {
			if(e.keyCode === Crafty.keys.RA) {
				move.right = false;
			}
			if(e.keyCode === Crafty.keys.LA) {
				move.left = false;
			}
			if(e.keyCode === Crafty.keys.UA) {
				move.up = false;
			}
			if(e.keyCode === Crafty.keys.DA) {
				move.down = false;
				
			}
		
			this.preventTypeaheadFind(e);
		});
		
		return this;
	}
});