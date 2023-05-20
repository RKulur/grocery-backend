const router = require("express").Router();
const userAuth = require('../Middleware/userAuth')
const {
  Register,
  Login,
  GetGroceries,
} = require("../Controller/user_controller");

router.post("/register", Register);
router.post("/login", Login);

router.get("/groceries",userAuth, GetGroceries);
router.get("/grocery/:id",userAuth, GetGroceries);

module.exports = router;
