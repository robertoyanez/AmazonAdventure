Quintus.LoadAssetAnim = function(Q){

// load TMX, sheets compilations and animations - music_die.mp3, coin.mp3, music_level_complete.mp3 * 

  Q.loadTMX("mono.json, mono.png, bala.png, shooter.json, enemigo_pistola.png,hormiga.json, "+
    "rata.json, abeja.json, buitre.json, rock.png, enemigos.png, nivel_selva.tmx, player.png,"+
    " player.json, playerDown.png, playerDown.json, principal_intro.jpg, boton_jugar.png, boton_ayuda.png, boton_creditos.png,"+
    " boton_volver.png, boton_continuar.png, intro_instrucciones.jpg, musica_historia.mp3, "+
    "musica_fondo.mp3, inventario1.png, inventario1.json, aplastar.mp3, win.mp3, fail.mp3,daniar.mp3, disparo.mp3,crash.mp3, hit.mp3,"+
    " pisar.mp3, tecla.mp3, tirar.mp3, nivel_rio.tmx, water.json, roca1.png, roca2.png, agua.png,"+
     "arbol_dr.png, arbol_iz.png, plantas.png, rioDr.png, ship.png, boatPlayer.json, meta.png, tiles.png, ondas_aguas.mp3, persecucion.mp3", function() {
    
    //nivel 1
    Q.compileSheets("player.png","player.json");
    Q.compileSheets("playerDown.png","playerDown.json");
    Q.compileSheets("inventario1.png","inventario1.json");
    Q.compileSheets("enemigos.png","rata.json");
    Q.compileSheets("enemigos.png","hormiga.json");
    Q.compileSheets("enemigos.png","abeja.json");
    Q.compileSheets("enemigos.png","buitre.json");
    Q.compileSheets("enemigo_pistola.png","shooter.json");
    Q.compileSheets("mono.png","mono.json");

    //nivel 2
    Q.compileSheets("ship.png","boatPlayer.json");
    Q.compileSheets("agua.png","water.json");


    /***********************Animaciones nivel 1*************************/
    Q.animations("player", {
      walk_right: { frames: [10,9,8,7,6,5,4,3,2,1,0], rate: 0.15, flip: false, loop: false },
      walk_left: { frames:  [10,9,8,7,6,5,4,3,2,1,0], rate: 0.15, flip:"x", loop: false },
      jump_right: { frames: [29,28,27,26], rate: 0.5, loop: false},
      jump_left: { frames: [29,28,27,26], rate: 0.5, flip: "x", loop: false },
      stand_right: { frames:[0], rate: 1/10, loop: false},
      stand_left: { frames: [0], rate: 1/10, flip:"x", loop: false },
      down_right: {frames: [5,4,3,2,1,0], rate: 0.25, flip: false, loop: false},
      down_left: {frames: [5,4,3,2,1,0], rate: 0.25, flip: "x", loop: false},
      rockXL: {frames:[0], flip: false, loop: false},
      rockXL: {frames:[0], flip: "x", loop: false},
      lanzar: {frames:[3,4], rate:0.1, flip: false, loop: false},
      lanzar_left: {frames:[3,4], rate:0.1, flip:"x", loop: false}
    });


    Q.animations("playerDown", {
      down_right: {frames: [5,4,3,2,1,0], rate: 0.25, flip: false, loop: false},
      down_left: {frames: [5,4,3,2,1,0], rate: 0.25, flip: "x", loop: false}
    });

    var EnemyAnimations = {
      walk: { frames: [0,1,3], rate: 1, flip: false, loop: false },
      walk_left : { frames: [0,1,3], rate: 1, flip: "x", loop: false },
      dead: { frames: [5], rate: 1, flip: false, loop: false }
    };
  
    var EnemyAnimationsFly = {
        walk: { frames: [0,1,2], rate: 1, flip: false, loop: false },
        walk_left : { frames: [0,1,2], rate: 1, flip: "x", loop: false },
        dead: { frames: [3], rate: 1, flip: false, loop: false }
      };

      Q.animations("rata_anim", EnemyAnimations);
      Q.animations("hormiga_anim", EnemyAnimations);
      Q.animations("abeja_anim", EnemyAnimationsFly);
      Q.animations("buitre_anim", EnemyAnimationsFly);
      Q.animations("shooter_anim", EnemyAnimationsFly);
      
    Q.animations("mono_anim",{
      mono: { frames:[0,1,2,3,4,9,10], rate:1/3 , flip:"x" ,loop:false}
    });

    /***********************Animaciones nivel 2*************************/
    Q.animations("boatPlayer", {
			boat_right: { frames: [1,0], rate: 0.5, flip: false, loop: false },
			boat_left: { frames:  [0,1], rate: 0.5, flip:"x", loop: false },
			boat_die: { frames: [2], rate: 0.5, loop: false}
	});
	
	Q.animations("water_anim", {
          shine: { frames: [0,1,2], rate: 0.75, flip: false, loop: false }
    });

	
	Q.stageScene('mainTitle');
	
    }, {
    progressCallback: function(loaded,total) {
      var element = document.getElementById("loading_progress");
      element.style.width = Math.floor(loaded/total*100) + "%";
      if (loaded == total) {
        document.getElementById("loading").remove();
      }
    }
  });
}