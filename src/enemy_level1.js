/***********************ENEMIGOS****************************/

Quintus.Enemy = function(Q){

/****************************DEFAULT LAND ENEMY******************************/

Q.Sprite.extend("defaultLandEnemy", {
    init: function(p,defaults) {

      this._super(p,Q._defaults(defaults||{},{
        vx: 50,
      }));

      this.add("2d, aiBounce, animation");
      this.on("bump.top,bump.bottom,bump.left,bump.right",this,"die");
    },

    step: function(dt) {
      if(this.p.dead) {
        this.del('2d, aiBounce');
        this.p.deadTimer++;
        if (this.p.deadTimer > 24) {
          this.destroy();
        }
        return;
      }
     if(this.p.vx<0)
        this.play('walk');
     else
        this.play('walk_left');
    },

    die: function(col) {
      if(col.obj.isA("Player") || col.obj.isA("Rock")) {
        Q.audio.play("aplastar.mp3");
        this.p.vx=this.p.vy=0;
        this.play('dead');
        this.p.dead = true;
        var that = this;
        col.obj.p.vy = -300;
        this.p.deadTimer = 0;
      }
    }
  });

  Q.defaultLandEnemy.extend("Rata", {
    init: function(p) {
      this._super(p,{
        sheet : "rata",
        sprite : "rata_anim",
      });
    }
  });
  
  Q.defaultLandEnemy.extend("Hormiga", {
    init: function(p) {
      this._super(p,{
        sheet : "hormiga",
        sprite : "hormiga_anim",
      });
    }
  });
  

  /****************************DEFAULT FLY ENEMY******************************/
  
    Q.Sprite.extend("defaultFlyEnemy", {
    init: function(p,defaults) {

      this._super(p,Q._defaults(defaults||{},{ 
        gravity: 0,
        vx: 60,
        vy: 30,
      }));
      this.p.initialX = this.p.x;
      this.p.initialY = this.p.y;
      this.add("2d, aiBounce, animation");
      this.on("bump.top,bump.bottom,bump.left,bump.right",this,"die");
    },

    step: function(dt) {
      if(this.p.dead) {
        this.del('2d, aiBounce');
        this.p.deadTimer++;
        if (this.p.deadTimer > 24) {
          this.destroy();
        }
        return;
      }
     
    if(this.p.x - this.p.initialX >= this.p.rangeX && this.p.vx > 0) {
      this.p.vx = -this.p.vx;
    }  
    else if(-this.p.x + this.p.initialX >= this.p.rangeX && this.p.vx < 0) {
      this.p.vx = -this.p.vx;
    }
    
    if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
      this.p.vy = -this.p.vy;
    }  
    else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
      this.p.vy = -this.p.vy;
    } 
    
      if(this.p.vx<0 )
        this.play('walk');
      else
        this.play('walk_left');
    },

    die: function(col) {
      if(col.obj.isA("Rock") ) {
        Q.audio.play("aplastar.mp3");
        this.p.vx=this.p.vy=0;
        this.play('dead');
        this.p.dead = true;
        var that = this;
        col.obj.p.vy = -300;
        this.p.deadTimer = 0;
      }
    }
  });

  Q.defaultFlyEnemy.extend("Abeja", {
    init: function(p) {
      this._super(p,{
        sheet : "abeja",
        sprite : "abeja_anim",
      });
    }
  });

  Q.defaultFlyEnemy.extend("Buitre", {
    init: function(p) {
      this._super(p,{
        sheet : "buitre",
        sprite : "buitre_anim",
      });
    }
  });
  
  /*****************************SHOOTER*********************************
  	Este enemigo es de tierra pero es especial actua de forma diferente*/
  Q.Sprite.extend("Balas", {
    init: function(p){
      this._super(p, {
        asset: "bala.png", 
        gravity: 0, 
        scale: 0.7,
        angle: 0
      });

      this.add('2d, animation');
    
      this.on("bump.left, bump.right, bump.bottom", function(collision) {
        if(collision.obj.isA("Player")) {
          this.destroy();
          collision.obj.setDead();
        }
        else{
          this.destroy();
        }
      });

      this.on("bump.top", function(collision){
        if(collision.obj.isA("Player") || collision.obj.isA("Rock") ) {
          this.destroy();
        }
      });
    },
  });

  
  
  Q.defaultLandEnemy.extend("Shooter", {
    init: function(p){
      this._super(p, {
        sheet: "shooter",  // Determino la imagen del sprite
        sprite: "shooter_anim", //Determino la animacion
        vx: 0,         
      });

      this.add('2d, animation, tween');
      this.intervalo = 0;

      this.salto = 0;
    },

    step: function(dt){
      this.p.xv = 0;
      if(this.p.dead) {
        this.del('2d, aiBounce');
        this.p.deadTimer++;
        if (this.p.deadTimer > 24) {
          this.destroy();
        }
        return;
      }

      if(this.salto >= 450){
        this.p.vy = -350; 
        this.salto = 0;
      }
      else{
        this.salto += 10;
      };


      if (posXPlayer < this.p.x){
        this.play("walk_left");
      }
      else{
        this.play("walk");
      }


      if((this.intervalo >= 400)){
        if (posXPlayer <= this.p.x && this.p.x - posXPlayer < 450){
          this.play("walk_left");
          if(Math.random() > 0.9){
            this.createBala(50, -250);
          }
        }
        else if (posXPlayer > this.p.x && posXPlayer - this.p.x < 450){
          this.play("walk");
          if(Math.random() > 0.9){
            this.createBala(50, 250);
          }
        }
    
    
    
        if(this.intervalo >= 444){
          this.intervalo = 0;
        }
        this.intervalo += 10;
      }

      else{
        this.intervalo += 10;
        if (posXPlayer < this.p.x && this.p.x - posXPlayer < 350){
          this.play("walk_left");
        }
        else if (posXPlayer > this.p.x && posXPlayer - this.p.x < 350){
          this.play("walk");
        }
      }
    },

    //funcion para crear una bala
    createBala: function(resto, vel){
      Q.audio.play("disparo.mp3");
      this.stage.insert(new Q.Balas({ x: this.p.x-resto, y: this.p.y+10, vx: vel }));
    },

    die: function(col) {
      if(col.obj.isA("Player") || col.obj.isA("Rock") ) {
        Q.audio.play("aplastar.mp3");
        this.p.vx=this.p.vy=0;
        this.play('dead');
        this.p.dead = true;
        var that = this;
        col.obj.p.vy = -300;
        this.p.deadTimer = 0;
      }
    }
    
  });
/***********************END SHOOTER****************************/


};