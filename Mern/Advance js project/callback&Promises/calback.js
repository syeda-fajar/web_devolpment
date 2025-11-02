//...................Exercise 1: Create a callback-based function................//

function processData(data,callback) {
    setTimeout(() => {
        const processed = data.map(item=>item.toUpperCase())
        callback(processed)
    },1000);
    
}

processData(["first","second"],(result)=>{
console.log(result)
})


 // .............Exercise 2: Create a callback-based calculator...............

 function calculator(a,b,operation,callback){
   setTimeout(()=>{
    let result;
    switch(operation){
        case "add":
            result=a+b;
            break;
        case "subtract":
            result=a-b;
            break
        case "multiply":
            result=a*b;
            break
        case "divide":
            result=a/b;
            break
    }
    callback(result);
   },1000)
 }
 
 
 
calculator(10,5,"multiply",(result)=>{
console.log(result)
})