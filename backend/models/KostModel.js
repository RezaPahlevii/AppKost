import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;
const Kost = db.define('kost',{
   uuid:{
       type: DataTypes.STRING,
       defaultValue: DataTypes.UUIDV4,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   name:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
           len: [3, 100]
       }
   },
   price:{
       type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
           notEmpty: true,
           len: [3, 100]
       }
   },
   userId:{
       type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
           notEmpty: true,
           len: [3, 100]
       }
   },
},
{
freezeTableName: true
});

Users.hasMany(Kost);
Kost.belongsTo(Users, {foreignKey: 'userId'});

export default Kost;