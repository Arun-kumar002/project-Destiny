const{Schema,model}=require('mongoose')
let adminSchema=new Schema({
    busname:{
        type:String,
        required:true
    },
    startduration:{
        type:String,
        required:true
    },
    endduration:{
        type:String,
        required:true
    },
    totalduration:{
        type:String,
        required:true
    },
    startlocation:{
        type:String,
        required:true
    },
    endlocation:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    drivername:{
        type:String,
        required:true
    },
    drivernumber:{
        type:String,
        required:true
    },
    travelid:{
        type:String,
        required:true,
        Unique:true,
    },
    class1:{
        type:String,
        required:true
    },
    seats:{
        type:[]
    }
})



module.exports=model('admin',adminSchema)