const adminSchema=require('../Model/Admin')
const {connect}=require('mongoose')
/*@http get method 
@access public
@url/movies/get-movies
*/
let addService=(req,res)=>{
    res.render('admins/addservice')
}
let searchservice=async(req,res)=>{
    res.render('admins/searchservice')
}
let deleteget=async(req,res)=>{
    res.render('admins/removeservice')
}
/*@http post method 
@access private
@url/movies/create-movies
*/
let createService=async(req,res)=>{
   let{busname,startduration,endduration,totalduration,startlocation,endlocation,price,drivername,drivernumber,class1,travelid,seats}=req.body;
   let payload={busname,startduration,endduration,totalduration,startlocation,endlocation,price,drivername,drivernumber,travelid,class1,seats}
   await new adminSchema(payload).save()
console.log(payload)
   res.render('home')
}
let searchPost=async(req,res)=>{
    let {travelid}=req.body;
   let service= await adminSchema.findOne({travelid}).lean()
   console.log(service);
    res.render('admins/updateservice',{service})
}

/*@http put method 
@access private
@url/movies/update-movies/:id
*/
let updateService=async(req,res)=>{
    let{busname,startduration,endduration,totalduration,startlocation,endlocation,price,drivername,drivernumber,class1,travelid}=req.body;
   let payload={busname,startduration,endduration,totalduration,startlocation,endlocation,price,drivername,drivernumber,travelid,class1}
   await adminSchema.updateOne({travelid:travelid},{$set:payload})
   res.end('db updated')
}


/*@http delete method 
@access private
@url/movies/delete-movies/:id
*/

let deleteService=async(req,res)=>{
    let {travelid}=req.body;
    await adminSchema.remove({travelid})
    res.end('service removed')
}


module.exports={addService,createService,searchservice,deleteget,searchPost,updateService,deleteService}