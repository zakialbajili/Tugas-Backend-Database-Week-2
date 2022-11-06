const prisma = require('../helpers/database')
const Joi = require('joi')
const bcrypt= require('bcrypt')
const jwt =require('jsonwebtoken')
class _auth{
    login=async (body)=>{
        try{
            //validation input
            const schema=Joi.object({
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
            //cari user berdasarkan email
            const user=await prisma.user.findFirst({
                where:{
                    email:body.email
                }
            })
            //handle user not found
            if(!user){
                return{
                    status:false,
                    code:404,
                    error:"User not found"
                }
            }
            //handle bcrypt compare
            if(!bcrypt.compareSync(body.password, user.password)){
                return{
                    status:false,
                    code:401,
                    error:"Wrong Password"
                }
            }
            //generate token jwt
            const payload={
                id:user.id,
                password:user.password,
                name:user.name
            }
            const token= jwt.sign(payload, 'secret-code-token', {expiresIn:'8h'})
            return{
                status:true,
                data: {token}
            }
        }catch(error){
            console.log("Login Auth module error", error)
            return{
                status: false,
                error:error.message
            }
        }
    }
}
module.exports= new _auth()