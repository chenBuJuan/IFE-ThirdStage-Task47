var defenderObj = function(){//defenderObj类声明
    
    this.x = [];
    this.y = [];
    this.field = [];
    this.bool = [];
    this.num = Math.round(Level / 4);
    
}

defenderObj.prototype.radius = cellLength/2;//守卫者半径

defenderObj.prototype.init = function(){//成员函数--初始化
    
    var i = 0;
    
    while(1){
        
        var x = Math.floor( Math.random() * Math.floor(canWidth/cellLength) )* cellLength + cellLength/2;
        var y = Math.floor( Math.random() * Math.floor(canHeight/cellLength) )* cellLength + cellLength/2;
        var field = Math.round(Math.random()*2 + 2)* cellLength;
        
        var result = true;
        
        for(var j = 0 ; j < i ; j ++){
            
            if(map[(y - cellLength/2)/cellLength][(x - cellLength/2)/cellLength] == "#" &&
            x != hero.x && y != hero.y && x != target.x && y != target.y &&
            Math.abs(this.x[j] - x) <= field + this.field[j] &&
            Math.abs(this.y[j] - y) <= field + this.field[j]){
                
                result = false;
                
            }
            
        }
        
        if(result){
            
            this.x[i] = x;
            this.y[i] = y;
            this.field[i] = field;
            this.bool[i] = true;
            i ++;
            
        }
        
        if(i >= this.num){
            
            break;
            
        }
        
    }
    
}

defenderObj.prototype.draw = function(){//成员函数--绘制
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if(this.bool[i]){
            
            ctx.save();
            ctx.fillStyle = "#F05F48";
            ctx.strokeStyle = "#F05F48";
            ctx.beginPath();
            ctx.arc(this.x[i],this.y[i],this.radius,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x[i],this.y[i],this.field[i],0,Math.PI*2);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
            
        }
        
    }
    
}

defenderObj.prototype.buildMap = function(){//成员函数--修改虚拟地图
    
    for(var i = 0 ; i < this.num ; i ++){
        
        var x = (this.x[i] - cellLength/2)/cellLength;
        var y = (this.y[i] - cellLength/2)/cellLength;
        
        map[y][x] = "!";
        
    }
    
}

defenderObj.prototype.dead = function(i){//成员函数--对象销毁
    
    var xIndex = (this.x[i] - cellLength/2)/cellLength;
    var yIndex = (this.y[i] - cellLength/2)/cellLength;
    
    this.bool[i] = false;
    map[yIndex][xIndex] = "#";
    
}