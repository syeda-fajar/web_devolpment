class ApiDataFetcher {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`)

            if (!response.ok) 
                {
                throw new Error(`HTTP Error Status! ${response.status}`)
                }
            const data = await response.json()
            return { success: true, data };
        }
        catch (error) {
            console.error('GET request failed:', error)
            return { success: false, error: error.message }

        }

    }



    async post(endpoint, data) {

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)});

            if (!response.ok) 
                {
                throw new Error(`HTTP Error Status! ${response.status}`)
                }
            const responsedata = await response.json()
            return { success: true, data:responsedata };
        }


        catch (error) {
            console.error('POST request failed:', error)
            return { success: false, error: error.message }
        }
    }






}

const api =  new ApiDataFetcher('https://jsonplaceholder.typicode.com');

  const newPost = {
    title: 'My New Post',
    body: 'This is the content of the post',
    userId: 1,
  };
async function  fetchPOst(){
    const result =await api.post('/posts',newPost)
    if(result.success){
         console.log('Posts:', result.data);} 
    else {
        console.error('Failed to fetch posts:', result.error)
    }
}
fetchPOst()