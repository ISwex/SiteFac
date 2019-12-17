//recupération info canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

//creer l'objet de la raquette du joueur
const user = {
	x:0,
	y:cvs.height/2-100/2,
	width: 10,
	height: 100,
	color :"WHITE",
	score:0
}

//creer l'objet de la raquette du bot
const bot = {
	x:cvs.width-10,
	y:cvs.height/2-100/2,
	width: 10,
	height: 100,
	color :"WHITE",
	score:0
}

//creer l'objet de la balle
const ball= {
	x:cvs.width/2,
	y:cvs.height/2,
	radius : 10,
	speed:5,
	velocityX:5,
	velocityY:5,
	color:"WHITE"
}

 //creation du filet
 const net = {
 	x:cvs.width/2-1,
 	y:0,
 	width:2,
 	height:10,
 	color:"WHITE"
 }

//Construction table
function drawRect(x,y,w,h,color){
	ctx.fillStyle=color;
	ctx.fillRect(x,y,w,h);
}

function drawNet(){
	for(let i =0; i <= cvs.height;i+=15 ){
		drawRect(net.x,net.y+i,net.width,net.height,net.color)
	}
}

 //construction balle
 function drawCircle(x,y,r,color){
 	ctx.fillStyle = color;
 	ctx.beginPath();
 	ctx.arc(x,y,r,0,Math.PI*2,false);
 	ctx.closePath();
 	ctx.fill();
 }
 
//affichage texte
 function drawText(text,x,y,color){
 	ctx.fillStyle = color;
 	ctx.font = "45px fantasy";
 	ctx.fillText(text,x,y);
 }

//controle raquette

cvs.addEventListener("mousemove",movePaddle);
function movePaddle(evt){
	let rect = cvs.getBoundingClientRect();

	user.y= evt.clientY - rect.top-user.height/2;

}

 function render() {
 	//creer la table
 	drawRect(0,0,cvs.width,cvs.height,"BLACK");
 	//creer le filet
 	drawNet();
 	//afficher le score
 	drawText(user.score,cvs.width/4, cvs.height/5,"WHITE");
 	drawText(bot.score,3*cvs.width/4, cvs.height/5,"WHITE");

 	//creer les raquettes
 	drawRect(user.x,user.y,user.width,user.height,user.color);
	drawRect(bot.x,bot.y,bot.width,bot.height,bot.color);
 	//creer la balle
 	drawCircle(ball.x,ball.y,ball.radius,ball.color);
 }

//collision
function collision (b,p){
	b.top = b.y-b.radius;
	b.bottom = b.y-b.radius;
	b.left=b.x-b.radius;
	b.right=b.x+b.radius;

	p.top=p.y;
	p.bottom=p.y+p.height;
	p.left=p.x;
	p.right=p.x+p.width;
	return b.right>p.left&&b.bottom>p.top&&b.left<p.right&&b.top<p.bottom;
}
//rerset balle
function resetBall() {
	ball.x= cvs.width/2;
	ball.y = cvs.height/2;
	ball.speed = 5;
	ball.velocityX = -ball.velocityX;

}

//update
function update(){
	ball.x+=ball.velocityX;
	ball.y+=ball.velocityY;

	let botLevel=0.1;
	//"IA" pour le mouvement du bots 
	bot.y+=(ball.y-(bot.y+bot.height/2))* botLevel;


	if(ball.y+ball.radius > cvs.height|| ball.y - ball.radius <0){
		ball.velocityY= -ball.velocityY;
	}

	let player =(ball.x < cvs.width/2 ) ?user : bot;

	if(collision(ball,player)){
		let pointCo = ball.y -(player.y + player.height/2);
		pointCo= pointCo/(player.height/2);
		// calcul angle 
		let angle = pointCo * Math.PI/4;
		// direction de la balle
		let direction = (ball.x < cvs.width/2) ? 1:-1;
		//changement véolicté
		ball.velocityX = direction * ball.speed* Math.cos(angle);
		ball.velocityY =  ball.speed* Math.sin(angle);
		//a chaque rebond on augmente la vitesse 
		ball.speed+=0.5;
	}
	// mise a jour du score 
	if(ball.x - ball.radius < 0 ){
		bot.score++;
		resetBall();
	}else if (ball.x+ball.radius > cvs.width){
		//point du joueur
		user.score++;
		resetBall();
	}
}


 //initialisation
 function game(){
 	render();
 	update();
 }

 //boucle
 const framePerSecond = 60;
 setInterval(game,1000/framePerSecond);