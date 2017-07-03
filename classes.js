/*
* 玩家类
* 全部提供数据的生成
* */
function Player(x, y) {
    this.x = x || 0;
    this.y = y || 625;
    this.width = 30;
    this.height=  80;
    this.speed = 15;
    this.accelerate = 0;
    this.isEnd = false;
    this.jumping = false;
    this.status = null;
    this.dir = null;
}

Player.prototype.jump = function (speed) {
    this.accelerate = speed;
    this.jumping = true;
};

Player.prototype.move = function(dir, speed) {
    if(dir == 'left')
        this.x -= speed;
    else
        this.x += speed;
};

Player.prototype.isOver = function () {
    if(this.y >= 625)
        this.isEnd = true;
    return this.isEnd;
};

Player.prototype.downing = function () {
    if(this.jumping) {
        --this.accelerate;
        this.y -= this.accelerate;
    }
};

Player.prototype.canLand = function(x, y, width) {
    if(!this.jumping) return;
    if(this.x >= x && this.x <= x + width) {
        if(this.y + this.height >= y) {
            this.y = y - this.height;
            this.jumping = false;
            this.accelerate = 0;
        }
    }
};

//障碍类
function Obstacle(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Obstacle.prototype.move = function(speed, dir) {
    if(dir == 'left')
        this.x = (this.x + speed) % 1339;
    else
        this.x = (this.x - speed + 1339) % 1339;
};
