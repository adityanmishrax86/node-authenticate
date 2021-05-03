const userRouter = require("express").Router()

userRouter.get("/", require("../controllers/User").getAllUsers);
userRouter.get("/:id", require("../controllers/User").getUserById)
userRouter.post("/",require("../controllers/User").addUser);
userRouter.delete("/:id",require("../controllers/User").deleteUser)
userRouter.put("/:id",require("../controllers/User").updateUser)

module.exports = userRouter;