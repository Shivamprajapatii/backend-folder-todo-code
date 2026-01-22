import User from '../models/user.model.js';

/* ---------------- CREATE USER ---------------- */
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body; 
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email, and password are required',
      });
    }    
    const user = await User.create({
      username,
      email,        
      password,
    });

    res.status(201).json({
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json({
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        next(error);
    }
}