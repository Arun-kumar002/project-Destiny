const express = require('express')
const multer = require('multer')
const { registerPOST, registerTemplate, loginTemplate, verifyLogin, miniGuide, allphotos, guideModel, profilePage, logout,otp,otppost,forgotpost,forgotget,forgototppost } = require('../controller/userController')
const storage = require('../config/multer');
const {ensureAuthenticated}=require('../helpers/auth_helper')
let upload = multer({ storage });
const router = express.Router()
const bodyparser=require('body-parser')
let urlencoded=bodyparser.urlencoded({extended:false})
const {check,validationResult}=require('express-validator')
const app=express()
app.use(express.json());



//get section
router.get("/register", registerTemplate);
router.get("/login", loginTemplate);
router.get("/profile",ensureAuthenticated, profilePage)
router.get('/miniguide', miniGuide)
router.get('/logout',logout)
router.get('/otp',otp)
router.post('/otp',otppost)
router.get('/forgot',forgotget)
router.post('/forgot',forgotpost)
router.post('/forgototppost',forgototppost)


//post section
router.post("/register",urlencoded,[
    check('username','Username,').isLength({min:5}),
    check('email','Email,').isEmail(), 
    check('password','Password,') .isLength({min:5}),
    check('confirmpassword','Details....') .isLength({min:5}),
],registerPOST);
// router.route("/register").post(registerPOST);
router.route("/login").post(verifyLogin)
// router.post('/miniguide', upload.any(['pictures', "pic1", "pic2", "pic3", "pic4", "pic5", "pic6"]), miniGuidepost)
router.get('/allphotos', allphotos)
router.get("/:id", guideModel);

module.exports = router;



