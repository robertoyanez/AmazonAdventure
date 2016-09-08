var TITULO_OBJETO1="Escudo Alto Amazonas";
var TITULO_OBJETO2="Tocado";
var TITULO_OBJETO3="Tobillera";
var TITULO_OBJETO4="Vasija";
var INFO_OBJETO1 = "Procedencia Ecuador\n de madera y pigmentos\n Tallado, perforado y pintado\n Este escudo es característico\n de las familias \n Aguaruna, Huambisa y Macas";
var INFO_OBJETO2 = "Procedencia Brasil\n tocado formado de un grueso\n cordel de algodón con\n 2 tipos de plumas:\n de águila arpía y guacamayo\n de color rojo\n típico de los Kayapo-Xikrin";
var INFO_OBJETO3 = "Procedencia Perú\n tobillera de\n semillas de bejuco.\n Tambien conocido como\n Makich.\n Esto es típico de los\n Jíbaro-Aguaruna";
var INFO_OBJETO4 = "Procedencia Perú\n vacija de cerámica shipibo\n esta cerámica es considerada\n la más representativa\n de este grupo de la\n Amazonía. Incluso \n sus creencias están\n relacionados con este arte.";

/******************** SPRITE'S DEL INVENTARIO*********************************/

Quintus.Inventory = function(Q){
Q.Sprite.extend("Obj1",{
  init: function(p){
    this._super(p,{
      sheet: "obj1",
      sensor: true,
      type: Q.SPRITE_OBJETO,
      collisionMask: Q.SPRITE_NONE,// asi puedo pasar entre los objetos sin q m colisione
      gravity: 0
    });

    this.add("2d, tween");

    this.on("sensor");
  },

  sensor: function(col){//el unico que puede colisionar con los objetos es el Jugador
    if(Q.inputs['confirm']){//si a pulsado recoger el objeto
      this.animate({x: this.p.x - 160, y: this.p.y - 320}, 1/3, Q.Easing.Quadratic.In, { callback: function(){
            //Muestro informacion del objeto recogido
            Q.stage().pause();
            Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO1, i:true ,  titulo: TITULO_OBJETO1});
            Q.scenes.HUD.cambiarSheet(1);//cambio el sheet
            this.die();
          }
      });
    } 
  },

  die: function(){
    this.destroy();
  }
});

Q.Sprite.extend("Obj2",{
  init: function(p){
    this._super(p,{
      sheet: "obj2",
      sensor: true,
      type: Q.SPRITE_OBJETO,
      collisionMask: Q.SPRITE_NONE,
      gravity: 0
    });

    this.add("2d, tween");

    this.on("sensor");
  },

  sensor: function(col){//el unico que puede colisionar con los objetos es el Jugador
    if(Q.inputs['confirm']){//si a pulsado recoger el objeto
      this.animate({x: this.p.x - 100, y: this.p.y - 320}, 1/3, Q.Easing.Quadratic.In, { callback: function(){
            //Muestro informacion del objeto recogido
            Q.stage().pause();
            Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO2, i:true,  titulo: TITULO_OBJETO2});
            Q.scenes.HUD.cambiarSheet(2);//cambio el sheet
            this.die();
          }
      });
    } 
  },

  die: function(){
    this.destroy();
  }
});

Q.Sprite.extend("Obj3",{
  init: function(p){
    this._super(p,{
      sheet: "obj3",
      sensor: true,
      type: Q.SPRITE_OBJETO,
      collisionMask: Q.SPRITE_NONE,
      gravity: 0
    });

    this.add("2d, tween");

    this.on("sensor");
  },

  sensor: function(col){//el unico que puede colisionar con los objetos es el Jugador
    if(Q.inputs['confirm']){
      this.animate({x: this.p.x - 30, y: this.p.y - 340}, 1/4, Q.Easing.Quadratic.In, { callback: function(){
            //Muestro informacion del objeto recogido
            Q.stage().pause();
            Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO3, i:true ,  titulo: TITULO_OBJETO3});
            Q.scenes.HUD.cambiarSheet(3);//cambio el sheet
            this.die();
          }
      });
    }
  },

  die: function(){
    this.destroy();
  }
});

Q.Sprite.extend("Obj4",{
  init: function(p){
    this._super(p,{
      sheet: "obj4",
      sensor: true,
      type: Q.SPRITE_OBJETO,
      collisionMask: Q.SPRITE_NONE,
      gravity: 0
    });

    this.add("2d, tween");

    this.on("sensor");
  },

  sensor: function(col){//el unico que puede colisionar con los objetos es el Jugador
    if(Q.inputs['confirm']){//si a pulsado recoger el objeto
      this.animate({x: this.p.x - 10, y: this.p.y - 320}, 1/3, Q.Easing.Quadratic.In, { callback: function(){
            //Muestro informacion del objeto recogido
            Q.stage().pause();
            Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO4, i:true ,  titulo: TITULO_OBJETO4});
            Q.scenes.HUD.cambiarSheet(4);//cambio el sheet
            this.die();
          }
      });
    } 

  },

  die: function(){
    this.destroy();
  }
});


};