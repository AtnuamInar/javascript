var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function Ball (x, y, velX, velY, color, size, life) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.life = true;
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

function Conqueror(x, y){
    Ball.call(this, x, y, 20, 20, 'white', 20);
}

Conqueror.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
}

Conqueror.prototype.limitframe = function() {
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

Conqueror.prototype.fight = function() {
   for (var i=0; i < balls.length; i++){
       if (balls[i].life){
           var dx = this.x - balls[i].x;
           var dy = this.y - balls[i].y;
           var distance = Math.sqrt(dx * dx + dy * dy);

           if (distance < this.size + balls[i].size){
               balls[i].life = false;
           }
       }
   }
}

var balls = [];
var ballConqueror = new Conqueror(random(0, width), random(0,height));

function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25){
        var ball = new Ball(random(0, width), random(0, height), random(-7,7), random(-7,7), 'rgb('+random(0, 255)+','+random(0, 255)+','+random(0, 255)+')', random(10, 20));

        balls.push(ball);
    }

    for (var i=0; i < balls.length; i++){
        if (balls[i].life){
            balls[i].draw();
            balls[i].update();
        }
    }


    ballConqueror.draw();
    ballConqueror.limitframe();
    ballConqueror.fight();

    requestAnimationFrame(loop);
};

loop();
