/*Las rocas pueden ayudar a matar si tienes buena punteríaa los enemigos que puedes encontrar 
	en el nivel 1; y el Mono te puede dar pistas para que consigas pasar el nivel*/
	
Quintus.HelpPlayer = function(Q){

/********************************** ROCK **************************************/
  Q.Sprite.extend("Rock", {
    init: function(p){
      this._super(p, {
        asset: "rock.png",
        gravity: 1,
      });
      LANZAR=false;
      this.add('2d, animation');
      this.p.initialX = this.p.x;
      this.p.initialY = this.p.y;
    
      this.on("bump.left, bump.right, bump.top, bump.bottom", function(collision) {
        if((collision.obj.isA("Hormiga") || collision.obj.isA("Rata") || collision.obj.isA("Buitre") || collision.obj.isA("Abeja") || collision.obj.isA("Shooter") || collision.obj.isA("Bala")) ){
           collision.obj.die(collision);
           PIEDRA = false;
           this.destroy();
        }
        else{
          Q.audio.play("hit.mp3");
          PIEDRA = false;
          this.destroy();
        }
      });
    },

    step: function(dt){
      if(this.p.y>600){
        PIEDRA = false;
        this.destroy();
      }

    }
  });
/**********************************END ROCK**************************************/


/***********************GUIDE MONKEY****************************/
  Q.Sprite.extend("Mono",{
    init : function(p) {
      this._super(p, {
        sheet: "mono",
        sprite: "mono_anim",
        scale: 1,
        collisionMask: Q.SPRITE_PLAYER,
        sensor: true,
      });
      this.add("animation");
      this.on("sensor");

    },
    sensor: function(col) {
      if(!this.desaparecer){
        Q.stage().pause();
        Q.stageScene("aviso",2, { label: this.p.texto });
        this.desaparecer = true;
      }
    },
    
    step: function(dt){
      this.play("mono");
      if(this.desaparecer){
        this.p.scale -= 0.005
        if(this.p.scale<0)
          this.destroy();
      }
    },
  }); 

  Q.scene('aviso',function(stage) {

    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    }));

    /*var button = container.insert(new Q.UI.Button({  fill: "white",
                                                    label: "Aceptar", y: 130 }))         
    var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h, 
                                                     label: stage.options.label,color: "white" }));*/

    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, border: 3, fill: "rgba(218,169,90,0.9)"
    }));

    var label = container.insert(new Q.UI.Text({ label: stage.options.label }));

    var button = container.insert(new Q.UI.Button({ y: 30 + label.p.h , fill: "#190710", 
                                                    fontColor: "#FFFFFF", label: "Ok", keyActionName: 'confirm'}))
    button.on("click",function() {
      Q.audio.play("tecla.mp3");
      Q.stage().unpause();
      Q.clearStage(2);
    });

    container.fit(20);
  }); 
/***********************END MONKEY****************************/

}