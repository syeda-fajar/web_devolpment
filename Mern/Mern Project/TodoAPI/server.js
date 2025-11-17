import express from 'express';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';


const app =express();
const PORT =3000;

connectDB()
app.use(express.json())

app.use('/api/todos', todoRoutes);  
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo API v1.0',
    status: 'Running ',
    endpoints: {
      getAllTodos: 'GET /api/todos',
      getTodoById: 'GET /api/todos/:id',
      createTodo: 'POST /api/todos',
      updateTodo: 'PUT /api/todos/:id',
      deleteTodo: 'DELETE /api/todos/:id'
    }
  });
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});