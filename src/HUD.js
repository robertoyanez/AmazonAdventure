
Quintus.HUD = function(Q){
/*Interfaz de los botones, para poder en cualquier otro 
  momento volver a mostrar la informacion del objeto*/
Q.UI.Button.extend("Objeto1",{
    init:function(p){
      this._super({ 
        x:180,
        sheet: "obj1Sombra",
        pulsable: false
        //keyActionName: 'fire'
      });
      
      this.on("click", function(){
        if(this.p.pulsable){
          Q.audio.play("tecla.mp3");
          Q.stage().pause();
          Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO1, titulo: TITULO_OBJETO1 });
        }
      });
    }
});

Q.UI.Button.extend("Objeto2",{
    init:function(p){
      this._super({ 
        x:240,
        sheet: "obj2Sombra",
        pulsable: false,
      });
      this.on("click", function(){
        if(this.p.pulsable){
          Q.audio.play("tecla.mp3");
          Q.stage().pause();
          Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO2, titulo: TITULO_OBJETO2});
        }
      });
    }
});

Q.UI.Button.extend("Objeto3",{
    init:function(p){
      this._super({ 
        x:300,
        sheet: "obj3Sombra",
        pulsable: false,
      });
      this.on("click", function(){
        if(this.p.pulsable){
          Q.audio.play("tecla.mp3");
          Q.stage().pause();
          Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO3, titulo: TITULO_OBJETO2 });
        }
      });
    }
});

Q.UI.Button.extend("Objeto4",{
    init:function(p){
      this._super({ 
        x: 360,
        sheet: "obj4Sombra",
        pulsable: false
      });
      this.on("click", function(){
        if(this.p.pulsable){
          Q.audio.play("tecla.mp3");
          Q.stage().pause();
          Q.stageScene("InfoObjeto", 2, { label: INFO_OBJETO4, titulo: TITULO_OBJETO2 });
        }
      });
    }
});


 Q.UI.Text.extend("Vidas",{
      init: function(p) {
        this._super({
          label: "Vidas: 4",
          x: 600,
          y: -15
        });
        //asi registra los cambios en las vidas
        Q.state.on("change.vidas",this,"vidas");
      },
      
      vidas: function(vidas) {
            this.p.label = "Vidas: " + vidas;
      }
 });

Q.scene('HUD', function(stage){
    var container = stage.insert(new Q.UI.Container({ x: 30, y: 30, w: 750, h: 70, fill: "rgba(219,169,1,0.5)"}));
    container.insert(new Q.UI.Text({ x:60, y:-15, label: "Inventario:"}));
    var buttonObj1 = container.insert(new Q.Objeto1());
    var buttonObj2 = container.insert(new Q.Objeto2());
    var buttonObj3 = container.insert(new Q.Objeto3());
    var buttonObj4 = container.insert(new Q.Objeto4());

    container.insert(new Q.Vidas());

    container.fit(5,750);

    /*Este metodo lo que permite es cambiar el sheet del sprite
      cuando este a sido coleccionado por el player.
      Ademas que se pueda hacer clic sobre este objeto para volver
      a ver su informacion*/
    this.cambiarSheet = function(objetoCambiar){
      switch(objetoCambiar){
        case 1: {
                  buttonObj1.p.sheet = "obj1";
                  buttonObj1.p.pulsable = true;
                }break;
        case 2: {
                  buttonObj2.p.sheet = "obj2";
                  buttonObj2.p.pulsable = true;
                }break;
        case 3: {
                  buttonObj3.p.sheet = "obj3";
                  buttonObj3.p.pulsable = true;
                }break;
        case 4: {
                  buttonObj4.p.sheet = "obj4";
                  buttonObj4.p.pulsable = true;}
                break;
        default: break;
      }
    }

    this.incrementaItem = function(){
      Q.state.inc("myInventario",1);
    }
});


  Q.scene('InfoObjeto',function(stage) {

    if( direccionPlayer == "right"){
      var container = stage.insert(new Q.UI.Container({x: 575, y: 88, border: 3, fill: "rgba(218,169,90,0.9)"}));
    }
    else{
      var container = stage.insert(new Q.UI.Container({x: 175, y: 88, border: 3, fill: "rgba(218,169,90,0.9)"}));
    }
    var titulo = container.insert(new Q.UI.Text({align: "center", label: stage.options.titulo}));       
    var label = container.insert(new Q.UI.Text({aling: "left", size:18, y: 10 + titulo.p.h, label: stage.options.label}));
    var button = container.insert(new Q.UI.Button({y: 50 + titulo.p.h + label.p.h , fill: "#190710", fontColor: "#FFFFFF", label: "Ok", keyActionName: 'confirm' }));

    button.on("click",function() {
      Q.audio.play("tecla.mp3");
      Q.stage().unpause();
      Q.clearStage(2);
      if(stage.options.i){//asi solo se incrementa el numero de items/objetos cuando lo e recogido dado que utilizo la escena tambien si el usuario quiere volver a ver la informacion de los item recolectados
        Q.scenes.HUD.incrementaItem();
      }
    });

    container.fit(20);
  });


};