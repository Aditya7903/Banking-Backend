const express=require('express')

const router=express.Router()

const Customers=require('../Models/customers')
const History=require('../Models/history')
// const data=[
//     {
//         name:'Aditya Kumar',
//         email:'aditya123@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Mohit Kumar',
//         email:'akkim786@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Amit Raj',
//         email:'amitraj@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Rohit Kumar',
//         email:'rohit123@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Abhishek Kesri',
//         email:'abhishek345@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Priyanshu Kumar',
//         email:'priyanshu@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Roshan Kumar',
//         email:'roshan123@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Raju',
//         email:'raju123@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Shyam',
//         email:'shyam123@gmail.com',
//         balance:'10000'
//     },
//     {
//         name:'Babu Rao',
//         email:'baburao@gmail.com',
//         balance:'10000'
//     },

// ]

// router.get('/seed',(req,res)=>{
//     let i;
//     for(i=0;i<data.length;i++)
//     {
//         let dat=new Customers(data[i])

//         dat.save()
//         .then(saved=>{
//             console.log('data saved')
//         })
//         .catch(err=>console.log(err))
//     }
// })

router.get('/customers',(req,res)=>{

    Customers.find({})
    .then(customers=>{
        res.json(customers)
    })
    .catch(err=>console.log(err ))
})

router.get('/customer/:id',(req,res)=>{

    const id =req.params.id;

    Customers.findById(id)
    .then(customerFound=>{
        res.send(customerFound)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/getname',(req,res)=>{

    const {email}=req.body
    Customers.findOne({email:email})
    .then(customer=>{
        console.log(customer)
        res.send(customer)
    })
    .catch(err=>console.log(err))
})

router.post('/transaction',(req,res)=>{

const {sendername,senderemail,receivername,receiveremail,amount}=req.body

Customers.findOne({email:senderemail})
.then(senderfound=>{
   if(senderfound)
   {
    if(parseInt(senderfound.balance)>=parseInt(amount))
    {
        Customers.findOne({email:receiveremail})
        .then(receiverfound=>{
            if(receiverfound)
            {
                let bal1=parseInt(senderfound.balance)-parseInt(amount)
                let bal2=parseInt(receiverfound.balance)+parseInt(amount)
                Customers.findOneAndUpdate({email:senderemail},{balance:bal1})
                .then(senderbalanceupdated=>{
                    Customers.findOneAndUpdate({email:receiveremail},{balance:bal2})
                    .then(receiverupdate=>{
                        console.log(bal1,bal2)
                        const data=new History({
                            sendername:sendername,
                            senderemail:senderemail,
                            receivername:receivername,
                            receiveremail:receiveremail,
                            amount:amount
                        })
                        data.save()
                        .then(historysaved=>{
                            res.send({
                                status:1,
                                message:'Transaction Successfull'
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
                .catch(err=>console.log(err))
            }
            else{
                res.send({
                    status:0,
                    message:'Receiver not found'
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }
    else{
        res.send({
            status:0,
            message:'Insufficient Amount'
        })
    }
   }
   else{
       res,send({
           status:0,
           message:'User Not found'
       })
   }
})
.catch(err=>{
    console.log(err)
})

})



router.get('/history',(req,res)=>{

    History.find({})
    .then(history=>{
        res.send(history)
    })
    .catch(err=>console.log(err))
})




module.exports=router