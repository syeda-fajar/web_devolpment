const enddate = "20 August 2024 3:11 pm";
document.getElementById('date').innerHTML = enddate;
let input = document.querySelectorAll('#input');

function clock(){
const end = new Date(enddate);
const current = new Date();
console.log(end);
const diff = (end-current) / 1000;
if(diff < 0) return;
input[0].value = Math.floor(diff / 3600 / 24);

input[1].value = Math.floor(diff / 3600 ) % 24;
input[2].value = Math.floor(diff / 60 ) % 60;
input[3].value = Math.floor(diff % 60 ) ;


}
setInterval(()=>{clock();},1000)
clock();
