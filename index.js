const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')

const PORT=process.env.PORT||5000
const app=express();

  mongoose.connect('mongodb://localhost/bankingsystem',{useNewUrlParser: true,useUnifiedTopology: true })
        .then(()=>{
        console.log('databse connected')
        })     
        .catch(()=>{
            console.log(' database not connected')
        });

        app.use(cors())
        app.use(express.json())
        app.use(require('./Routes/Customers'))
app.get('/',(req,res)=>{
    res.send('Welcome to banking system api')
})

app.listen(PORT,(err)=>{
    if(err)
    console.log(err)
    else
    console.log(`Server running on port : 5000`)
})