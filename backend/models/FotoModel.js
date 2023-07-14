import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";

const {DataTypes} = Sequelize;
const Foto = db.define('foto',{
   foto1:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   foto2:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   foto3:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   foto4:{
       type: DataTypes.STRING,
       allowNull: false,
   },
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