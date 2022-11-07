const m$transaction= require('../modules/transaction.module')
const {Router}= require('express')
const response =require('../helpers/response')
const userSession =require('../helpers/middleware')
const transactionController = Router()

//http://localhost:8000/api/todo/add
transactionController.post('/add', userSession, async (req, res)=>{
    const add= await m$transaction.createTransaction({
        user_id:req.user.id,
        description: req.body.description,
        amount: req.body.amount
    })
    response.sendResponse(res, add)
})
//http://localhost:8000/api/todo/:id
transactionController.get('/list', userSession, async (req, res)=>{
    const list= await m$transaction.listTransaction({user_id:req.user.id})
    response.sendResponse(res, list)
})
transactionController.put('/update', userSession, async (req, res)=>{
    const update= await m$transaction.updateTransaction({
        user_id:req.user.id,
        id:req.body.id,
        description:req.body.description,
        amount: req.body.amount
    },)
    response.sendResponse(res, update)
})
transactionController.delete('/delete/:id', userSession, async (req, res)=>{
    const dlt= await m$transaction.deleteTransaction({
        user_id:req.user.id,
        id: Number(req.params.id)
    })
    response.sendResponse(res, dlt)
})
module.exports =transactionController