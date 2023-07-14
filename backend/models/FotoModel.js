import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";

const {DataTypes} = Sequelize;
const Foto = db.define('foto',{
   url1:{
       type: DataTypes.STRING,
       allowNull: false
   },
   url2:{
       type: DataTypes.STRING,
       allowNull: false
   },
   url3:{
       type: DataTypes.STRING,
       allowNull: false
   },
   url4:{
       type: DataTypes.STRING,
       allowNull: false
   },
},
{
freezeTableName: true
});

Kost.hasMany(Foto);
Foto.belongsTo(Kost);

export default Foto;