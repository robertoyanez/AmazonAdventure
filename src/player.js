var direccionPlayer= "right";
var posXPlayer = 0;

window.addEventListener("load",function() {

  // Set up an instance of the Quintus engine  and include
  // the Sprites, Scenes, Input and 2D module. The 2D module
  // includes the `TileLayer` class as well as the `2d` componet.
  var Q = window.Q = Quintus({audioSupported: ['mp3','ogg' ]})
          .include("Sprites, Scenes, Input, UI, Touch, 2D, TMX, Anim,"+ 
            "Audio, Inventory, HUD, Escenas, Enemy, LoadAssetAnim, HelpPlayer, Obstacle, Goal")
          // Maximize this game to whatever the size of the browser is
          .setup({ width: 750, height:480, development: true})
          // And turn on default input controls and touch input (for UI)
          .controls(true).touch()
          // Enable sounds.
          .enableSound();

  // Load and init audio files.
  PIEDRA = false;//booleana para no tener 2 piedras al mismo tiempo
  LANZAR = false;

  Q.SPRITE_PLAYER = 1;
  Q.SPRITE_ENEMY = 2;
  Q.SPRITE_OBJETO = 4;
  Q.SPRITE_META = 8;
  Q.SPRITE_WATER = 16;


  // ********************************** PLAYER [NIVEL 1]*****************************************
  Q.Sprite.extend("Player",{
    init: function(p) {
      this._super(p, {
        sheet: "playerW",  // Setting a sprite sheet sets sprite width and height
        sprite: "player",
		    jumpSpeed: -440,
        dead: false,
        gravity: 1,
        points: [ [ -3, -31], [ 5,  -31 ], [ 3, 31 ], [ -5, 31] ],
        type: Q.SPRITE_PLAYER,
        collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_OBJETO,
        procesar: true

      });

      this.add('2d, platformerControls, animation, tween');

      this.on("bump.left, bump.top, bump.right",function(colision){
          if((colision.obj.isA("Hormiga") || colision.obj.isA("Rata") || colision.obj.isA("Buitre") || colision.obj.isA("Abeja") || colision.obj.isA("Shooter") || colision.obj.isA("Bala")) ){
            this.p.sheet = "playerDd";
            this.setDead();
          }
      });
      this.on("compruebaMuerte");

    },

    compruebaMuerte: function(){
        Q.state.inc("vidas",-1);
        if(Q.state.get("vidas") == 0){
           this.deadM();
        }
        else{
           this.p.sheet = "playerW";
           Q.scenes.level1.eliminaEnemigos();//quito todos los enemigos que aun esten vivos en la escena
           Q.scenes.level1.aniadeEnemigos(); // vuelvo a poner todos los enemigos
           /*this.p.direction = "right";
           this.p.flip = ""; //Asi cuando muere hacia la izquierda me lo pone de nuevo a la derecha*/
        }
        this.p.procesar = true;
        this.p.dead = false;
    },

    step: function(dt) {
        posXPlayer = this.p.x;
        if(this.p.procesar){//para las vidas

          if((this.p.y > 520) ||(this.p.dead)) {
            Q.audio.play("daniar.mp3");
            this.p.procesar = false;
            this.p.sheet = "playerDd";
            if(Q.state.get("vidas") > 1){
              this.p.x = 200;
              this.p.y = 450;
              this.animate({x:200,y:500, angle:0}, 0.8, Q.Easing.Quadratic.In,{callback: function(){
                  this.trigger("compruebaMuerte");
                }}
              );
            }
            else{
              this.animate({y:480, angle:0}, 0.8, Q.Easing.Quadratic.In,{callback: function(){
                  this.trigger("compruebaMuerte");
                }}
              );
            }
          }
        } //fin procesar

        // movements
        if(Q.inputs['down']){
          this.p.points = [ [ -3, 33], [ 5,  0 ], [ 3, 0 ], [ -5, 21] ];
         
          this.p.sheet = "playerD";
          if(Q.inputs['right']){
            this.play("down_right");
          }
          else if(Q.inputs['left']){
            this.play("down_left");
          }
        }
        else if(Q.inputs['up']){
          
          if(Q.inputs['right']){
            this.play("jump_right");
          }
          else if(Q.inputs['left']){
            this.play("jump_left");
          }
          else{
            this.p.sheet = "playerJ";
          }
        }
       else if(Q.inputs['fire']){
          this.createRock();
        }
        else{
          if(!LANZAR)
            this.p.sheet = "playerW";
          this.p.points = [ [ -3, -31], [ 5,  -31 ], [ 3, 31 ], [ -5, 31] ];
          if(this.p.vx > 0) {
            if(this.p.landed > 0) {
              this.play("walk_right");
            } 
            else {
              this.play("jump_right");
            }
            this.p.direction = "right";
          } 
          else if(this.p.vx < 0) {
            if(this.p.landed > 0) {
              this.play("walk_left");

            } 
            else {
              this.play("jump_left");
            }
            this.p.direction = "left";
          } 
          else if(!LANZAR){
            this.play("stand_" + this.p.direction);
          }
        }


        if(this.p.x >= 7120 && this.p.x <= 7150){

            if(Q.state.get("myInventario") == 4){
              Q.stage().pause();
              Q.stageScene("endGame",2, { label: "Has conseguido recolectar los 4 \n objetos, ahora huye de la selva! \n toma mi canoa", sigNivel:true, labelB: "Ok" });
            }else{
              Q.stage().pause();
              Q.stageScene("aviso",2, { label: "Para conseguir pasar tendrás\n que recolectar todos los objetos\n vuelve a por ellos" });//reutilizo el aviso del mono
              this.p.x = 7100;
            }

        }
        direccionPlayer = this.p.direction;
    },

    createRock: function(){
      if(PIEDRA==false && this.p.vx==0 && this.p.vx==0){
        this.p.sheet="lanzar";
        
        if(direccionPlayer == 'right'){
            this.play("lanzar");
            PIEDRA = true;
            Q.audio.play("tirar.mp3");
            this.stage.insert(new Q.Rock({x: this.p.x + 20, y: this.p.y -10, vx: 200 , vy: -500})); //120-50
        }
        else{
          this.play("lanzar_left");
          PIEDRA = true;
          Q.audio.play("tirar.mp3");
          this.stage.insert(new Q.Rock({x: this.p.x - 20, y: this.p.y -10, vx: -200 , vy: -500})); //-120-50
        }
      }
    },

    deadM: function(){
      Q.audio.stop("musica_fondo.mp3");
      Q.stage().pause();
      Q.stageScene("endGame",2, { label: "Has perdido", labelB: "Ok", mPrincipal: true});
      this.destroy(); 
    },
    
    setDead: function(){
      this.p.dead = true;
    },

    resetLevel: function() {
      Q.stageScene("level1");
    }
  });



// ********************************** PLAYER [NIVEL 2]*****************************************
    Q.Sprite.extend("Boat",{
   		init: function(p) {
	      	this._super(p, {
            sheet: "boatStart",  
            sprite: "boatPlayer",
		    x: 380,
		    y: 9950,
            gravity : 0,
            type: Q.SPRITE_PLAYER,
            collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_META,
			procesar: true,
            points: [ [ -3, -31], [ 5,  -31 ], [ 3, 31 ], [ -5, 31] ]
	      	});

	      this.add('2d,platformerControls, animation, tween');

		  this.on("bump.left, bump.top, bump.right",function(collision){
			this.die();
		  });
	    },

      step : function(dt){
		  
        //comprobacion de limites
        if(this.p.x <= 40){
          this.p.x = 50;
        }else if(this.p.x >= 690){
          this.p.x = 680;
        }

        if(this.p.y < 5000)
          this.p.vy = -450;
        else if(this.p.y > 4000 && this.p.y < 5000)
          this.p.vy = -400;
        else if(this.p.y > 3000 && this.p.y < 4000)
          this.p.vy = -350;
		else if(this.p.y > 2000 && this.p.y < 3000)
          this.p.vy = -300;
		else if(this.p.y > 1000 && this.p.y < 2000)
          this.p.vy = -250;
        else 
          this.p.vy = -200;

        //movimientos
        if(Q.inputs['left']){
            this.play("boat_left");
        }
        else if(Q.inputs['right']){
            this.play("boat_right");
        }
        else{
            this.p.sheet = "boatStart";
        } 
      },

	die: function(){
		if(this.p.procesar){//para las vidas
			this.p.procesar = false;
			Q.state.inc("vidas",-1);
        if(Q.state.get("vidas") > 0){
        Q.audio.play("crash.mp3");
				this.p.y = 9950;
				this.p.x = 380;
				this.p.procesar = true;
			}else{
        Q.stage().pause();
				Q.stageScene("endGame",2, { label: "Has perdido\n 0 vidas", labelB: "Ok", mPrincipal: true});
			}
		}
	},
	
	win: function(){
		this.animate({x:this.p.x, y:this.p.y - 300},0.5, Q.Easing.Linear,{delay: 0.1, callback: function(){
				Q.stage().pause();
				Q.stageScene("endGame",2, { label: "Has ganado!!", labelB: "Ok", win: true});
            }}
        );
	}
	});

});


