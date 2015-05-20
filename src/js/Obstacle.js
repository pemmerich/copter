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
p.imgWidth = 10;
p.imgHeight = 10;
p.row;
p.column;
p.startX;
p.endX;
p.offset;
p.originalX;
p.self;
p.tick;

p.Container_initialize = p.initialize;
p.initialize = function(img) 
{
	console.log("init OB img = "+img);
	this.Container_initialize();
	
	
	this.background = new createjs.Bitmap(img);
	
	this.addChild(this.background); 
	//set size of image
	
	
	var scale = .5;

	this.background.scaleX = this.background.scaleY = scale;
	this.background.regX = this.background.regY = 0;
	
	
	//must explicitly set bounds
	this.setBounds(0,0,this.imgWidth,this.imgHeight);
	
	//this.on("click", this.handleClick);
	
	this.on("mousedown", this.handleMouseDown);
	this.on("pressup", this.handlePressUp);
	this.on("pressmove", this.handlePressMove);

	this.onTick();

	
	this.mouseChildren = false;

	
	this.tick = setInterval(function(){
		this.onTick();
	},100);
	
	
	
} 

p.onTick = function(event)
{

	console.log("tick "+this);
	this.x -= 10;
}

p.handleClick = function (event) 
{    
	
} 

p.handleMouseDown = function (event)
{
	
}

p.handlePressMove = function (event) 
{    
	//console.log("press move "+event.stageX);
	
	
}

p.handlePressUp = function (event) 
{    
	
}



p.updateBG = function(type)
{
	

}

window.Obstacle = Obstacle;
}());