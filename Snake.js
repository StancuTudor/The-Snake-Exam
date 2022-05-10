class Tile{
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

class Question{
	constructor(question, a1, a2, a3, a4){
	this.question = question;
	this.answers = [a1,a2,a3,a4];
	}
}

var snake = new Array(Tile);
var questionList = new Array(Question);

var map=[];
var directionX = 0;
var directionY = 1;
var game = true;
var Answer = 1;

function tileDisplay(tile, im)
{
	document.getElementById(String(tile.x)+String(tile.y)).src = im;
}

function lose()
{
	game = false;
	alert("Raspunsul era: " + Answer);
}

function checkLose(x,y)
{	
	if(map[x][y] == 1) return true;
	return false;
}

function newQuestion()
{
	let v = [1,2,3,4];
	shuffle(v);
	
	let q = questionList[Math.floor(Math.random() * (questionList.length - 1)) + 1];
	
	Answer = v[0];
	document.getElementById("question").innerHTML = q.question;
	for(let i = 0; i <= 3; i++)
		document.getElementById("answer" + String(v[i])).innerHTML = String(v[i]) + ") " + q.answers[i];
}

function checkAnswer(answer)
{
	if(answer == Answer) {
		newQuestion();
		return true;
	}
	return false;
}

function nextX()
{
	let last = snake.length - 1;
	let next = snake[last].x + directionX;
	if(next < 0) next = 9;
	if(next > 9) next = 0;
	return next;
}

function nextY()
{
	let last = snake.length - 1;
	let next = snake[last].y + directionY;
	if(next < 0) next = 9;
	if(next > 9) next = 0;
	return next;
}

function move()
{
	if(checkLose(nextX(), nextY())) {lose(); return;}
	
	let answer = map[nextX()][nextY()];
	if(answer < 0){
		if(!checkAnswer(-answer)){lose(); return;}
		snakeGrow(nextX(), nextY());
		randomApple(-answer);
	}
	else snakeMove();
	//setTimeout(move, 500);
}

function headMove()
{
	let last = snake.length - 1;
	snake[last].x = nextX();
	snake[last].y = nextY();
	
	map[snake[last].x][snake[last].y] = 1;
	tileDisplay(snake[last], "images/snake.png");
}

function snakeMove()
{
	if(!game) return;
	
	tileDisplay(snake[1], "images/empty.png");
	map[snake[1].x][snake[1].y] = 0;
	
	for(let i = 1; i < snake.length - 1; i++)
	{
		snake[i].x = snake[i + 1].x;
		snake[i].y = snake[i + 1].y;
	}
	
	headMove();
}

function snakeGrow(x,y)
{
	let tile = new Tile(x,y);
	snake.push(tile);
	
	map[tile.x][tile.y] = 1;
	tileDisplay(tile, "images/snake.png");
}

function randomApple(nr)
{
	let x = Math.floor(Math.random() * 10);
	let y = Math.floor(Math.random() * 10);
	if(map[x][y] != 0)
	{
		randomApple(nr);
		return;
	}
	map[x][y] = -nr;
	document.getElementById(String(x)+String(y)).src = "images/"+String(nr)+".png";
}

function addQuestions()
{
	questionList.push(new Question("(a+b)<sup>2</sup> = ?", "a<sup>2</sup>+2ab+b<sup>2</sup>", "a<sup>2</sup>-ab+b<sup>2</sup>", "a<sup>2</sup>+b<sup>2</sup>", "a<sup>2</sup>+ab+b<sup>2</sup>"));
	questionList.push(new Question("(a-b)<sup>2</sup> = ?", "a<sup>2</sup>-2ab+b<sup>2</sup>", "a<sup>2</sup>-ab-b<sup>2</sup>", "a<sup>2</sup>-b<sup>2</sup>", "a<sup>2</sup>-2ab-b<sup>2</sup>"));
	questionList.push(new Question("a<sup>2</sup>-b<sup>2</sup> = ?", "(a-b)(a+b)","(a-b)<sup>2</sup>", "2a-2b", "a<sup>2</sup>-2ab+b<sup>2</sup>"));
	questionList.push(new Question("(2&radic;7)<sup>2</sup> = ?","2<sup>2</sup>&#8729;7","2<sup>2</sup>&radic;7","2&#8729;7","14<sup>2</sup>"));
	questionList.push(new Question("Func&#539;ia f(x)=x-2 se intersecteaz&#259; cu axa Ox &#238;n punctul:", "A(2,0)", "A(0,-2)", "A(0,2)", "A(-2,2)"));
	questionList.push(new Question("Cateta se afl&#259; din formula:", "&radic;(ip<sup>2</sup>-c<sup>2</sup>)","ip<sup>2</sup>-c<sup>2</sup>","c<sup>2</sup>-ip<sup>2</sup>","&radic;ip<sup>2</sup>-&radic;c<sup>2</sup>"));
}

window.onload = function()
{	
	for(let i = 0; i < 10; i++)
	{
		map.push([]);
		for(let j = 0; j < 10; j++)
		{
			map[i].push(0);
			let tile = document.createElement("img");
			tile.setAttribute("src", "images/empty.png");
			tile.setAttribute("class", "grid-item");
			tile.setAttribute("id", String(i)+String(j));
			document.getElementById("board").appendChild(tile);
		}
	}
	
	addQuestions();
	
	snakeGrow(4,1);
	snakeGrow(4,2);
	snakeGrow(4,3);
	randomApple(1);
	randomApple(2);
	randomApple(3);
	randomApple(4);
	newQuestion();
	move();
}

document.addEventListener("keypress", function onEvent(event) {
	if(!game)return;
    if(event. key == 'a' && directionX != 0)
	{
		directionX = 0;
		directionY = -1;
	}
	if(event. key == 'd' && directionX != 0)
	{
		directionX = 0;
		directionY = 1;
	}
	if(event. key == 'w' && directionY != 0)
	{
		directionX = -1;
		directionY = 0;
	}
	if(event. key == 's' && directionY != 0)
	{
		directionX = 1;
		directionY = 0;
	}
	move();
});

function reload()
{
	location.reload();
}
