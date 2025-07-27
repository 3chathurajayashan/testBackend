const express = require("express");
const router = express.Router();

//insert model
const User = require("../models/userModel");
const UserController = require("../controllers/UserController");

router.get("/:id", UserController.getByID);
router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.put("/:id", UserController.updateUser);
 router.delete("/:id", UserController.deleteUsers);

//exports
module.exports = router;