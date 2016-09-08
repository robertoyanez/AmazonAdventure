
Quintus.Escenas = function(Q){

/*****************Pantalla de inicio, creditos y ayuda*************************/
Q.scene('mainTitle',function(stage) {
    Q.load("principal_intro.jpg", function(){
      stage.insert(new Q.pantallaPrincipal());
      Q.audio.play("musica_historia.mp3",{loop:true});
      Q.stageScene("opciones",1,{});
    });
  });

  Q.scene('opciones',function(stage){
    Q.load("boton_jugar.png, boton_ayuda.png, boton_creditos.png", function(){
      stage.insert(new Q.pantallaPrincipal());

      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0)", asset: "principal_intro.jpg"
      }));

      var botonJugar = container.insert(new Q.UI.Button({
        x: 0, y: 40, 
        asset: "boton_jugar.png",
        border: 5,
        shadow: 10,
        fill: "#000000",
        shadowColor: "rgba(0,0,0,0.5)",
      }));


      var botonCreditos = container.insert(new Q.UI.Button({
        x: -313, y: 180, asset: "boton_creditos.png"
      }));
      
      var botonAyuda = container.insert(new Q.UI.Button({
        x: 320, y: 180, asset: "boton_ayuda.png"
      }));
      
      container.fit(20);

      botonJugar.on("click",function() {
        Q.audio.play("tecla.mp3");
        Q.clearStages();
        Q.stageScene("Historia");
      });

      botonCreditos.on("click", function() {
        Q.audio.play("tecla.mp3");
        Q.clearStages();
        Q.stageScene("Creditos");
      });

      botonAyuda.on("click", function() {
        Q.audio.play("tecla.mp3");
        Q.clearStages();
        Q.stageScene("Instrucciones");
      });
    });
  });

  Q.scene('Historia',function(stage){
    Q.load("boton_continuar.png, principal_intro.jpg", function(){

      stage.insert(new Q.pantallaPrincipal());

      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0)"
      }));

      var label = container.insert(new Q.UI.Text({ x: 0, y: -60, color: "white", size : 18,
                           label: "En el siglo XIX los cuatro científicos españoles sobrevivientes \n de la Comisión Científica del Pacífico que descienden \n por el Amazonas, en esta travesía encuentran varios \n obstáculos que tendrán que superar para cumplir su \n misión, la cual es crear una gran colección botánica, \n zoológica y de objetos de comunidades indígenas nativas." }));

      var botonContinuar = container.insert(new Q.UI.Button({
        x: 0, y: 120, asset: "boton_continuar.png"
      }));

      container.fit(20);

      botonContinuar.on("click", function() {
        Q.audio.play("tecla.mp3");
        Q.clearStages();
        Q.audio.stop("musica_historia.mp3");
        Q.stageScene("level1"); //no esta hecho
      });
    });
  });

  Q.scene('Creditos',function(stage){
    Q.load("boton_volver.png", function(){

      stage.insert(new Q.pantallaPrincipal());

      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0)"
      }));

      var label = container.insert(new Q.UI.Text({ x: 0, y: -70, color: "white", size : 14,
                           label: "AUTORES: \n ANDREA RUEDA RUEDA \n LEANDRO ROBERTO YÁNEZ TORRES \n QIANG SUN" }));

      var label1 = container.insert(new Q.UI.Text({ x: 0, y: 20, color: "white", size : 15,
                           label: "Recursos: \n http://opengameart.org/ \n http://hasgraphics.com/ \n https://www.freesound.org/ \n http://spritedatabase.net/ \n http://espanol.ntm.org/" }));

      var botonVolver = container.insert(new Q.UI.Button({
        x: 0, y: 180, asset: "boton_volver.png"
      }));

      container.fit(20);

      botonVolver.on("click", function() {
        Q.audio.play("tecla.mp3");
        Q.clearStages();
        Q.stageScene("opciones");
      });
    });
  });

  Q.scene('Instrucciones',function(stage){
    Q.load("boton_volver.png", function(){

      stage.insert(new Q.pantallaAyuda());

      var container = stage.insert(new Q.UI.Container({
        x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0)"
      }));

      var botonVolver = container.insert(new Q.UI.Button({
        x: 0, y: 180, asset: "boton_volver.png"
      }));

      container.fit(20);

      botonVolver.on("click", function() {
        Q.audio.play("tecla.mp3");
        Q.clearStages();
        Q.stageScene("opciones");
      });
    });
  });


  /*para pintar las pantallas de fondos hay que hacer un sprite cada uno*/
  Q.Sprite.extend("pantallaPrincipal",{
  init: function(p) {   //Inicializacion del enemigo
    this._super(p, { 
      asset: "principal_intro.jpg",
      x: Q.width/2, 
      y: Q.height/2,
      gravity: 0
    });
  }
});

Q.Sprite.extend("pantallaAyuda",{
  init: function(p) {   //Inicializacion del enemigo
    this._super(p, { 
      asset: "intro_instrucciones.jpg",
      x: Q.width/2, 
      y: Q.height/2,
      gravity: 0
    });
  }
});


