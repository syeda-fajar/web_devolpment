class StorageManager{
    constructor(prefix='app_'){
        this.prefix=prefix
    }

    set(key,value){
    try{

        const prefixedKey= this.prefix +key
        localStorage.setItem(prefixedKey,JSON.stringify(value))
        return true
    }
    catch(error){
      console.error('Storage set failed:', error);
      return false
    }
}

get(key ,defaultValue=null){
     try{

        const prefixedKey= this.prefix +key
        const item = localStorage.getItem(prefixedKey)
        return item?JSON.parse(item):defaultValue
    }
    catch(error){
      console.error('Storage set failed:', error);
      return defaultValue
    }
}

remove(key) {
    try {
      const prefixedKey = this.prefix + key;
      localStorage.removeItem(prefixedKey);
      return true;
    } catch (error) {
      console.error('Storage remove failed:', error);
      return false;
    }
  }

  clear(){
    try{
      const keys = Object.keys(localStorage)
      keys.forEach(key=>{
        if(key.startsWith(this.prefix)){
            localStorage.removeItem(key)
        }
    })
    return true
    }catch(error){
    console.error('Storage clear failed:', error);
      return false;
    }
  }


    getAllKeys() {
    try {
      const keys = Object.keys(localStorage);
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.substring(this.prefix.length));
    } catch (error) {
      console.error('Get keys failed:', error);
      return [];
    }
}

}

const storage = new StorageManager('myapp_')
storage.set('user',{name:'john',age:30})
storage.set('settings', { theme: 'dark' });
const user =storage.get('user')
console.log(user)
const settings = storage.get('settings', { theme: 'light' });
console.log(storage.getAllKeys()); 