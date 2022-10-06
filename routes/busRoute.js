const express=require('express')
const multer=require('multer')
const storage=require('../config/multer');
const router=express.Router()
const {ensureAuthenticated}=require('../helpers/auth_helper')
const {bookingPage, busPage, getbookingPage, seatPage, fareDetails, busDetailPage, busDetailPage1, busDetailPage2, transactionPage, filterPage} = require("../controller/busController")


//get 
router.get('/bookings',ensureAuthenticated,bookingPage)
router.get('/buspage',busPage)
router.get('/busdetailpage',busDetailPage)
router.get('/busdetailpage1',busDetailPage1)
router.get('/busdetailpage2',busDetailPage2)
router.get('/status',transactionPage)

// post request
router.route('/bookings').post(getbookingPage)
router.route('/filterPage').post(filterPage)
router.route('/buspage/:id').post(seatPage)
router.route('/confirmationpage').post(fareDetails)


module.exports=router;
