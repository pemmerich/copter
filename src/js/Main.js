
var stage, holder, canvas, canvasMeasure, bg1, bg2, tick, replayBtn, clockText, clockTextBest, clock=0, numOb=0, character, characterBounds, characterText, characterOneBtn, characterTwoBtn, characterImg="images/character_one.png", pressing=false, first=true;
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
	console.log("init");
	var self=this;

	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);

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

	
	localStorage.setItem('copterBestScore',0);




	//create character btns
	characterOneBtn = new createjs.Bitmap("images/character_one.png");
	stage.addChild(characterOneBtn); 
	var scale = .7;

	characterOneBtn.scaleX = characterOneBtn.scaleY = scale;
	characterOneBtn.regX = characterOneBtn.regY = 0;
	
	characterOneBtn.x = 60;
	characterOneBtn.y = 50;
	characterOneBtn.setBounds(40,30,70,90);
	characterOneBtn.name="characterOneBtn";

	characterTwoBtn = new createjs.Bitmap("images/character_three.png");
	stage.addChild(characterTwoBtn); 
	var scale = .7;

	characterTwoBtn.scaleX = characterTwoBtn.scaleY = scale;
	characterTwoBtn.regX = characterTwoBtn.regY = 0;
	
	characterTwoBtn.x = 300;
	characterTwoBtn.y = 50;
	characterTwoBtn.setBounds(40,30,70,90);
	characterTwoBtn.name="characterTwoBtn";

	characterTwoBtn.on("click", chooseCharacter);
	characterOneBtn.on("click", chooseCharacter);






	tick = createjs.Ticker;
	tick.framerate = 30;
	tick.timingMode = createjs.Ticker.RAF_SYNCHED;
	tick.paused=true;
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

	clockTextBest = new createjs.Text("", "20px Arial", "#fff");
	clockTextBest.textBaseline = "top";
	clockTextBest.textAlign = "right";
	clockTextBest.x=558;
	clockTextBest.y=25;
	stage.addChild(clockTextBest);

	characterText = new createjs.Text("Choose Your Hero", "20px Arial", "#fff");
	characterText.textBaseline = "top";
	characterText.textAlign = "left";
	characterText.x=220;
	characterText.y=5;
	stage.addChild(characterText);

	//gameOver();
}

function onTick(event)
{
	//console.log("Paused:", event.paused, event.time);
	if(!event.paused){
		clock++;
		clockText.text="Score: "+clock;
		bg1.x -=8;
		bg2.x-=8;
		if(bg1.x<-bg1.imgWidth){
			bg1.x=bg2.x+bg2.imgWidth;
		}
		if(bg2.x<-bg2.imgWidth){
			bg2.x=bg1.x+bg1.imgWidth;
		}
		
		var rand = Math.floor((Math.random() * 25) + 1);
		if(rand > 23){
			fireObstacle();
		}
		if(pressing){
			character.y-=6;
		}else{
			character.y+=8;
		}
		if(character.y>bg1.imgHeight){
			gameOver();
		}
	}

}

function chooseCharacter(event)
{

	if(event.target.name=="characterOneBtn"){
		characterImg="images/character_one.png"
	}else{
		characterImg="images/character_three.png"
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
	character.setBounds(40,30,70,90);
	characterBounds = character.getBounds();

	reset();
}

function gameOver()
{
	console.log("GAME OVER! clock = "+clock);
	tick.paused=true;
	character.visible=false;
	
	replayBtn.visible=true;
	replayBtn.text.text="Play Again?";

	var best = localStorage.getItem('copterBestScore');
	console.log("best = "+best);
	if(clock > best){
		best = clock;
		localStorage.setItem('copterBestScore',clock);
	}
	clockTextBest.text="Best: "+best;
	
	first = false;
}

function fireObstacle()
{
	//console.log("fire obstacle");
	var rand = Math.floor((Math.random() * 50) + 10);
	var ob = new Obstacle("images/fireball.png");
	stage.addChild(ob);
	ob.name="ob_"+numOb;
	ob.x = bg1.imgWidth-ob.imgWidth;
	var rand = Math.floor((Math.random() * 10) + 1);
	if(rand>5){
		ob.y = Math.floor((Math.random() * 90) + 1);
	}else{
		ob.y = Math.floor((Math.random() * bg1.imgHeight) + 220);
	}
	//console.log("fireball y = "+ob.y+" rand = "+rand);
	//ob.onTick();
	ob.on("tick", ob.onTick);
	numOb++;
}

function reset(event)
{
	var best = localStorage.getItem('copterBestScore');
	clockTextBest.text = "Best: "+best;
	clock=0;
	character.y = 50;
	character.visible=true;
	tick.paused=false;
	replayBtn.visible=false;
	characterText.visible=false;
	characterTwoBtn.visible=false;
	characterOneBtn.visible=false;
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

