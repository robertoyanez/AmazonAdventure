Quintus.Goal = function(Q){
  Q.Sprite.extend("Meta",{
    init: function(p) {
      this._super(p,{
        asset: "meta.png",
        sensor: true,
        gravity: 0,
        x: 370,
        y: 0, 
        type: Q.SPRITE_META,
        collisionMask: Q.SPRITE_NONE
      });
      this.add("2d, animation, tween");
      this.on("sensor");
    },
    
    sensor: function(colObj) {
      colObj.win();
    }
  });
}