const cat = document.getElementById('tomg');
const mouse = document.getElementById('jerryg');
const cheese = document.getElementById('cheese');
let catX = 20;
let catY = 680;
let mouseX = 1150;
let mouseY = 20;
const step = 10;
const timer = document.getElementById('timer');
const scoredisplay = document.getElementById('score');
let timeleft = 60;
let score = 0;
const obstacle = document.getElementById('obstacle');
let obstacleX = 400;
let obstacleY = 300;
let timeinterval, jerryMoveInterval, collisionInterval;
document.addEventListener('keydown', function(event){
	tommove(event);
})
window.onload = function(){
	document.getElementById('rules').style.display = 'block';
}
function closeRules(){
	document.getElementById('rules').style.display = 'none';
	startgame();
}
function startgame(){
	clearIntervals();
	document.addEventListener('keydown',tommove);
	scoredisplay.textContent = `score: ${score}`;
    timeinterval = setInterval(updatetimer, 1000);
    jerryMoveInterval = setInterval(jerrymove, 300);
    collisionInterval = setInterval(collision, 50);
    cheeseInterval = setInterval(moveCheese, 5000);
    obstacleInterval = setInterval(moveobstacle, 4000);
	tommove();
	scoredisplay.textContent = `score: ${score}`;
}
function tommove(event){
	if(event.key === 'w' && catY > 0){
		catY -= step;
	}
	if(event.key === 's' && catY < 800 - 120){
		catY += step;
	}
	if(event.key === 'a' && catX > 0){
		catX -= step;
	}
	if(event.key === 'd' && catX < 1200 - 90){
		catX += step;
	}
	updatePosition();
}
function jerrymove(){
	clearInterval(jerrymove);
	let directions = ['up', 'down', 'left', 'right'];
	let randmove = directions[Math.floor(Math.random()*4)];
	switch(randmove){
	case 'up':
		if (mouseY > 0) mouseY -= step*10;
        break;
    case 'down':
        if (mouseY < 800 - 150) mouseY += step*10;
        break;
    case 'left':
        if (mouseX > 0) mouseX -= step*10;
        break;
    case 'right':
        if (mouseX < 1200 - 150) mouseX += step*10;
        break;
	}
	updatePosition();
}
function moveCheese() {
    cheeseX = Math.floor(Math.random() * (1200 - 30));
    cheeseY = Math.floor(Math.random() * (800 - 30));
    updatePosition();
}
function moveobstacle(){
	obstacleX = Math.floor(Math.random() * (1200 - 50));
    obstacleY = Math.floor(Math.random() * (800 - 50));
    updatePosition();
}
function updatePosition() {
  cat.style.left = catX + 'px';
  cat.style.top = catY + 'px';
  mouse.style.left = mouseX + 'px';
  mouse.style.top = mouseY + 'px';
  cheese.style.left = cheeseX + 'px';
  cheese.style.top = cheeseY + 'px';
  obstacle.style.left = obstacleX + 'px';
  obstacle.style.top = obstacleY + 'px';
}
function updatetimer(){
	if(timeleft > 0){
		timeleft--;
		timer.textContent = `time left: ${timeleft} seconds`;
	}
	else{
		clearInterval();
		alert('time up! Your final score is ' + score);
	}
};
function collision(){
	let tomrect = cat.getBoundingClientRect();
	let jerryrect = mouse.getBoundingClientRect();
	let cheeseRect = cheese.getBoundingClientRect();
	const obstacleRect = obstacle.getBoundingClientRect();
	if(tomrect.left < jerryrect.right && tomrect.right > jerryrect.left && tomrect.top < jerryrect.bottom && tomrect.bottom > jerryrect.top){
		score += 5;
        scoredisplay.textContent = `score: ${score}`;
        mouseX = Math.floor(Math.random() * (1200 - 50));
        mouseY = Math.floor(Math.random() * (800 - 50));
        updatePosition();
	}
	if (
        tomrect.left < cheeseRect.right &&
        tomrect.right > cheeseRect.left &&
        tomrect.top < cheeseRect.bottom &&
        tomrect.bottom > cheeseRect.top
    ) {
        score += 10;
        scoredisplay.textContent = `score: ${score}`;
        document.getElementById('cheesesound').play();
        cheese.classList.add('cheese-animate');
        moveCheese();
        setTimeout(() => {
            moveCheese();
            cheese.classList.remove('cheese-animate');
        }, 500);
    }
    if (
        tomrect.left < obstacleRect.right &&
        tomrect.right > obstacleRect.left &&
        tomrect.top < obstacleRect.bottom &&
        tomrect.bottom > obstacleRect.top
    ) {
        score -= 5;
        scoredisplay.textContent = `score: ${score}`;
        obstacle.style.left = obstacleX + 'px';
        obstacle.style.top = obstacleY + 'px';
        moveobstacle();
        alert('You hit an obstacle! Watch out!')
        updatePosition();
    }
}
function catFlashEffect() {
    cat.classList.add('cat-flash');
    setTimeout(() => cat.classList.remove('cat-flash'), 500);
}
function reset(){
	clearIntervals();
	timeleft = 60;
	score = 0;
	catX = 20;
	catY = 750;
	mouseX = 1150;
	mouseY = 20;
	timer.textContent = 'timer left: 60 seconds';
	scoredisplay.textContent = 'score: 0'
	updatePosition();
}
function clearIntervals() {
    clearInterval(timeinterval);
    clearInterval(jerryMoveInterval);
    clearInterval(collisionInterval);
}



