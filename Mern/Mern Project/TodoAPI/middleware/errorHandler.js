export const  errorHandler =(err,req,res,next)=>{
     console.error('Error:', err.message);
     let statusCode =500;
     let message = err.message || 'Server Error';
     if(err.name=== 'ValidationError'){
        statusCode =400
        message = Object.values(err.errors).map(e=>e.message).join(', ')
     }
   
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
  }
  

  if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }
  
  res.status(statusCode).json({
    success: false,
    message: message
  });
}