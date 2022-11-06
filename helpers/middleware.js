const prisma = require('./database')
const jwt=require('jsonwebtoken')
const userSession=async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decode=jwt.verify(token, 'secret-code-token')
            const user=await prisma.user.findUnique({
                where:{
                    id: decode.id
                }
            })
            if(user){
                //masukan data user agar bisa diterima di Controller
                req.user={
                    id:user.id,
                    email:user.email,
                }
                next()
            }else{
                res.status(403).send({
                    status: false,
                    error:"Not Autenthicated"
                })
            }
        }catch(error){
            console.error('userSession middleware helpers Errors', error)
            res.status(403).send({
                status:false,
                error:"No Authorize"
            })
        }
    }
    if(!token){
        res.status(401).send({
            status:false,
            error:"No Authorize no token"
        })
    }
}
module.exports=userSession