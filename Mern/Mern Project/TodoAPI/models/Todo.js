import mongoose from "mongoose";
const Todoschema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please add a title '],
        trim:true,
        minlength:[3, 'Title must be at least 3 characters'],
        maxlength:[100, 'Title cannot exceed 100 characters']
    },
    description:{
        type:String,
        trim:true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status:{
        type:String,
        enum:
        {
         values:['pending','Inprogress','Completed'],
         message:'{VALUE} is not a valid string'
        },
        default:'pending'
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid priority'
      },
      default: 'medium'
    }
},
{
    timestamps: true
  }
)
const Todo = mongoose.model('Todo', Todoschema);

export default Todo