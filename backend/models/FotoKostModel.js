import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Kost from "./KostModel.js";

const {DataTypes} = Sequelize;
const Foto = db.define('foto_kost',{
   foto_kost:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   url:{
       type: DataTypes.STRING,
       allowNull: false
   }
},
{
freezeTableName: true
});

Kost.hasMany(Foto);
Foto.belongsTo(Kost);

export default Foto;