/*****************************NIVEL 1**************************************/
Q.scene("level1",function(stage) {
    Q.audio.play("musica_fondo.mp3",{loop:true});
    Q.stageTMX("nivel_selva.tmx",stage);
    stage.add("viewport").follow(Q("Player").first());
    //Objetivo del nivel
    stage.insert(new Q.Mono({x:500,y:522,texto:"HeyHeyHey! , para pasar de nivel \n tendrás que recolectar los 4 objetos de arriba \n Estan muy escondidos, así que fíjate bien \n Para matar a los enemigos puedes saltar encima de\nellos o pulsar 'space' para lanzar una piedra, ánimo!!"}));
    //como recoger inventario
    stage.insert(new Q.Mono({x:935,y:522,texto: "A mi derecha\n hay un objeto del inventario\n presiona 'ENTER' \n para recogerlo y quitar mensajes"}));
    //aviso de agacharse
    stage.insert(new Q.Mono({x:4250,y:522,texto: "¿Que tal la aventura?\n Es el momento de ensuciarte un poco\n Para pasar el siguiente obstáculo\nmanten pulsada 'DOWN' + 'Derecha' o 'Izquierda'\npara moverte"}));
    
    creaEnemigos(stage);//pone todos los enemigos en la escena

    stage.viewport.offsetX= 0;
    stage.viewport.offsetY= 120;

    Q.state.set("vidas",4);
    Q.state.set("myInventario",0);//tengo 0 objetos coleccionados
    Q.stageScene('HUD', 1);

    this.aniadeEnemigos=function(){//me permite aniadir los enemigos cuando perdemos una vida
      creaEnemigos(stage);
    }

    this.eliminaEnemigos=function(){//para eliminar los enemigos de esta escena
      eliminaEnemigos();
    }
  });

/*****************************NIVEL 2**************************************/
  Q.scene("level2",function(stage) {
    Q.audio.stop("musica_fondo.mp3");
    Q.audio.play("ondas_aguas.mp3",{loop:true});
    Q.audio.play("persecucion.mp3",{loop:true});
      Q.stageTMX("nivel_rio.tmx",stage);
	  stage.insert(new Q.Meta());
	  
	  var pla = stage.insert(new Q.Boat());
	  stage.add("viewport").follow(pla,{ x: false, y: true });
        
	  stage.viewport.offsetX= 0;
	  stage.viewport.offsetY= 170;
  });



  /***************Para cuando a terminado todas las vidas, pasar de nivel o ha ganado*****************/
  Q.scene('endGame',function(stage) {


    if(stage.options.win){//cuando ha ganado el juego completo
      Q.audio.stop("ondas_aguas.mp3");
      Q.audio.stop("persecucion.mp3");
      Q.audio.play("win.mp3");
    }else if(stage.options.mPrincipal){
      Q.audio.stop("musica_fondo.mp3");
      Q.audio.stop("ondas_aguas.mp3");
      Q.audio.stop("persecucion.mp3");
      Q.audio.play("fail.mp3");
    }

    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, border: 3, fill: "rgba(218,169,90,0.9)"
    }));

    var label = container.insert(new Q.UI.Text({ label: stage.options.label }));

    var button = container.insert(new Q.UI.Button({ y: 30 + label.p.h , fill: "#190710", 
                                                    fontColor: "#FFFFFF", label: stage.options.labelB, keyActionName: 'confirm' }))         
    
    button.on("click",function() {
     
      if(stage.options.sigNivel){//si ha conseguido el objetivo del nivel uno pasa al 2 o esta en el nivel 2
        Q.clearStage(0);
        Q.clearStage(2);
        //no quito la capa uno que es donde esta HUD
        Q.stageScene('level2');
      }else if(stage.options.win){//cuando ha ganado el juego completo
		    Q.clearStages();
		    Q.stageScene('Creditos'); 
        Q.audio.stop("win.mp3"); 
	    }else if(stage.options.mPrincipal){
		    Q.clearStages();
		    Q.stageScene("mainTitle");
        Q.audio.stop("fail.mp3"); 
	    }else{
        Q.clearStages();
        Q.stageScene('level1');
      }
    });
    container.fit(20);
  });
 

/***************PARA VOLVER A PINTAR LOS ENEMIGOS CUANDO PERDEMOS UNA VIDA******/
function creaEnemigos(stage){
    stage.insert(new Q.Rata({x:1300,y:500}));
    stage.insert(new Q.Rata({x:1450,y:500,vx:-50}));
    stage.insert(new Q.Hormiga({x:1600,y:500,vx:-50}));
    stage.insert(new Q.Abeja({x:2500,y:420, rangeX:200, rangeY:50}));
    stage.insert(new Q.Hormiga({x:3200,y:500,vx:50}));
    stage.insert(new Q.Hormiga({x:3400,y:500,vx:-50}));
    stage.insert(new Q.Buitre({x:4200,y:420,rangeX:200, rangeY:50}));
    stage.insert(new Q.Shooter({x:5300,y:500}));
    stage.insert(new Q.Buitre({x:6000,y:420,rangeX:200, rangeY:50}));
};

function eliminaEnemigos(){
  var ratas = Q("Rata"); //me devuelve todas las instancias de este tipo que hay en la escena
  var hormigas = Q("Hormiga");
  var abejas = Q("Abeja");
  var buitres = Q("Buitre");
  var shooters = Q("Shooter");

  //elimino todas estas instancias
  ratas.destroy();
  hormigas.destroy();
  abejas.destroy();
  buitres.destroy();
  shooters.destroy();
}

};