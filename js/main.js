
var wrapper,canvas,ctx;//变量--html结构

var canWidth,canHeight,cellLength,canAlpha;//变量--画布宽高，地图单元格大小

var deltaTime,lateTime,loop;//变量--两次绘制的时间差，动画名

var block;//变量--blockObj类的对象实例

var hero;//变量--heroObj类的对象实例

var target;//变量--targetObj类的对象实例

var defender;//变量--defenderObj类的对象实例

var bullet;//变量--bulletObj池的对象实例

var map = [];//变量--二维数组记录虚拟地图

var Level;//变量--设定关卡难度

var GAME,Score;//变量--游戏是否失败，记录分数

wrapper = document.getElementById("wrapper");//各变量初始化
canWidth = wrapper.clientWidth;
canHeight = wrapper.clientHeight;
canAlpha = 0;

canvas = document.createElement("canvas");
canvas.width = canWidth;
canvas.height = canHeight;
wrapper.appendChild(canvas);

ctx = canvas.getContext("2d");

cellLength = 20;
    
Level = 0;

GAME = true;

Score = 0;

function init(){//画布初始化函数
    
    lateTime = Date.now();
    deltaTime = 0;
    
    block = new blockObj();
    block.init();
    block.buildMap();
    
    hero = new heroObj();
    hero.init();
    
    target = new targetObj();
    target.init();
    
    defender = new defenderObj();
    defender.init();
    defender.buildMap();
    
    bullet = new bulletObj();
    bullet.init();
    
    canvas.addEventListener("click",moveTo);
    
}

function gameLoop(){//画布循环绘制函数
    
    deltaTime = Date.now() - lateTime;
    lateTime = Date.now();
    
    ctx.clearRect(0,0,canWidth,canHeight);
    
    block.draw();
    
    hero.draw();
    
    target.draw();
    
    defender.draw();
    
    bullet.draw();
    
    collision();
    
    if(!GAME){
        
        canvas.removeEventListener("click",moveTo);
        gameOver();
        
    }
    
    loop = requestAnimationFrame(gameLoop);
    
}

function game(){//调用函数
    
    canvas.removeEventListener("click",game);
    init();
    gameLoop();
    
}

function reset(){//重置函数
    
    Score += 1000;
    cancelAnimationFrame(loop);
    Level = Level > 20 ? Level : Level + 1;
    game();
    
}

function beginGame(){//开始游戏函数
    
    ctx.save();
    
	ctx.textAlign = "center";
	ctx.font = "24px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("王牌特工",canWidth * 0.5,canHeight * 0.2);
    
    ctx.font = "18px Arial";
    ctx.fillText("扮演特工",canWidth * 0.5,canHeight * 0.4);
    ctx.fillText("杀死守卫",canWidth * 0.5,canHeight * 0.5);
    ctx.fillText("解救人质",canWidth * 0.5,canHeight * 0.6);
    ctx.font = "20px Arial";
    ctx.fillText("点击开始",canWidth * 0.5,canHeight * 0.9);
    
    ctx.fillStyle = "#44B811";
    ctx.beginPath();
    ctx.arc(canWidth * 0.3,canHeight * 0.4 - 4,10,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#F05F48";
    ctx.beginPath();
    ctx.arc(canWidth * 0.3,canHeight * 0.5 - 4,10,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#F4AF29";
    ctx.beginPath();
    ctx.arc(canWidth * 0.3,canHeight * 0.6 - 4,10,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();
    
	ctx.restore();
    
    canvas.addEventListener("click",game);
    
}

function gameOver(){//游戏结束函数
    
    canAlpha += 0.01;
    
	if(canAlpha > 1){
        
		canAlpha=1;
        
	}
    
	ctx.save();
	ctx.textAlign = "center";
	ctx.font = "25px Arial";
	ctx.shadowBlur=20;
	ctx.shadowColor="white";
	ctx.fillStyle="rgba(0,0,0,"+canAlpha+")";
	ctx.fillText("GAME OVER",canWidth * 0.5,canHeight * 0.5 - 25);
    ctx.fillText("得分："+Score,canWidth * 0.5,canHeight * 0.5 + 25);
	ctx.restore();
    
}

window.onload = beginGame;