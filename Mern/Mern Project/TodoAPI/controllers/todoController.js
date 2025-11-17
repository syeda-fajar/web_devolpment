import Todo from "../models/todo.js";
export const getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        })
    }
    catch (error) {
        next(error)
    }
}
export const getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            const error = new Error('Todo Not found');
            error.statusCode = 404;
            next(error)
        }
        res.status(200).json({
            success: true,
            data: todo
        });
    }
    catch (error) {
        next(error)
    }
}

export const createTodo = async (req, res, next) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json({
            success: true,
            data: todo
        })
    }
    catch (error) {
        next(error);
    }

}
export const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!todo) {
            const error = new Error('Todo not found');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            success: true,
            data: todo
        })
    }
    catch (error) {
        next(error);
    }
}
export const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            const error = new Error('Todo not found');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: todo
        });
    } catch (error) {
        next(error);
    }
};