const express = require("express");
const adminControl = require("../controllers/adminController");
const router = express.Router();

router.get("/fetchalluser", [], adminControl.fetchAllUser);

module.exports = router;
