const db = require("../models");
const User = db.User;

const fetchAllUser = async (req, res) => {
  let users = await User.findAll();
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(200).json({ error: "No users are there in database" });
  }
};

module.exports = { fetchAllUser };
