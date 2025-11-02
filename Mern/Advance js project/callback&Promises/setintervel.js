function createCountdown(sec){
    remaining=sec;
    const intervelid = setInterval(() => {
        console.log(`Time remaing ${remaining} seconds`)
        remaining--;

        if(remaining<0){
            clearInterval(intervelid)
             console.log("Countdown finished!")
        }
        
    }, 1000);

    return intervelid



}
//createCountdown(7)

 const intervalId = setInterval(() => {
 console.log("Repeating .");
 }, 1000);
 // Stop after 3 seconds
 setTimeout(() => {
 clearInterval(intervalId);
 }, 3000);

 