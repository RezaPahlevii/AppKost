import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";

const {DataTypes} = Sequelize;
const Foto = db.define('foto',{
   url1:{
       type: DataTypes.STRING
   },
   url2:{
       type: DataTypes.STRING
   },
   url3:{
       type: DataTypes.STRING
   },
   url4:{
       type: DataTypes.STRING
   },
},
{
freezeTableName: true
});

Kost.hasMany(Foto);
Foto.belongsTo(Kost);

export default Foto;