var horizonWidth;
var horizonHeight;
var particleScaleMin = 8;
var particleScaleMax = 30;
var numberOfParticles = 500;
var colorArray = new Array('blue', 'green', 'orange', 'purple', 'white', 'yellow');

$(document).ready(function() {
	this.onclick = init;
});

function init() {
	var newBodyElement = document.createElement('body');
	newBodyElement.className = 'black';
	document.body = newBodyElement;
	horizonWidth = window.innerWidth;
	horizonHeight = window.innerHeight;
	generateParticles();
}

function generateParticles() {
	for(var i=0; i < numberOfParticles; i++) {
		var particleAlpha = Math.random() * 1;
		var particleScale = Math.round((Math.random() * (particleScaleMax - particleScaleMin)) + particleScaleMin);
		var particleX = Math.random() * (horizonWidth - particleScale);
		var particleY = Math.random() * (horizonHeight - particleScale);
		var particle = spawnParticle();
		styleParticle(particle, particleAlpha, particleScale, particleX, particleY);
	}
}

function spawnParticle() {
	var particle = document.createElement('div');
	var color = Math.round(Math.random() * colorArray.length);
	var particleClass = 'particle '+colorArray[color];
	particle.className = particleClass;
	$(document.body).append(particle);
	return particle;
}

function styleParticle(particle, particleAlpha, particleScale, particleX, particleY) {
	$(particle).css('border-radius', particleScale);
	$(particle).css('height', particleScale);
	$(particle).css('left', particleX);
	$(particle).css('opacity', particleAlpha);
	$(particle).css('top', particleY);
	$(particle).css('width', particleScale);
	$(particle).css('-moz-border-radius', particleScale);
}