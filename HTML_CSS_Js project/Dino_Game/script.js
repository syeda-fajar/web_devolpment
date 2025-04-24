score =0;
cross =true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
console.log("welcome")
document.onkeydown = function(e){
    console.log("key code", e.keyCode)
    if(e.keyCode==38){
        dino=document.querySelector('.dino');
        dino.classList.add('animatedino')
        setTimeout(()=>{
            dino.classList.remove('animatedino')

        },700);
    }
    if(e.keyCode==39){
        dino=document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + 'px';
    }
    if(e.keyCode==37){
        dino=document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + 'px';
    }
}

setInterval(()=>{
    dino=document.querySelector('.dino');
    gameover = document.querySelector('.gameover');
    obstacle =document.querySelector('.obstacle');
   
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox)
    offsetY = Math.abs(dy-oy)
    if(offsetX<113 && offsetY<53)
  {
     gameover.style.visibility ='visible';
     obstacle.classList.remove('obstacleAni')
     audiogo.play();
     setTimeout(() => {
         audiogo.pause();
         audio.pause();
     }, 1000);
}
else if(offsetX < 73 && cross){
    score+=1;
    updateScore(score);
    cross =false;
    setInterval(()=>{
        cross = true;
    },1000);
    setTimeout(()=>
    {
        anidur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        newdur = anidur - 0.1;
        obstacle.style.animationDuration = newdur + 's'; 
    },500)
    
}  

    
},10);
function updateScore(score){
    scoreCont.innerHTML = " your score is  " + score;
}