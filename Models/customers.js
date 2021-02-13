const mongoose=require('mongoose')
const CustomerSchema=new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        require:true
    },
    balance:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('customers',CustomerSchema)