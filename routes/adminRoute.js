const express=require('express')
const multer=require('multer')
const {addService,createService,searchservice,deleteget,searchPost,updateService,deleteService}=require('../controller/adminController');
const storage=require('../config/multer');
const router=express.Router()

//get request
router.get('/addService',addService)
router.get('/searchservice',searchservice)
router.get('/deleteService',deleteget)
//post request
router.post('/createService',createService)
router.post('/searchservice',searchPost)
router.post('/updateService',updateService)
router.post('/deleteService',deleteService)

router.get('/admin',async(req,res)=>{
    res.render('admins/admin')
})



module.exports=router;
