const express = require("express");
const router = express.Router();

 
const AdminController = require("../controllers/AdminController");

 
router.get("/:id", AdminController.getByID);

 
router.get("/", AdminController.getAllAdmins);

 
router.post("/", AdminController.addAdmins);

 
router.put("/:id", AdminController.updateAdmin);
 
router.delete("/:id", AdminController.deleteAdmins);

module.exports = router;
