class _response{
    sendResponse = async (res, data)=>{
        try{
            if(data.code){
                res.status(data.code)
                delete data.code

                res.send(data)
                return true
            }
            res.status(data && data.status ? 200:400)
            res.send(data)
            return true
        }catch(error){
            console.error('sendResponse response helpers error', error)
            res.status(400).send(data)
            return false
        }
    }
    errorHandler(err, req, res, next){
        res.status(500).send({
            status:false,
            error:err
        })
    }
}
module.exports= new _response()