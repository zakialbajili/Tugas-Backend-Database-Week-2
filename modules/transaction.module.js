const prisma = require('../helpers/database')
const Joi = require('joi')

class _transaction{
    createTransaction=async (body)=>{
        try{
            //validation input
            const schema=Joi.object({
                user_id:Joi.number().required(),
                description:Joi.string().required(),
                amount:Joi.number().required(),
            }).options({abortEarly: false })
            const validation=schema.validate(body, {convert: false})
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const add = await prisma.transaction.create({
                data:{
                    user_id: body.user_id,
                    description:body.description,
                    amount:body.amount
                }
            })
            return{
                status:true,
                code:201,
                data:add
            }
        }
        //validation
        catch(error){
            console.log("createTransaction transaction module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    listTransaction = async(body)=>{
        try{
             //validation input
             const schema=Joi.object({
                user_id:Joi.number().required()
            }).options({abortEarly: false })
            const validation=schema.validate(body, {convert: false})
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const list = await prisma.transaction.findMany({
                where:{
                    user_id:body.user_id
                }
            })
            return{
                status:true,
                data:list
            }
        }catch(error){
            console.log("ListTransaction transaction module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    updateTransaction = async(body)=>{
        try{
            const schema=Joi.object({
                user_id:Joi.number().required(),
                id:Joi.number(),
                description:Joi.string(),
                amount:Joi.number()
            }).options({abortEarly: false })
            const validation=schema.validate(body, {convert: false})
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const transaction=await prisma.transaction.findMany({
                where:{
                    user_id: body.user_id
                }
            })
            if(transaction){
                const update = await prisma.transaction.update({
                    where:{
                        id:body.id    
                    },
                    data:{
                        description:body.description,
                        amount:body.amount
                    }
                })
                return{
                    status:true,
                    data:update
                }                
            }
        }catch(error){
            console.log("updateTransaction transaction module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
    deleteTransaction = async(body)=>{
        try{
            const schema=Joi.object({
                user_id:Joi.number().required(),
                id:Joi.number().required(),
            }).options({abortEarly: false })
            const validation=schema.validate(body, {convert: false})
            if(validation.error){
                const errorDetails=validation.error.details.map(detail=>detail.message)
                return{
                    status:false,
                    code:422,
                    error:errorDetails.join(',')
                }
            }
            const transaction=await prisma.transaction.findMany({
                where:{
                    user_id: body.user_id
                }
            })
            if(transaction){
                const dlt = await prisma.transaction.delete({
                    where:{
                        id: body.id
                    }
                })
                return{
                    status:true,
                    data:dlt
                }
            }
        }catch(error){
            console.log("DeleteTransaction transaction module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
}
module.exports= new _transaction()