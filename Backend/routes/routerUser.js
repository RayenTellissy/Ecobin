

const express = require('express');
const router = express.Router();
const { login, signUp, getAll, nextSignUp, getUserById,updateUserById, search, reset, changePassword } = require("../controllers/users")

// uploadImage
router.get("/getAll", getAll) // route to retrieve all users
router.put("/updateUser/:id",updateUserById) //update user by id 
router.get("/user/:id", getUserById)
router.get("/search", search)

router.post("/login", login) // login route
router.post("/signup", signUp) // sign up route
router.post("/reset/:email", reset) // resetpassword route
router.post("/changePassword", changePassword)

router.put("/nextSignup", nextSignUp) // 2nd phase of signup route

module.exports = router

