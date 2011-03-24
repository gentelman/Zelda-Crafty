Crafty.c("vida", {


	_hearthCurrent:30,
	 
	 vida: function(hearthCurrent) {
	  	this._hearthCurrent = hearthCurrent;
	 	return this;
	 },
	 
	 dolor: function(by) {
	 	this._hearthCurrent -= by;
	 	/*this.trigger("dolor" , {by: by, hearthCurrent: this._hearthCurrent});
	 		if(this._hearthCurrent <= 0) {
	 			this.trigger("die");*/
	 		
	 		return this;
	 		
	 },
	 
	 curar: function(by) {
	 	this._hearthCurrent +=by;
	 	/*this.trigger("curar");*/
	 	return this;
	 }
});

 
    