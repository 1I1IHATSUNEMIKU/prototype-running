const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let player = {x: 50, y: 150, w: 30, h: 30, vy: 0, jumping: false};

let obstacle = {x: 600, y: 160, w: 20, h: 40};

let gravity = 1.2;
let jumpPower = -15;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 190, canvas.width, 10); // ground
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.w, player.h); // player
    ctx.fillStyle = "cyan";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h); // obstacle
}

function update(){
    player.y += player.vy;
    if(player.y + player.h < 190){
        player.vy += gravity;
    } else{
        player.y = 160;
        player.vy = 0;
        player.jumping = false;
    }
    obstacle.x -= 5;
    if(obstacle.x + obstacle.w < 0){
        obstacle.x = canvas.width
    }
    if(
        player.x < obstacle.x + obstacle.w &&
        player.x + player.w > obstacle.x &&
        player.y < obstacle.y + obstacle.h &&
        player.y + player.h > obstacle.y
    ){
        alert("💀Game/oveR💀");
        obstacle.x = canvas.width;
        player.x = 50;
        player.y = 150;
        player.vy = 0;
    }
    draw();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
    if(e.code === "Space" && !player.jumping){
        player.vy = jumpPower;
        player.jumping = true;
    }
})

update();