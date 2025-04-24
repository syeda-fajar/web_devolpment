const slides = document.querySelectorAll('.slide');
const prev= document.querySelector('#prev')
const next= document.querySelector('#next')
const auto=false;
const intervalTime=5000;
const nextslide=()=>{
    //get the current class
   const  current = document.querySelector('.current')
    //remove current 
    current.classList.remove('current');
    //add current to next sibling
    if(current.nextElementSibling){
        current.nextElementSibling.classList.add('current');
    }
    else{
        slides[0].classList.add('current');
    }
    setTimeout(() => {
        current.classList.remove('current')
    },);
}
const prevslide=()=>{
    //get the current class
   const  current = document.querySelector('.current')
    //remove current 
    current.classList.remove('current');
    //add current to next sibling
    if(current.previousElementSibling){
        current.previousElementSibling.classList.add('current');
    }
    else{
        slides[slides.length-0].classList.add('current');
    }
    setTimeout(() => {
        current.classList.remove('current')
    },);
}
next.addEventListener('click',e=>{
nextslide();
})
prev.addEventListener('click',e=>{
    nextslide();
    })
