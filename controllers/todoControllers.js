const m$todo = require('../modules/todo.module')
const {Router}= require('express')
const response =require('../helpers/response')
const todoController = Router()

//http://localhost:8000/api/todo/add
todoController.post('/add', async (req, res)=>{
    const add= await m$todo.createTodo(req.body)
    response.sendResponse(res, add)
})
//http://localhost:8000/api/todo/:id
todoController.get('/list/:id', async (req, res)=>{
    const list= await m$todo.listTodo(Number(req.params.id))
    response.sendResponse(res, list)
})
todoController.put('/update/:id', async (req, res)=>{
    const update= await m$todo.updateTodo(Number(req.params.id),req.body)
    response.sendResponse(res, update)
})
todoController.delete('/delete/:id', async (req, res)=>{
    const dlt= await m$todo.deleteTodo(Number(req.params.id))
    response.sendResponse(res, dlt)
})
module.exports =todoController