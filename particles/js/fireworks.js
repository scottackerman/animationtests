var mouseX;
var mouseY;
var eventHorizon;
var horizonWidth;
var horizonHeight;
var particleId = 0;
var particleScaleMin = 1;
var particleScaleMax = 3;
var numberOfParticles = 200;
var fireworksSpread = 150;
var implosionTimeStagger = 5;
var minTweenTime = .2;
var maxTweenTime = .3;
var maxXFloat = 300;
var imploded = true;
var readyForClick = true;
var colorArray = new Array('green', 'purple', 'brown', 'blue');

$(document).ready(function() {
	init();
	this.onclick = clickEvent;
});

function clickEvent(evt) {
	mouseX = evt.pageX;
	mouseY = evt.pageY;
	if(imploded && readyForClick){
		explode();
	}else if(!imploded && readyForClick){
		startImplosion();
	}
}

function init() {
	horizonWidth = window.innerWidth;
	horizonHeight = window.innerHeight;
	eventHorizon = document.createElement('div');
	eventHorizon.className = 'eventHorizon';
	document.body.appendChild(eventHorizon);
	$('.eventHorizon').css('width',horizonWidth);
	$('.eventHorizon').css('height',horizonHeight);
}

function explode() {
	imploded = false;
	readyForClick = false;
	for(var i=0; i < numberOfParticles; i++) {
		var particleAlpha = Math.random() * 1;
		var particleX = mouseX + setFireworkParticleSpread(1.5);
		var particleY =  mouseY + setFireworkParticleSpread(1);
		var particleScale = Math.round((Math.random() * (particleScaleMax - particleScaleMin)) + particleScaleMin);
		var particleTweenTime = (Math.random() * (maxTweenTime-minTweenTime))+minTweenTime;
		var particle = spawnParticle();
		styleParticle(particle, particleId, particleAlpha, particleScale);
		tweenParticle(particle, mouseX, particleX, mouseY, particleY, 1, particleScale, particleTweenTime);
		particleId++;
	}
	readyForClick = true;
}

function setFireworkParticleSpread(offset) {
	var posNeg = Math.round(Math.random()*1);
	if(posNeg==0){
		posNeg = -1
	}
	var fireworkSpread = (Math.round((Math.random() * fireworksSpread*offset)) * posNeg);
	return fireworkSpread;
}

function spawnParticle() {
	var particle = document.createElement('div');
	var color = Math.round(Math.random() * colorArray.length);
	var particleClass = 'particle '+colorArray[color];
	particle.className = particleClass;
	particle.setAttribute('id', 'particle'+particleId);
	$('.eventHorizon').append(particle);
	return particle;
}

function styleParticle(particle, particleId, particleAlpha, particleScale) {
	$(particle).css('border-radius', particleScale);
	$(particle).css('-moz-border-radius', particleScale);
	$(particle).css('opacity', particleAlpha);
}

function tweenParticle(particle, fromX, toX, fromY, toY, fromScale, toScale, particleTweenTime) {
	var tween = new Tween(particle.style, 'left', Tween.strongEaseInOut, fromX, toX, particleTweenTime, 'px');
	tween.start();
	var tween = new Tween(particle.style, 'top', Tween.strongEaseInOut, fromY, toY, particleTweenTime, 'px');
	tween.start();
	var tween = new Tween(particle.style, 'height', Tween.strongEaseInOut, fromScale, toScale, particleTweenTime, 'px');
	tween.start();
	var tween = new Tween(particle.style, 'width', Tween.strongEaseInOut, fromScale, toScale, particleTweenTime, 'px');
	tween.start();
}

function startImplosion() {
	for(var i=particleId; i>=0; i--){
		particleId = i;
		setTimeout('implodeParticle(' + particleId +')', implosionTimeStagger*i);	
	}
	imploded = true;
	setTimeout('explode()', implosionTimeStagger*numberOfParticles);
}

function implodeParticle(thisId) {
	var thisParticle = $('#particle' + thisId);
	thisParticle.remove();
}