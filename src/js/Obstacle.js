(function() {

var Obstacle = function(img) {
  this.initialize(img);
}
var p = Obstacle.prototype = new createjs.Container(); // inherit from Container
p.background;
p.count = 0;
p.namex = "yes";
p.type;
p.radius = 15;
p.imgWidth = 44;
p.imgHeight = 43;
p.row;
p.column;
p.startX;
p.endX;
p.offset;
p.originalX;
p.self;
p.tick;
p.bounds;

p.Container_initialize = p.initialize;
p.initialize = function(img) 
{
	
	this.Container_initialize();
	
	
	this.background = new createjs.Bitmap(img);
	
	this.addChild(this.background); 
	//set size of image
	
	
	var scale = .5;

	this.background.scaleX = this.background.scaleY = scale;
	this.background.regX = this.background.regY = 0;
	
	
	//must explicitly set bounds
	this.setBounds(5,5,this.imgWidth-10,this.imgHeight-10);
	this.bounds = this.getBounds();
	//this.on("click", this.handleClick);
	
	

	//this.onTick();
	//this.onTick();

	this.mouseChildren = false;

	
	
} 

p.onTick = function(event)
{
	/*
	console.log(this.name+" x = "+this.x+" character x = "+character.x);
	console.log(this.name+" y = "+this.y+" character y = "+character.y);
	console.log(this.name+" width = "+this.bounds.width+" character width = "+characterBounds.width);
	console.log(this.name+" height = "+this.bounds.height+" character height = "+characterBounds.height);
	*/
	this.x -= 8;
	//console.log(this.name+" tick after "+this.x);
	if(this.x<=-this.imgWidth){
		stage.removeChild(this);
	}

    if ( this.x >= character.x + characterBounds.width || this.x + this.bounds.width <= character.x || this.y >= character.y + characterBounds.height || this.y + this.bounds.height <= character.y ){
    	
    }else{
    	console.log("COLLISION!");
    	stage.removeChild(this);
    	gameOver();
    }

}

p.handleClick = function (event) 
{    
	
} 





p.updateBG = function(type)
{
	

}

window.Obstacle = Obstacle;
}());