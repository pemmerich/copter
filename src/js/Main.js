
var stage, holder, canvas, canvasMeasure, bg1, bg2, tick, replayBtn, clockText, clock=0, numOb=0, character, characterBounds, characterImg="images/character_one.png", pressing=false;
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));


$(document).ready
(
    function()
    {
    	init();

    }
);


$(window).resize(function() {
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	
	adjustLayout();

	//console.log("Viewport Width = "+viewportWidth);
	//console.log("Viewport Height = "+viewportHeight);
	//update survey container size
	//survey.sizeContent();

});


function init()
{
	var self=this;

	stage = new createjs.Stage("copterCanvas");
	createjs.Touch.enable(stage);
	bgArray=[];
	for (var n=0; n<2; n++){
		var bg;
		if(n==0){
			bg = new BG("images/bg1.jpg");
		}else{
			bg = new BG("images/bg2.jpg");
		}
		bg.name = "bg_"+n;
		stage.addChild(bg);

		bg.x = n*bg.imgWidth;
		bg.y = 0; 
		bgArray.push(bg);
		if(n==0){
			bg1=bg;
		}else{
			bg2=bg;
		}
	}

	//create character
	character = new createjs.Bitmap(characterImg);
	stage.addChild(character); 
	var scale = .4;

	character.scaleX = character.scaleY = scale;
	character.regX = character.regY = 0;
	
	character.x = 200;
	character.y = 50;

	//must explicitly set bounds
	character.setBounds(40,30,70,80);
	characterBounds = character.getBounds();


	tick = createjs.Ticker;
	tick.framerate = 30;
	tick.timingMode = createjs.Ticker.RAF_SYNCHED;
	tick.on("tick", onTick);
	//constantly redraw the stage
	tick.on("tick", stage);
	//console.log("timing mode = "+tick.timingMode);
	stage.on("mousedown", handleMouseDown);
	stage.on("pressup", handlePressUp);

	replayBtn = stage.addChild(new Button("Play Again", "#0099cc","20px Arial"));
	replayBtn.x = 568/2-60;
	replayBtn.y = 320/2-50;
	replayBtn.on("click", reset);
	replayBtn.visible=false;
	
	clockText = new createjs.Text("", "20px Arial", "#fff");
	clockText.textBaseline = "top";
	clockText.textAlign = "right";
	clockText.x=558;
	clockText.y=5;
	stage.addChild(clockText);
}

function onTick(event)
{
	//console.log("Paused:", event.paused, event.time);
	if(!event.paused){
		clock++;
		clockText.text=clock;
		bg1.x -=4;
		bg2.x-=4;
		if(bg1.x<-bg1.imgWidth){
			bg1.x=bg2.x+bg2.imgWidth;
		}
		if(bg2.x<-bg2.imgWidth){
			bg2.x=bg1.x+bg1.imgWidth;
		}
		
		var rand = Math.floor((Math.random() * 60) + 1);
		if(rand == 41){
			fireObstacle();
		}
		if(pressing){
			character.y-=2;
		}else{
			character.y+=4;
		}
		if(character.y>bg1.imgHeight){
			gameOver();
		}
	}

}

function gameOver()
{
	console.log("GAME OVER!");
	tick.paused=true;
	character.visible=false;
	replayBtn.visible=true;
}

function fireObstacle()
{
	//console.log("fire obstacle");
	var rand = Math.floor((Math.random() * 50) + 10);
	var ob = new Obstacle("images/fireball.png");
	stage.addChild(ob);
	ob.name="ob_"+numOb;
	ob.x = bg1.imgWidth-ob.imgWidth;
	ob.y = Math.floor((Math.random() * bg1.imgHeight) + 1);
	//ob.onTick();
	ob.on("tick", ob.onTick);
	numOb++;
}

function reset()
{
	clock=0;
	character.y = 50;
	character.visible=true;
	tick.paused=false;
	replayBtn.visible=false;

}

function adjustLayout()
{
	


}

function handleMouseDown(event)
{
	//console.log("mouse down is touch = "+event.isTouch);
	pressing=true;
}

function handlePressUp(event)
{    
	//console.log("mouse up is touch = "+event.isTouch);
	pressing=false;
}

