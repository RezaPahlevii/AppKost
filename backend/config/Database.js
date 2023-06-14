// import { Sequelize } from "sequelize";
const { Sequelize } = require('sequelize')

const db = new Sequelize('u1563728_kost_db', 'u1563728_admin', '8VQS=SX$HF?r', {
    host: "api.bengkaliskost.com",
    dialect: "mysql"
});

module.exports = db;