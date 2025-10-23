
const express = require("express");
const { createUser, listUser, updateUser, deleteUser, deleteMultipleUsers } = require("../controllers/UserController");
const router= express.Router();
//create
router.post("/create", createUser);
//list
router.get("/list",listUser)
//update
router.put('/update/:id', updateUser)
//delete
router.delete('/delete/:id', deleteUser)
//deleteMultipleUsers
router.delete('/multipleDelete',deleteMultipleUsers)
module.exports = router;