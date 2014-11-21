var horizonWidth;
var horizonHeight;
var bubbleScaleMin = 2;
var bubbleScaleMax = 12;
var numberOfBubbles = 250;
var maxXFloat = 300;
var minTweenTime = .5;
var maxTweenTime = 5;
var maxBubbleHangTime = .5;
var liquidSurfaceX = 0;
var initialized = false;

$(document).ready(function() {
	$(window).resize(function() {
	  	horizonWidth = window.innerWidth;
		horizonHeight = window.innerHeight;
	});
	this.onclick = init;
});

function init() {
	if(!initialized){
		initialized = true;
		horizonWidth = window.innerWidth;
		horizonHeight = window.innerHeight;
		startBubbles();
	}
}

function startBubbles() {
	for(var i=0; i < numberOfBubbles; i++) {
		var bubble = spawnBubble();
		setBubbleParams(bubble);
	}
}

function spawnBubble() {
	var bubble = document.createElement('div');
	bubble.className = 'particle blue';
	$(document.body).append(bubble);
	return bubble;
}

function setBubbleParams(bubble) {
	var bubbleAlpha = Math.random() * 1;
	var bubbleStartX = Math.random() * horizonWidth;
	var bubbleFinishX =  bubbleStartX + setBubbleXFloat();
	var bubbleScale = Math.round((Math.random() * (bubbleScaleMax - bubbleScaleMin)) + bubbleScaleMin);
	var bubbleTweenTime = (Math.random() * (maxTweenTime - minTweenTime)) + minTweenTime;
	styleBubble(bubble, bubbleAlpha, bubbleScale, bubbleStartX);
	tweenBubble(bubble, bubbleStartX, bubbleFinishX, bubbleTweenTime);
	setTimeout(resetBubble, setBubbleHangTime(bubbleTweenTime)*1000, bubble);
}

function setBubbleHangTime(bubbleTweenTime) {
	return bubbleTweenTime + Math.random()*maxBubbleHangTime;
}

function setBubbleXFloat() {
	var posNeg = Math.round(Math.random()*1);
	if(posNeg==0){
		posNeg = -1
	}
	var xFloat = (Math.round((Math.random() * maxXFloat)) * posNeg);
	return xFloat;
}

function styleBubble(bubble, bubbleAlpha, bubbleScale, bubbleStartX) {
	$(bubble).css({'border-radius': bubbleScale, 'height': bubbleScale, 'left': bubbleStartX, 'opacity': bubbleAlpha, 'width': bubbleScale, '-moz-border-radius': bubbleScale});
}

function tweenBubble(bubble, bubbleStartX, bubbleFinishX, bubbleTweenTime) {
	var tween = new Tween(bubble.style, 'top', Tween.regularEaseInOut, horizonHeight, liquidSurfaceX, bubbleTweenTime, 'px');
	tween.start();
	var tween = new Tween(bubble.style, 'left', Tween.regularEaseOut, bubbleStartX, bubbleFinishX, bubbleTweenTime, 'px');
	tween.start();
}

function resetBubble(bubble) {
	setBubbleParams(bubble)
}