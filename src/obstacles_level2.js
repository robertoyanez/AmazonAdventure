/***********************OBSTACULOS****************************/
Quintus.Obstacle = function(Q){
  Q.Sprite.extend("defaultEnemy", {
    init: function(p,defaults) {
      this._super(p,Q._defaults(defaults||{},{ 
        gravity: 0,
        vy : 0,
        points: [ [ -16, 10], [ -23, 10 ], [-23,-10], [23,-10], [23, 10 ], [ 16, 10 ]],
        vx : 0
      }));
      this.add("2d, aiBounce, animation");
    }
  });

  Q.defaultEnemy.extend("Rock1", {
    init: function(p) {
      this._super(p,{
        scale : 1.5,
        asset : "roca1.png"
      });
    }
  });

  Q.defaultEnemy.extend("Plantas", {
    init: function(p) {
      this._super(p,{
        asset : "plantas.png",
      });
    }
  });

  Q.defaultEnemy.extend("Rock2", {
    init: function(p) {
      this._super(p,{
        asset : "roca2.png",
      });
    }
  });


  Q.defaultEnemy.extend("Arbol_dr", {
    init: function(p) {
      this._super(p,{
        scale : 0.7,
        points: [ [ -16, 20], [ -23, 20 ], [-23,-10], [23,-10], [23, 20 ], [ 16, 20 ]],
        asset : "arbol_dr.png",
      });
    },
  });

  Q.defaultEnemy.extend("Arbol_iz", {
    init: function(p) {
      this._super(p,{
        scale : 0.7,
        points: [ [ -16, 20], [ -23, 20 ], [-23,-10], [23,-10], [23, 20 ], [ 16, 20 ]],
        asset : "arbol_iz.png",
      });
    }
  });


  Q.Sprite.extend("Water", {
    init: function(p) {
      this._super(p,{
        sprite: "water_anim",
        sheet: "coin",
        scale : 0.8,
        sensor: true,
        type: Q.SPRITE_WATER,
        collisionMask: Q.SPRITE_NONE
      });
      this.add("animation");
      this.on("sensor");
    },
    
    sensor: function(colObj) {
    },
 
    step: function(dt){
      this.play('shine');
    }
  }); 
  
}