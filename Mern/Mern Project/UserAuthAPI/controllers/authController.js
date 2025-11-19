
import user from "../models/user.js";
import jwt from "jsonwebtoken";
export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "please privide all feilds"
      })
    }
    const userExists = await user.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }
    const User = await user.create({
      name,
      email,
      password
    })
    res.status(201).json({
      success: true,
      message: "User Created Sucessfuly",
      data: {
        id: User._id,
        name: User.name,
        email: User.email,
        role: User.role,
        createdAt: User.createdAt
      }

    })
  }
  catch (error) {

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages
      });
    }


    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

export const login = async (req, res) => {

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const User = await user.findOne({ email })
    if (!User) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const isMatch = await User.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    const token = jwt.sign(
      { id: User._id },
        process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: User._id,
        name: User.name,
        email: User.email,
        role: User.role
      }
    });
  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

