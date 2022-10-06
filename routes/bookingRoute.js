const express=require('express')
const multer=require('multer')
const {paymentdonate,donatepaymentPost}=require('../controller/bookingController')
const storage=require('../config/multer');
const router=express.Router()

//get 
// router.get('/payments',paymentPage)
// router.post('/payments',donatepaymentPost)

router.get('/paymentdonate',paymentdonate)
router.post('/paymentdonate',donatepaymentPost)

module.exports=router;