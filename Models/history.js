const mongoose=require('mongoose')
const HistorySchema=new mongoose.Schema({
    sendername:{
        type:String
    },
    senderemail:{
        type:String
    },
    receivername:{
        type:String
    },
    receiveremail:{
        type:String
    },
    amount:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model('history',HistorySchema)