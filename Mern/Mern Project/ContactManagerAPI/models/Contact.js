import mongoose from "mongoose";
const  contactSchema =new mongoose.Schema({
    name:{type:String,required:[true,'please add a name'],trim:true,maxlength: [50, 'Name cannot be more than 50 characters']},
    email:{type:String,required:[true,'please add a email'],uinque:true,lowercase:true,trim:true,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']},
    phone: {type: String,required: [true, 'Please add a phone number'],match: [/^[0-9]{10,15}$/, 'Please add a valid phone number']},
    address: {type: String,maxlength: [200, 'Address cannot be more than 200 characters']}},
    {timestamps: true  }
)
const Contact = mongoose.model('Contact',contactSchema);
export default Contact;