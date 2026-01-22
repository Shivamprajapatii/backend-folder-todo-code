import Todo from '../models/todo.model.js';

/* ---------------- CREATE TODO ---------------- */
export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Title is required',
      });
    }

    const todo = await Todo.create({
      title,
      description,
      user: req.user.id, // from auth middleware
    });

    res.status(201).json({
      message: 'Todo created successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------- GET ALL TODOS ---------------- */
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------- GET TODO BY ID ---------------- */
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------- UPDATE TODO ---------------- */
export const updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      message: 'Todo updated successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------- DELETE TODO ---------------- */
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
