window.onload = function() {
    
    Crafty.init(50, 1024, 768);
    Crafty.canvas();
    // convierto los sprites del mapa en componentes usables
    Crafty.sprite(32, "assets/images/sprite.png", {
        grass1: [0,2],
        grass2: [1,2],
        grass3: [2,2],
        arbusto1: [3,2],
        arbusto2: [4,2],
		rupia: [0,3],
		player: [0,0,0,2]
       });
   		
   		//metodo que genera el mapa aleatoriamente
    function generateWorld() {
    
    	//genera grass a lo largo del eje-x
        for(var i = 0; i < 32; i++) {
            //genera grass a lo largo del eje-y
            for(var j = 0; j < 24; j++) {
                grassType = Crafty.randRange(1, 3);
                Crafty.e("2D, canvas, grass"+grassType)
                    .attr({x: i * 32, y: j * 32});
                
                //probabilidad del dibujado de rupias
                if(i > 0 && i < 32 && j > 0 && j < 23 && Crafty.randRange(0, 49) > 48) {
                
                
          			  var rupia = Crafty.e("2D, DOM, rupia, animate, collision")
                        .attr({x: i * 30, y: j * 24})
                        .animate("brillo", 0,3,3) 

                        .bind("enterframe", function() {
                            if(!this.isPlaying())
                                this.animate("brillo", 15);
                        // la rupia desaparece cuando player colisiona con el
                        }).collision()
                        .onhit("player", function() {
                    				    
                                       
                        				this.destroy();
                        				
                        				});
                }
            }
        }
       
        //crea arbustos a lo largo del eje-x que forma el limite
        for(var i = 0; i < 32; i++) {
            Crafty.e("2D, canvas, wall_top, arbusto"+Crafty.randRange(1,2))
                .attr({x: i * 32, y: 0, z: 2});
            Crafty.e("2D, canvas, wall_bottom, arbusto"+Crafty.randRange(1,2))
                .attr({x: i * 32, y: 735, z: 2});
        }
        
        //crea los arbustos a lo largo del eje-y
        
        for(var i = 1; i < 25; i++) {
            Crafty.e("2D, canvas, wall_left, arbusto"+Crafty.randRange(1,2))
                .attr({x: 0, y: i * 30, z: 2});
            Crafty.e("2D, canvas, wall_right, arbusto"+Crafty.randRange(1,2))
                .attr({x: 990, y: i * 32, z: 2});
        }
    }
    
    //la pantalla de carga que se muestra antes de cargar el mapa
    Crafty.scene("loading", function() {
        //load coge un array del asset y hace un callback cuando este completado
        Crafty.load(["assets/images/sprite.png"], function() {
            Crafty.scene("main"); //cuando todo este cargado, lanza la escena principal
            
        });
        
        //fondo negro con algun texto de carga
        Crafty.background("#000");
        Crafty.e("2D, DOM, text").attr({w: 100, h: 20, x: 150, y: 120})
            .text("Cargando")
            .css({"text-align": "center"});
    });
    
 
    
    //juega automaticamente la escena "cargando"
    Crafty.scene("loading");
    
    Crafty.scene("main", function() {
        generateWorld();
      
      
        
        //hud informacion de rupias
        		var rupiaCounter = Crafty.e("2D, DOM, text")
        			.text("Rupias: 0")
        			.attr({x: Crafty.viewport.width - 1000, y: Crafty.viewport.height -740, w: 120, h:25, z:2})
        			.css({color: "#000000", background:"#fff"});

        			
        			
              
        //crea la entidad del personaje con algunos componentes
        
        player = Crafty.e("2D, DOM, player, controls, zeldaway, animate, collision, rupiaCounter, vida")
			.attr({x: 500, y: 350, z: 1})
			.vida(30)
            .animate("walk_left", 21, 0, 27)
            .animate("walk_right", 14, 0, 20)
            .animate("walk_up", 7, 0, 13)
            .animate("walk_down", 0, 0, 6)
            .animate("cansado_left", 34, 0, 35)
            .animate("cansado_right", 32, 0, 33)
            .animate("cansado_up", 30, 0, 31)
            .animate("cansado_down", 28, 0, 29)
            .zeldaway()
           
            .bind("enterframe", function(e) {
                if(this.__move.left) {
                   		if(!this.isPlaying("walk_left"))
                        this.animate("walk_left", 10);
                }
                if(this.__move.right) {
                    if(!this.isPlaying("walk_right"))
                        this.animate("walk_right", 10);
                }
                if(this.__move.up) {
                    if(!this.isPlaying("walk_up"))
                        this.animate("walk_up", 20);
                }
                if(this.__move.down) {
                    if(!this.isPlaying("walk_down"))
                        this.animate("walk_down", 20);
                }
                
                //por que no funcionan las animaciones en diagonal?
                if(this.__move.up && this.__move.left || this.__move.up && this.__move.right ){
                if(!this.isPlaying("walk_up"))
                        this.animate("walk_up", 20);
                }
                
                if(this.__move.down && this.__move.left || this.__move.down & this.__move.right ){
                if(!this.isPlaying("walk_down"))
                        this.animate("walk_down", 20);
                }
                               
        
            }).bind("keyup", function(e) {
            
                        if( (this.__move.up || this.__move.down || this.__move.right || this.__move.left) == false)           {
                      this.stop();
                      if(e.keyCode === Crafty.keys.RA) {
                      	this.sprite(14, 0, 2);
                      }
                      if(e.keyCode === Crafty.keys.LA) {
                      	this.sprite(21, 0, 2);
                      }
                      if(e.keyCode === Crafty.keys.UA) {
                      	this.sprite(7, 0, 2);
                      }
                      if(e.keyCode === Crafty.keys.DA) {
                      	this.sprite(0, 0, 2);
                      	}
                      }
                      
            })
            
                      			
            .collision()
           
            .onhit("wall_left", function() {
               this.x += this._speed;
               if(this.__move.left) {
                  		if(!this.isPlaying("cansado_left"))
                       this.animate("cansado_left", 20);
               }
               
                    
            
            }).onhit("wall_right", function() {
                this.x -= this._speed;
                if(this.__move.right) {
                   		if(!this.isPlaying("cansado_right"))
                        this.animate("cansado_right", 20);
                }
                
               
            }).onhit("wall_bottom", function() {
                this.y -= this._speed;
                if(this.__move.down) {
                   		if(!this.isPlaying("cansado_down"))
                        this.animate("cansado_down", 20);
                }
           
           
            }).onhit("wall_top", function() {
            this.y += this._speed;
            if(this.__move.up) {
                   	if(!this.isPlaying("cansado_up"))
                                      	
                    this.animate("cansado_up", 20);
        
            }
       
                
              
                	
                  
                
            //cuando la entidad player colisiona con la rupia, se incrementa el contador
            }).onhit("rupia", function() {
				player.incrementRupia(1);
            		rupiaCounter.text("Rupias: "+player._rupiaCounter);
            	player.dolor(1);
            		hearthCounter.text("Vida: "+player._hearthCurrent);	
            })
            
            
            //hud vida
            var hearthCounter = Crafty.e("2D, DOM, text")
            		.text("Vida: "+player._hearthCurrent)
            		.attr({x: Crafty.viewport.width - 400, y: Crafty.viewport.height -740, w: 120, h:25, z:2})
            		.css({color: "#000000", background:"#fff"});
    });
    
    
};
