// Exercise 1: Create a promise-based random number generator


function RandomNumberGenerator(min, max) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (min > max) {
        reject(new Error("min cannot be greater than max"))
      }
      else {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        resolve(random)
      }
    }, 1000);
  })

}

RandomNumberGenerator(110, 130)
  .then((result) => { console.log(result) })
  .catch((err) => { console.log(err) })


// .......Exercise 2: Create a promise-based weather simulator

function getWeather(city) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const weather = ['sunny', 'rainy', 'cloudy', 'snowy'];
      randomWeather = weather[Math.floor(Math.random() * weather.length)];
      if (city) {
        resolve({ city, weather: randomWeather, temprature: Math.floor(Math.random() * 30) + 10 })
      }
      else {
        reject(new Error("city name is required "))
      }
    }, 1000);
  })
}

getWeather('New York')
  .then(data => console.log('Weather:', data))
  .catch(error => console.log('Error:', error.message))
  .finally(() => console.log('Weather check completed'))




//........... Exercise 1: Convert this callback-based function to promis....................

 function fetchUserCallback(id, callback) {
    setTimeout(() => {
        if (id > 0) {
            callback(null, { id, name: `User ${id}`, email: `user${id}@example.com` });
        } else {
            callback(new Error('Invalid user ID'));
        }
    }, 1000);
 }

 function fetchUserCallback(id) {
  return new Promise((resolve, reject) => {
     setTimeout(() => {
        if(id>0){
          resolve(null, { id, name: `User ${id}`, email: `user${id}@example.com` })
        }
         else {
            reject(new Error('Invalid user ID'));
        }
    }, 1000);
  })
   
 }


 //................Exercise 2: Chain multiple promises...................
  function getUserData(id) {
    return fetchUserPromise(id)
        .then(user => {
            console.log('User fetched:', user);
            return getPostsPromise(user.id);
        })
        .then(posts => {
            console.log('Posts fetched:', posts);
            return getCommentsPromise(posts[0].id);
        })
        .then(comments => {
            console.log('Comments fetched:', comments);
            return { user, posts, comments };
        });
 }

 

  // ...............Exercise 1: Create a promise-based file system simulato........................
  function readFile(filename) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (filename.endsWith('.txt')) {
                resolve(`Contents of ${filename}`);
            } else {
                reject(new Error('Only .txt files are supported'));
            }
        }, Math.random() * 1000 + 500);
    });
 }

 const files = ['file1.txt', 'file2.txt', 'file3.txt'];
 Promise.all(files.map(file=>readFile(file)))
 .then(content=>{console.log("contents",content)})
.catch(error => {
        console.log('Error reading files:', error.message);
    });


// ................Exercise 3: Race condition simulation............................
 function serverRequest(server, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Response from ${server}`);
        }, delay);
    });
 }

 Promise.race([ serverRequest('Server A', 1000),
    serverRequest('Server B', 800),
    serverRequest('Server C', 1200)])
    .then(result=>{
      console.log("Fastest Response",result)
    })



//................Exercise 1: Convert promise chain to async/await.................

 function fetchUserPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
 }

async function getUserDataAsync(id) {
    try {
        const user = await fetchUserPromise(id);
        console.log('User fetched:', user);
        
        const posts = await getPostsPromise(user.id);
        console.log('Posts fetched:', posts);
        
        const comments = await getCommentsPromise(posts[0].id);
        console.log('Comments fetched:', comments);
        
        return { user, posts, comments };
    } catch (error) {
        console.log('Error:', error.message);
        throw error;}}



//................... Exercise 2: Parallel vs Sequential execution................


async function SequentialExecution() {

  let start = Date.now();
  const user1 = await fetchUserPromise(1);
  const user2 = await  fetchUserPromise(2);
  const user3 = await fetchUserPromise(3);
  
  
  let end = Date.now();
  console.log(`squentail took ${end-start}ms`)
  return[user1,user2,user3]
}


async function ParallelExcuetion() {

  let start = Date.now();
  const users = await Promise.all([
    fetchUserPromise(1),
    fetchUserPromise(2),
    fetchUserPromise(3)
  ])
 
  let end = Date.now();
  console.log(`parallel took ${end-start}ms`)
  return[users]
}

SequentialExecution()
ParallelExcuetion()