const prisma = require('../helpers/database')
const Joi = require('joi')
const bcrypt= require('bcrypt')
class _user{
    createUser=async (body)=>{
        try{
            //validation input
            const schema=Joi.object({
                name:Joi.string().required(),
                email:Joi.string().required(),
                password:Joi.string().required(),
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
            const password=bcrypt.hashSync(body.password, 10)
            console.log(body.password, password)
            const add=await prisma.user.create({
                data:{
                    name: body.name,
                    email:body.email,
                    password:password
                }
            })
            return{
                status:true,
                data:add
            }
        }
        //validation
        catch(error){
            console.log("createUser user module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    listUser = async()=>{
        try{
            const list = await prisma.user.findMany()
            return{
                status:true,
                data:list
            }
        }catch(error){
            console.log("listUser user module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    deleteUser = async(id)=>{
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
            const dltUser = await prisma.user.delete({
                where:{
                    id: id
                }
            })
            return{
                status:true,
                data:dltUser
            }
        }catch(error){
            console.log("DeleteUser user module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    updateUser = async(body)=>{
        try{
            const schema=Joi.object({
                id:Joi.number().required(),
                name:Joi.string(),
                email:Joi.string(),
                password:Joi.string(),
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

            const update = await prisma.user.update({
                where:{
                    id:body.id
                },
                data:{
                    name:body.name,
                    email:body.email,
                    password:body.password
                }
            })
            return{
                status:true,
                data:update
            }
        }catch(error){
            console.log("updateUser user module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
}
module.exports= new _user()