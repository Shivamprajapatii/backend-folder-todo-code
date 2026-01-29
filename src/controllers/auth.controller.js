import User from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken, verifyToken } from '../utils/jwt.js';

/* ---------------- REGISTER ---------------- */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password, 10);

    // 4. Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------- LOGIN ---------------- */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    // 2. Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Compare password
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Generate token
    const token = generateToken({ id: user._id });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    next(error);
  }
};

