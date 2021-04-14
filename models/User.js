const { Sequelize, DataTypes } = require("sequelize");
const {sequelize} = require("./index");

const User = sequelize.define('User',{
    //Model Attributes
    id:{
      type:DataTypes.UUID,
        defaultValue:Sequelize.UUIDV4
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname: {
        type:DataTypes.STRING
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    }
},{})