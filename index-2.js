var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min,max){
    num = Math.floor(Math.random() * (max-min)) + min;
    return num;
}

function Ball (x, y, velX, velY, color, size, exists) { 
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true;
};

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function(){
    if ((this.x + this.size) >= width){
        this.velX = -(this.velX);
    }
    
    if ((this.x - this.size) <= 0){
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height){
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0){
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;

};

function EvilCircle(x, y){
    Ball.call(this, x, y, 20, 20, 'white', 20);
}

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 10;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
}

EvilCircle.prototype.boundary = function() {
    if ((this.x + this.size) >= width){
        this.x -= this.size;
    }
 
    if ((this.x - this.size) <= 0){
        this.x += this.size;
    }

    if ((this.y + this.size) >= height){
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0){
        this.y += this.size;
    }
};

EvilCircle.prototype.absorbs = function() {
   for (var i=0; i < balls.length; i++){
       if (balls[i].exists){
           var dx = this.x - balls[i].x;
           var dy = this.y - balls[i].y;
           var distance = Math.sqrt(dx * dx + dy * dy);

           if (distance < this.size + balls[i].size){
               balls[i].exists = false;
           }
       }
   }
}

var balls = [];
var EvilBall = new EvilCircle(random(0, width), random(0,height));

function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);
    
    while (balls.length < 25){
        var ball = new Ball(random(0, width), random(0, height), random(-7,7), random(-7,7), 'rgb('+random(0, 255)+','+random(0, 255)+','+random(0, 255)+')', random(10, 20));
        
        balls.push(ball);
    }

    for (var i=0; i < balls.length; i++){
        if (balls[i].exists){
            balls[i].draw();
            balls[i].update();
        }
    }


    EvilBall.draw();
    EvilBall.boundary();
    EvilBall.absorbs();

    requestAnimationFrame(loop);
};

loop();
