// const Users = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

const JWT_SECRET = process.env.JWT_SECRET || "yoursecret";


// exports.register = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password ) {
//       return res.status(400).json({ error: "All fields required" });
//     }

//     const existing = await Users.findOne({ username });
//     if (existing) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // No need to hash password manually — pre-save hook does it
//     const newUser = await Users.create({ username, password });

//     res.json({ message: "User registered", users: newUser });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const users = await User.findOne({ email: username }).populate("role");
    if (!users) return res.status(400).json({ error: "Invalid credentials" });

    // const isMatch = await bcrypt.compare(password, users.password);

    if (users.password===password) {

    const token = jwt.sign({ id: users._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({status:200, token,users });
  }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
