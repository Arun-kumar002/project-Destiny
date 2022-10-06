const{Schema,model}=require('mongoose')

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
      
    },
    mobile:{
        type:String,
        required:true,
     
    },
    password:{
        type:String,
        required:true,
    },
    udetails:{
        type:[]
    }
    },
    {timestamps:true}
    );


module.exports=model('userDetails',userSchema)