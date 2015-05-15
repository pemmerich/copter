
var stage, holder, canvas, canvasMeasure, bg1, bg2, tick;
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

	console.log("Viewport Width = "+viewportWidth);
	console.log("Viewport Height = "+viewportHeight);
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

	tick = createjs.Ticker;
	tick.interval = 1;
	tick.on("tick", onTick);
	//constantly redraw the stage
	createjs.Ticker.on("tick", stage);
}

function onTick(event)
{
	//console.log("Paused:", event.paused, event.time);
	bg1.x -=2;
	bg2.x-=2;
	if(bg1.x<-bg1.imgWidth){
		bg1.x=bg1.imgWidth;
		bg2.x=0;
	}
	if(bg2.x<-bg2.imgWidth){
		bg2.x=bg2.imgWidth;
		bg1.x=0;
	}


}


function adjustLayout()
{
	


}