console.log('hi');
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let border_background='white';
let border='black';
let dx=10;
let dy=0;
let food_x;
let food_y;
let score=0;
document.addEventListener('keydown',keypress);

let snake=[{x:200,y:200},{x:190,y:200},{x:180,y:200},
    {x:170,y:200},{x:160,y:200}]
//call all function from main function 
    function main(){
        
          
setTimeout(() => {
    if(game_has_ended()){
        //alert('game has ended');
       //// gameOver.play();
        return;
       }
    
    board();
    
    snake_move();
    drawFood();
    drawSnake();
    //key_check();
    main();
},100);
       
    }
    
    main();
    gen_food();
    
//ctx.fillStyle=border_background;
//function for create snake board
function board(){
    ctx.fillStyle=border_background;
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle=border;
ctx.strokeRect(0,0,canvas.clientWidth,canvas.clientHeight);
}
//function for draw sanke 
function drawSnake(){
snake.forEach(draw_Snake_part);
}
//functuion for draw each part of snake
function draw_Snake_part(item){
    ctx.strokeStyle='black';
    ctx.strokeRect(item.x,item.y,10,10);
ctx.fillStyle='red';
ctx.fillRect(item.x,item.y,10,10);
}
//make snake move
function snake_move(){
let head={x:snake[0].x+dx,y:snake[0].y+dy};
snake.unshift(head);
if(snake[0].x===food_x &&snake[0].y===food_y){
    score+=10;
    score.toString();
    document.getElementById('score').innerHTML=score;
    console.log('score()=>',score);
    gen_food();
}
else{
snake.pop();
}

}

function keypress(event){

    const LEFT_KEY = 37;
   const RIGHT_KEY = 39;
   const UP_KEY = 38;
   const DOWN_KEY = 40;

   const key=event.keyCode;
   
   let right=dx===10;
   let left=dx==-10;
   let up=dy==-10;
   let down=dy==10;
   if (key===LEFT_KEY && !right)
    {
        dx=-10;
        dy=0;
    }
    if(key===RIGHT_KEY && !left){
        dx=10;
        dy=0;

    }
    if(key===UP_KEY && !down){
        dx=0;
        dy=-10

    }
    if(key===DOWN_KEY && !up){
        dx=0;
        dy=10
    }
}
function game_has_ended(){
   for(let i=4;i<snake.length;i++){
if (snake[i].x===snake[0].x && snake[i].y===snake[0].y)
   return true;

   }
   const hit_left=snake[0].x  <0;
   const  hit_right=snake[0].x===canvas.width-10;
   const hit_top=snake[0].y<0;
   const hit_bottom =snake[0].y==canvas.height-10;
   return hit_left || hit_right || hit_top || hit_bottom ;

}
function random_Food(min,max){
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;

}
function gen_food(){
    food_x = random_Food(0, canvas.width - 10);
    food_y= random_Food(0, canvas.height - 10);
   snake.forEach((part)=>{
let eatFood=part.x===food_x && part.y===food_y;
if (eatFood){
    
    console.log('score',score);
    gen_food();
}
})
}
function drawFood(){
    ctx.strokeStyle='black';
    ctx.strokeRect(food_x,food_y,10,10);
    ctx.fillStyle='green';
    ctx.fillRect(food_x,food_y,10,10);
      
}
