import mongoose from "mongoose";
const connectDB = async () => {
 try{
  const conn = await mongoose.connect('mongodb://localhost:27017/contactsDB')
  console.log(`MongoDB Connected: ${conn.connection.host}`);
  console.log(` Database: ${conn.connection.name}`);

 }  
 catch(error){
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); 
 }
};
export default connectDB;