let characterDetails = {
  Tom: {
    description: "Tom is a clever cat who is always trying to catch Jerry but rarely succeeds.Thomas 'Tom' Jasper Cat, commonly referred to as Tom Cat, or more simply referred to as Tom, and originally known as Jasper is one of the two anti-heroic protagonists in Tom and Jerry, alongside Jerry Mouse, created by William Hanna and Joseph Barbera.",
  },
  Jerry: {
    description: "Jerry is a resourceful mouse who constantly outsmarts Tom.Jerry is usually described as an excited, carefree, clever, beautiful and cute mouse, he in several episodes is shown to be cold as he seeks to have fun no matter who he harms, which to Tom's anger his sense of fun is sadistic.",
  },
  Spike: {
    description: "Spike is a protective bulldog who often comes to Jerry's aid. Spike[1] (who goes by different names in a few episodes - Killer for four episodes, Butch for two episodes, and Bulldog for one) is portrayed as an English Bulldog, who is generally amiable and friendly, and a loving father to his son Tyke in several episodes. However, Spike's character also has a very stern and fierce side for occasions, such as when he is defending his son Tyke.",
  },
  Tyke: {
  	description: "Tyke is a sweet, happy and innocent puppy, who doesn't speak for most of the earlier installments. Spike and Tyke's characters, provide a model of father and son behavior, with Spike spending much of his free time taking Tyke on father-son outings, teaching him the facts of life for dogs and guarding him diligently when they are sleeping.",
  },
  Toodles: {
  	description: "Toodles is first of many girl cats that Tom falls for over the course of Tom and Jerry. She does not speak and rarely moves about. She is white colored and usually wears a neck ribbon and is known to be a very beautiful cat.",
  },
  Quaker: {
  	description: "In many episodes, he is the only one who speaks. He's very trusting, even trusting Tom in many situations in which Tom wishes to eat him. He's a friend of Jerry, but unlike Jerry harbors no hard feelings towards Tom. ",
  },
  Tuffy: {
  	description: "In his normal appearances, Tuffy is typically hungry and has the ability to eat huge amounts of food in one sitting. He often angers Tom and Jerry when he eats a table full of food or steals theirs just as they're about to bite in.",
  },
};
let modal = document.getElementById("modal");
let modalName = document.getElementById("character-name");
let modalDescription = document.getElementById("character-description");
let closeModal = document.getElementById("close-modal");
function showDetails(name) {
	modalName.textContent = name;
  	modalDescription.textContent = characterDetails[name].description;
  	modal.classList.remove("hidden");
  	modal.style.display = 'flex';
}
closeModal.onclick = function () {
	const modal = document.getElementById('modal');
	modal.classList.add("hidden");
	modal.style.display = 'none';
};
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 4, random: true },
    move: { enable: true, speed: 2 },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } },
  },
});