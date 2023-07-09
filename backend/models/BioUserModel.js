import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;
const Bio = db.define('biodata',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    jk:{
        type: DataTypes.ENUM('Laki-laki','Perempuan'),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    umur:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    NoWA:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    asal:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    
 },
 {
freezeTableName: true
 });
 Users.hasMany(Bio);
 Bio.belongsTo(Users, {foreignKey: 'userId'});
 
 export default Bio;