const User = require("../../Models/User/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ firstName, lastName, username, email, password: hashedPassword, role });
  await user.save();
  res.status(201).send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, "secret");
  res.send({ token });
};

exports.getUserInfo = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.send(user);
};
