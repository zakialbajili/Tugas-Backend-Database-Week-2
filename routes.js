const userController = require("./controllers/userControllers")
const todoController = require("./controllers/todoControllers")

const _routes=[
    //http://localhost:8000/api/users/
    ['users', userController],
    //http://localhost:8000/api/todo/
    ['todo', todoController]
]
const routes= (app)=>{
    _routes.forEach(router=>{
        const [url, controller] = router
        app.use(`/api/${url}`, controller)
    })
}
module.exports = routes