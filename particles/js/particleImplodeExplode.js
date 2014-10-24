var mouseX;
var mouseY;
var eventHorizon;
var horizonWidth;
var horizonHeight;
var particleId = 0;
var particleScaleMin = 2;
var particleScaleMax = 12;
var numberOfParticles = 100;
var implosionTimeStagger = 5;
var maxTweenTime = 3;
var imploded = true;
var readyForClick = true;
var color;
var colorArray = new Array('blue', 'green', 'orange', 'purple', 'white', 'yellow');

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
	color = Math.floor(Math.random() * colorArray.length);
	for(var i=0; i < numberOfParticles; i++) {
		var particleAlpha = Math.random() * 1;
		var particleScale = Math.round((Math.random() * (particleScaleMax - particleScaleMin)) + particleScaleMin);
		var particleX = Math.random() * (horizonWidth - particleScale);
		var particleY = Math.random() * (horizonHeight - particleScale);
		var particleTweenTime = Math.random() * maxTweenTime;
		var particle = spawnParticle();
		styleParticle(particle, particleId, particleAlpha, particleScale);
		tweenParticle(particle, mouseX, particleX, mouseY, particleY, 1, particleScale, particleTweenTime);
		particleId++;
	}
	readyForClick = true;
}

function spawnParticle() {
	var particle = document.createElement('div');
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
	var tween = new Tween(particle.style, 'left', Tween.elasticEaseOut, fromX, toX, particleTweenTime, 'px');
	tween.start();
	var tween = new Tween(particle.style, 'top', Tween.elasticEaseOut, fromY, toY, particleTweenTime, 'px');
	tween.start();
	var tween = new Tween(particle.style, 'height', Tween.elasticEaseOut, fromScale, toScale, particleTweenTime, 'px');
	tween.start();
	var tween = new Tween(particle.style, 'width', Tween.elasticEaseOut, fromScale, toScale, particleTweenTime, 'px');
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
	//tweenParticle(thisParticle, $(thisParticle).css('left').replace(/[^-\d\.]/g, ''), mouseX, $(thisParticle).css('top').replace(/[^-\d\.]/g, ''), mouseY, 1, $(thisParticle).css('width').replace(/[^-\d\.]/g, ''), 1);
	thisParticle.remove();
}