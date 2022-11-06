const m$auth=require('../modules/auth.module')
const {Router}= require('express')
const response =require('../helpers/response')
const authController = Router()
//http://localhost:8000/api/todo/add
authController.post('/', async (req, res)=>{
    const loginUser= await m$auth.login(req.body)
    response.sendResponse(res, loginUser)
})
module.exports=authController