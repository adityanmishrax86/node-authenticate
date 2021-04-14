const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
    process.env.PG_DATABASE,
    process.env.PG_USERNAME,
    process.env.PG_PASSWORD,
    {
        host:'localhost',
        dialect:"postgres"
    })

sequelize.authenticate()
    .then(() => console.log("Database connection Successful"))
    .catch((e) => console.error("Errors in Connection!",e));

sequelize.sync({
    force:true
})

module.exports = { sequelize };