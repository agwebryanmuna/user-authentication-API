import validator from "validator";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = async (id, email) =>
  jwt.sign({ id, email }, process.env.SECRET);

// ------ Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required." });

    if (username.length < 4)
      return res
        .status(400)
        .json({ message: "Username too short. Must be 4+ characters." });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({ message: "Password not strong enough" });

    const exist = await User.findOne({ where: { email } });
    if (exist)
      return res
        .status(400)
        .json({ message: "User already exist with this email" });

    // hash user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // create token for user
    const token = await createToken(user.id, user.email);

    res.status(201).json({ message: "User added to database", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// -------- Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required." });

    // get user from db using email
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const veryfyPassword = await bcrypt.compare(password, user.password);

    if (!veryfyPassword)
      return res.status(401).json({ message: "Password incorrect." });

    // create token for user
    const token = await createToken(user.id, user.email);

    res.status(201).json({ message: "User verified.", token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// -------- Update user
const updateUser = async (req, res) => {
  try {
    const { email, password, username, update } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const veryfyPassword = await bcrypt.compare(password, user.password);

    if (!veryfyPassword)
      return res.status(401).json({ message: "Password incorrect." });

    if (update.email && update.email !== email) {
      exist = await User.findOne({ where: { email: update.email } });
      if (exist)
        return res
          .status(400)
          .json({ message: "User already exists with the new email" });

      if (!validator.isEmail(email))
        return res.status(400).json({ message: "Invalid email" });

      user.email = update.email;
    }

    if (update.username && update.username !== username) {
      user.username = username;
    }

    if (update.password && update.password !== password) {
      if (!validator.isStrongPassword(update.password))
        return res
          .status(400)
          .json({ message: "New password not strong enough" });
      user.password = await bcrypt.hash(update.password, 10);
    }

    await user.save();

    res.status(200).json({ message: "User updated", data: user.email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// --------- Delete user
const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found." });

    const veryfyPassword = await bcrypt.compare(password, user.password);

    if (!veryfyPassword)
      return res.status(401).json({ message: "Password incorrect." });
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export { registerUser, loginUser, updateUser, deleteUser };
