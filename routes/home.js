const homeRouter = require("express").Router()

homeRouter.get("/", (req, res) => {
    res.render("index.html");
})

module.exports = homeRouter;