var bulletObj = function(){
    
    this.x = [];
    this.y = [];
    this.color = [];
    this.angle = [];
    this.bool = [];
    
}

bulletObj.prototype.num = 100;

bulletObj.prototype.radius = cellLength / 5;

bulletObj.prototype.speed = cellLength / 2;

bulletObj.prototype.init = function(){
    
    for(var i = 0 ; i < this.num ; i ++){
        
        this.x[i] = 0;
        this.y[i] = 0;
        this.color[i] = "#000";
        this.angle[i] = 0;
        this.bool[i] = false;
        
    }
    
}

bulletObj.prototype.draw = function(){
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if(this.bool[i]){
            
            this.x[i] = this.x[i] + this.speed * Math.cos(this.angle[i]);
            this.y[i] = this.y[i] + this.speed * Math.sin(this.angle[i]);
            
            ctx.save();
            ctx.fillStyle = this.color[i];
            ctx.beginPath();
            ctx.arc(this.x[i] + this.speed * Math.cos(this.angle[i]),this.y[i] + this.speed * Math.sin(this.angle[i]),this.radius,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
        }
        
    }
    
}

bulletObj.prototype.fire = function(x,y,color,angle){
    
    for(var i = 0 ; i < this.num ; i ++){
        
        if(!this.bool[i]){
            
            this.x[i] = x;
            this.y[i] = y;
            this.color[i] = color;
            this.angle[i] = angle;
            this.bool[i] = true;
            return;
            
        }
        
    }
    
}

bulletObj.prototype.dead = function(i){
    
    this.bool[i] = false;
    
}