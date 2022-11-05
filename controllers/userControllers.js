const m$user = require('../modules/user.module')
const {Router}= require('express')
const response =require('../helpers/response')
const userController = Router()
//GET
//POST
//PUT
//DELETE
/**
* @param {number} id,
* @param {string} name,
* @param {string} email,
* @param {string} password,
*/

//http://localhost:8000/api/users/add
userController.post('/add', async (req, res)=>{
    const add= await m$user.createUser(req.body)
    response.sendResponse(res, add)
})
//http://localhost:8000/api/users/delete/id
userController.delete('/:id', async (req, res)=>{
    const deleteUser= await m$user.deleteUser(Number(req.params.id))
    response.sendResponse(res, deleteUser)
})
userController.put('/update', async (req, res)=>{
    const updateUser= await m$user.updateUser(req.body)
    response.sendResponse(res, updateUser)
})
//http://localhost:8000/api/users/
userController.get('/', async (req, res)=>{
    const list= await m$user.listUser()
    response.sendResponse(res, list)
})
module.exports=userController