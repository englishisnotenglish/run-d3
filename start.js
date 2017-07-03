var canvas = d3.select("canvas").node(),
    ctx = canvas.getContext("2d");

var obstacles = [];
var player = new Player(25, 500);

function initObstacles() {
    var start = 0;
    while(start < 1400) {
        obstacles.push(new Obstacle(start, 625 - parseInt(Math.random() * 50)));
        start += 200;
    }
}

function drawObstacle(x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y);
    ctx.lineTo(x + 50, 625);
    ctx.lineTo(x, 625);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.closePath();
}

function drawObstacles() {
    for(var i = 0, len = obstacles.length; i < len; i++) {
        drawObstacle(obstacles[i].x, obstacles[i].y);

    }
}

function drawPlayer() {
    var x = player.x,
        y = player.y;
    //使用arc方法，创建火柴人的头部。一个空心的，边框为红色的圆形。

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI*2, true);
    ctx.fill();

    //绘制火柴人的嘴巴
    ctx.strokeStyle='#FF4040';
    ctx.arc(x, y, 10, 0, Math.PI, false);

    //绘制火柴人的眼睛
    ctx.fillStyle='black';
    ctx.arc(x - 10, y - 5, 3, 0, Math.PI*2, true);
    ctx.moveTo(x + 15, y - 5);
    ctx.arc(x + 10, y - 5, 3, 0, Math.PI*2, true);

    ctx.moveTo(x, y + 15);
    ctx.lineTo(x, y + 40);
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x - 25, y + 80);//左腿
    ctx.moveTo(x, y + 40);
    ctx.lineTo(x + 25, y + 80);//右腿
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x - 12, y + 45);//左胳膊
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 12, y + 45);//右胳膊
    ctx.fill();
    ctx.stroke();

}

document.onkeydown = function(e) {
    switch(e.code) {
        case 'ArrowUp' :
            player.status = 'jumping';
            player.jump(player.speed);
            break;
        case 'ArrowLeft' :
            player.dir = 'left';
            player.status = 'moving';
            player.move('left', player.speed);
            break;
        case 'ArrowRight' :
            player.dir = 'right';
            player.status = 'moving';
            player.move('right', player.speed);
            break;
        default:
            break;
    }
};

function start() {
    initObstacles();
    drawObstacles();
    drawPlayer();
}

function paint() {
    ctx.clearRect(0, 0, 1338, 625);

    if(!player.isOver()) {
        if(player.status == 'moving') {
            for(var j = 0, length = obstacles.length; j < length; j++) {
                obstacles[j].move(player.speed, player.dir);
            }
        }
        drawObstacles();
        drawPlayer();
        player.downing();
        switch (player.status) {
            case 'jumping':
                for(var i = 0, len = obstacles.length; i < len; i++) {
                    player.canLand(obstacles[i].x, obstacles[i].y, 50);
                }
                break;
            case 'moving':
                player.status = 'jumping';
                //for(var j = 0, length = obstacles.length; j < length; j++) {
                //    player.isFallingOut(obstacles[j].x, obstacles[j].y, 50);
                //
                //    player.jumping = true;
                //    if(player.isFallout == false) {
                //        //player.jumping = false;
                //        break;
                //    }else {
                //
                //    }
                //}
                break;
            default:
                return;
        }
    }else
        timer.stop();
}

start();
var timer = d3.timer(paint, 20);
