var v = 100;
var yourscore=0;
var score = document.getElementById("yourscore");
var bestscore = 0;
var bscore = document.getElementById("bestscore");
var allEnemies=[];
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = v;
    this.width = 50;
    this.heigth = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
///////////////////////////////////////////////
/* This function from another Github project*/
//////////////////////////////////////////////
var createEnemies = function() {
    var xs = [80, 20, 200, 60, 150, 100];
    var ys = [50, 55, 140, 145, 220, 222];
    var enemy1 = new Enemy(xs[Math.floor((Math.random() * 4))], ys[Math.floor((Math.random() * 5))]);
    var enemy2 = new Enemy(xs[Math.floor((Math.random() * 4))], ys[Math.floor((Math.random() * 5))]);
    var enemy3 = new Enemy(xs[Math.floor((Math.random() * 4))], ys[Math.floor((Math.random() * 5))]);
    allEnemies = [enemy1, enemy2, enemy3];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 0;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < -10) {
        this.y = -10;
    } else if (this.y > 400) {
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.x -= 100;
    } else

    if (direction == 'right') {
        this.x += 100;
    } else

    if (direction == 'up') {
        this.y -= 100;
    } else

    if (direction == 'down') {
        this.y += 100;
    }
    this.win();
    this.checkCollisions();
};

Player.prototype.reset = function() {
    this.x = 0;
    this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
createEnemies();
/* Reset*/
var reset = function() {
    alert("Game Over!");
    yourscore=0;
    allEnemies.forEach(function(enemy) {
        enemy.speed = 100;
    });
    v = 100;
};

var bestScore = function() {
    if (yourscore > bestscore) {
        bscore.innerHTML = yourscore;
        bestscore = yourscore;
    }
};

Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 65 &&
            this.x + 55 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 40 &&
            this.y + 60 > allEnemies[i].y) {
            reset();
            this.reset();
        }
    }
};

Player.prototype.win = function() {
  if (this.x < 505 &&
        this.x > 0 && this.y < 100 &&   this.y > 0) {
        alert("you win");
        score.innerHTML=++yourscore;
        bestScore();
        allEnemies.forEach(function(enemy) {
            enemy.speed = v + 20;
            createEnemies();
        });
        v += 20;
        this.reset();
    }
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
