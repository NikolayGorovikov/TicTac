"use strict"
let cross1 = '<div class="cross1" ></div>';
let cross2 = '<div class="cross2" ></div>';
let littleCircle = '<div class="smallCircle"></div>';
let bigCircle = '<div class="bigCircle"></div>';
function cross(elem){
    elem.insertAdjacentHTML("afterbegin", cross1+cross2);
    setTimeout(()=>{elem.querySelector(".cross1").style.transform = "rotate(225deg) translateY(0)";
    elem.querySelector(".cross2").style.transform = "rotate(-45deg) translateY(0)";
        elem.querySelectorAll(".cross1, .cross2").forEach((e)=>{e.style.height = "calc(65vmin/3)"; e.style.top="0";});
    }, 0);
}
function addCirclePoint(degrees, elem){
    elem.insertAdjacentHTML("beforeend",littleCircle);
    elem.querySelector(":last-child").style.transform = "rotate("+degrees+"deg)";
}
function toDegrees(rad){
    return rad*180/Math.PI;
}
function toRadians(degrees){
    return degrees/180*Math.PI;
}
function circle(elem){
    let i= 29;
    let a = setInterval(()=>{
        if (i>386) clearInterval(a);
        else {
            addCirclePoint(i, elem);
        }
        i+=3;
    }, 5);
    setTimeout(()=>{
        elem.innerHTML = "";
        elem.insertAdjacentHTML("afterbegin",bigCircle);
    }, 600);

}
let message = document.getElementById("message"), pitch, pitchBegin;
document.addEventListener("DOMContentLoaded", ()=>{
    setTimeout(()=>{
        setTimeout(()=>{
            pitch.querySelectorAll(".leftLine").forEach((e)=>e.style.width = "65vmin");
            pitch.querySelectorAll(".topLine").forEach((e)=>e.style.height = "65vmin");
            setTimeout(()=>{
                pitch.querySelectorAll(".leftLine, .topLine").forEach((e)=>e.style.transitionProperty = "none");
            }, 1000)
        }, 700)
        message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-80vmin)");
        setTimeout(()=>{
            message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-160vmin)");
            setTimeout(()=>{
                message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
                message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                document.getElementById("hi").remove();
                document.getElementById("about").remove();
                setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
            }, 500)
        }, 2000)
    }, 1000)
});
let choseFirst = document.getElementById("chose").cloneNode(true);
choseFirst.style.transform = "translateX(-80vmin)";
function TicTac(){
    let game = [0,0,0,0,0,0,0,0,0];
    pitch = document.getElementById("pitch");
    pitchBegin = pitch.cloneNode(true);
    function isWin(board, n){
        for (let i = 0; i < 3; i++){
            if (board[i] + board[i+3]+board[i+6] === n){
                return 'Компьютер победил';
            }
            else if(board[i*3]+board[i*3+1]+board[i*3+2] === n){
                return 'Компьютер победил';
            }
        }
        if (board[0]+board[4]+board[8] === n){
            return 'Компьютер победил';
        }
        if (board[2]+board[4]+board[6] === n){
            return 'Компьютер победил';
        }
        if (board.every(item => item !== 0)){
            return 'Ничья';
        }
        return undefined;
    }
    let turns = {
        player: playerMakeTurn,
        bot: botMakeTurn
    };
    let actualPlayer;
    let youBlock = '<div class="turn">Ваш ход!</div>', botBlock = '<div class="turn">Бот ходит!</div>';
    function animatedChose(){
        document.getElementById("you").style.transform = "translateX(calc(65vmin / 4))";
        document.getElementById("bot").style.transform = "translateX(calc(-65vmin / 4))";
        setTimeout(()=>{
            document.getElementById("you").style.transform = "";
            document.getElementById("bot").style.transform = "";
            document.getElementById("you").style.zIndex = "";
            document.getElementById("bot").style.zIndex = "";
            document.getElementById("bot").style.color = "";
            document.getElementById("bot").style.backgroundColor = "";
            document.getElementById("you").style.color = "";
            document.getElementById("you").style.backgroundColor = "";
        }, 1499);
        if (actualPlayer === "player"){
            message.insertAdjacentHTML("beforeend",'<div class="turn">Ваш ход!</div><div class="turn">Бот ходит!</div>');
            turns.playerSign = cross;
            turns.notSign = circle;
        }
        else {
            message.insertAdjacentHTML("beforeend",'<div class="turn">Бот ходит!</div><div class="turn">Ваш ход!</div>');
            turns.playerSign = circle;
            turns.notSign = cross;
        }
        setTimeout(()=>{
            message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-80vmin)");
            setTimeout(()=>{
                message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
                message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                document.getElementById("chose").remove();
                setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
                if (actualPlayer === "player") pitch.addEventListener("pointerdown", playerMakeTurn, {once:true});
                else setTimeout(botMakeTurn, 150);
            }, 500);
        }, 1000)
    }
    let main = (event)=>{
        let target = event.target.closest("#you, #bot");
        if (!target) {
            document.getElementById("buttons").addEventListener("click", main, {once:true});
            return
        }
        target.style.zIndex = "10";
        target.style.backgroundColor = "black";
        target.style.color = "white";
        if (target.id === "bot") actualPlayer = "bot";
        else actualPlayer = "player";
        event.stopImmediatePropagation();
        animatedChose();
    }
    document.getElementById("buttons").addEventListener("click", main, {once:true});
    function WhoFirst(){
        if (actualPlayer === `игрок`){
            actualPlayer = `player`;
        }
        else if (actualPlayer === `компьютер`){
            actualPlayer = `bot`;
        }
        else{
            actualPlayer = prompt('Выберите кто ходит первым, "игрок" или "компьютер"');
            WhoFirst();
        }
    }
    let nums = [6, 7, 8, 3, 4, 5, 0, 1, 2];
    function playerMakeTurn(event){
        console.log("player");
        let num = [...pitch.children].findIndex((e)=>(e === event.target.closest(".place")));
        console.log(num, game);
        if (game[nums[num]] === 0){
            game[nums[num]] = -1;
            console.log(game);
            actualPlayer = 'bot';
            turns.playerSign(event.target.closest(".place"));
            let situation = isWin(game, -3);
            if (situation === undefined){
                setTimeout(()=>{
                    console.log(document.querySelector(".turn").style.transform);
                    if (document.querySelector(".turn").style.transform === "none") {
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-80vmin)");
                    }
                    else{
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                    }
                    setTimeout(()=>{
                        botMakeTurn();
                    }, 800);
                }, 650)
            }
            else {
                message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
                message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                message.innerHTML = "";
                message.insertAdjacentHTML("afterbegin", youBlock);
                message.insertAdjacentHTML("beforeend", '<div class="turn">Ничья</div>');
                setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
                setTimeout(()=>{
                    message.querySelectorAll("#message > *").forEach((elem)=>elem.style.transform = "translateX(-80vmin)");
                    message.append(choseFirst.cloneNode(true));
                    setTimeout(()=>{
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-160vmin)");
                        pitch.style.transform = "translateY(80vmin)";
                        setTimeout(()=>{
                            message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
                            message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                            message.querySelectorAll(".turn").forEach((e)=>e.remove());
                            setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
                            pitch.remove();
                            document.body.append(pitchBegin);
                            setTimeout(()=>{
                                pitch.querySelectorAll(".leftLine").forEach((e)=>e.style.width = "65vmin");
                                pitch.querySelectorAll(".topLine").forEach((e)=>e.style.height = "65vmin");
                            }, 0);
                            TicTac();
                        }, 650)
                    }, 2000)
                }, 650)
            }
        }
        else {
            pitch.addEventListener("pointerdown", playerMakeTurn, {once:true});
        }
    }
    function botMakeTurn(){
        let bestScore = -Infinity, move;
        for (let i = 0; i < 9; i++){
            if (game[i] === 0){
                game[i] = 1;
                let score = recursion(game, -1);
                game[i] = 0;
                if (score > bestScore){
                    bestScore = score;
                    move = i;
                }
            }
        }
        game[move] = 1;
        console.log(game);
        let situation = isWin(game, 3);
        turns.notSign(pitch.querySelector(".place:nth-of-type("+(nums.indexOf(move)+1)+")"));
        if (situation === undefined){
            setTimeout(()=>{
                console.log(document.querySelector(".turn").style.transform);
                if (document.querySelector(".turn").style.transform === "none") {
                    message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-80vmin)");
                }
                else{
                    message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                }
                setTimeout(()=>{
                    pitch.addEventListener("pointerdown", playerMakeTurn, {once:true});
                }, 500)
                actualPlayer = 'player';
            }, 650)
        }
        else if (situation === 'Компьютер победил'){
            message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
            message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
            message.innerHTML = "";
            message.insertAdjacentHTML("afterbegin", botBlock);
            message.insertAdjacentHTML("beforeend", '<div class="turn">Бот победил!</div>');
            setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
            setTimeout(()=>{
                message.querySelectorAll("#message > *").forEach((elem)=>elem.style.transform = "translateX(-80vmin)");
                message.append(choseFirst.cloneNode(true));
                setTimeout(()=>{
                    message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-160vmin)");
                    pitch.style.transform = "translateY(80vmin)";
                    setTimeout(()=>{
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                        message.querySelectorAll(".turn").forEach((e)=>e.remove());
                        setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
                        pitch.remove();
                        document.body.append(pitchBegin);
                        setTimeout(()=>{
                            pitch.querySelectorAll(".leftLine").forEach((e)=>e.style.width = "65vmin");
                            pitch.querySelectorAll(".topLine").forEach((e)=>e.style.height = "65vmin");}, 0);
                        TicTac();
                    }, 650)
                }, 2000)
            }, 650)
        }
        else {
            message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
            message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
            message.innerHTML = "";
            message.insertAdjacentHTML("afterbegin", botBlock);
            message.insertAdjacentHTML("beforeend", '<div class="turn">Ничья/div>');
            setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
            setTimeout(()=>{
                message.querySelectorAll("#message > *").forEach((elem)=>elem.style.transform = "translateX(-80vmin)");
                message.append(choseFirst.cloneNode(true));
                setTimeout(()=>{
                    message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "translateX(-160vmin)");
                    pitch.style.transform = "translateY(80vmin)";
                    setTimeout(()=>{
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0s");
                        message.querySelectorAll("#message > *").forEach((e)=>e.style.transform = "none");
                        message.querySelectorAll(".turn").forEach((e)=>e.remove());
                        setTimeout(()=>message.querySelectorAll("#message > *").forEach((e)=>e.style.transitionDuration= "0.5s"), 500);
                        pitch.remove();
                        document.body.append(pitchBegin);
                        setTimeout(()=>{
                            pitch.querySelectorAll(".leftLine").forEach((e)=>e.style.width = "65vmin");
                            pitch.querySelectorAll(".topLine").forEach((e)=>e.style.height = "65vmin");
                            }, 0);TicTac();
                    }, 650)
                }, 2000)
            }, 650)
        }
    }
    let infinities = {
        1: -Infinity,
        '-1': Infinity
    };
    let funcs = {
        1: Math.max,
        '-1': Math.min
    };
    function recursion(board, n){
        if (isWin(board, 3) === 'Компьютер победил'){
            return 1;
        }
        if (isWin(board, -3) === 'Компьютер победил'){
            return -1;
        }
        if (isWin(board, -3) === 'Ничья'){
            return 0;
        }
        let bestScore = infinities[n];
        for (let i = 0; i < 9; i++){
            if (board[i] === 0){
                board[i] = Number(n);
                let score = recursion(board, Number(n)*(-1));
                board[i] = 0;
                bestScore = funcs[n](score, bestScore);
            }
        }
        return bestScore;
    }
}
TicTac();