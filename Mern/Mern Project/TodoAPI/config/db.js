import mongoose  from "mongoose";
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/todoDB')
        console.log(`Mongodb Connected : ${conn.connection.host}`)
        console.log(`Database :${conn.connection.name}`)

    }
    catch(error){
    console.error(`Error: ${error.message}`);
    process.exit(1);
    }
}
export default connectDB;