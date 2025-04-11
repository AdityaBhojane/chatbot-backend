
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../Model/user.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashedPassword = await argon2.hash(password);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await argon2.verify(user.password, password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, userId:user._id });
  } catch (err) {
    res.status(500).json({ message: "Signin error", error: err.message });
  }
};
