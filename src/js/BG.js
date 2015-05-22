(function() {

var BG = function(img) {
  this.initialize(img);
}
var p = BG.prototype = new createjs.Container(); // inherit from Container
p.background;
p.count = 0;

p.type;
p.radius = 15;
p.imgWidth = 568;
p.imgHeight = 320;
p.row;
p.column;
p.startX;
p.endX;
p.offset;
p.originalX;

p.Container_initialize = p.initialize;
p.initialize = function(img) 
{
	//console.log("init BG types = "+types);
	this.Container_initialize();
	
	
	
	this.background = new createjs.Bitmap(img);
	
	this.addChild(this.background); 
	//set size of image
	
	
	//var scale = .5;

	//this.background.scaleX = this.background.scaleY = scale;
	this.background.regX = this.background.regY = 0;
	
	
	//must explicitly set bounds
	this.setBounds(0,0,this.imgWidth,this.imgHeight);
	
	//this.on("click", this.handleClick);
	
	this.on("mousedown", this.handleMouseDown);
	this.on("pressup", this.handlePressUp);
	this.on("pressmove", this.handlePressMove);

	
	this.mouseChildren = false;
	
} 

p.handleClick = function (event) 
{    
	var target = event.target;
	
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

window.BG = BG;
}());