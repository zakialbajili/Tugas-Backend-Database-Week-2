const prisma = require('../helpers/database')
const Joi = require('joi')

class _todo{
    createTodo=async (body)=>{
        try{
            //validation input
            const schema=Joi.object({
                user_id:Joi.number().required(),
                description:Joi.string().required(),
            })
            const validation=schema.validate(body)
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const add = await prisma.todo.create({
                data:{
                    user_id: body.user_id,
                    description:body.description,
                    complete:0
                }
            })
            return{
                status:true,
                data:add
            }
        }
        //validation
        catch(error){
            console.log("createTodo todo module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    listTodo = async(id)=>{
        try{
            const schema=Joi.number().required()
            const validation=schema.validate(id)
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const list = await prisma.todo.findUnique({
                where:{
                    id: id
                }
            })
            return{
                status:true,
                data:list
            }
        }catch(error){
            console.log("ListTodo todo module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    updateTodo = async(id, body)=>{
        try{
            const schema=Joi.number().required()
            const validation=schema.validate(id)
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const update = await prisma.todo.update({
                where:{
                    id:id
                },
                data:{
                    description:body.description,
                }
            })
            return{
                status:true,
                data:update
            }
        }catch(error){
            console.log("updateTodo todo module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    deleteTodo = async(id)=>{
        try{
            const schema=Joi.number().required()
            const validation=schema.validate(id)
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const dlt = await prisma.todo.delete({
                where:{
                    id: id
                }
            })
            return{
                status:true,
                data:dlt
            }
        }catch(error){
            console.log("DeleteUser user module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
}
module.exports= new _todo