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
   nama:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
           len: [3, 100]
       }
   },
   no_hp:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
           len: [9, 15]
       }
   },
   harga:{
       type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   desa:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   alamat:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   jk:{
       type: DataTypes.ENUM ('Putra', 'Putri', 'Campur'),
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   f_kamar:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   peraturan_kost:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   catatan_tambahan:{
       type: DataTypes.TEXT,
       allowNull: false
   },
   foto_kost:{
       type: DataTypes.BLOB,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
   longitude:{
       type: DataTypes.STRING,
       allowNull: false
   },
   latitude:{
       type: DataTypes.STRING,
       allowNull: false
   },
   userId:{
       type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
},
{
freezeTableName: true
});

Users.hasMany(Kost);
Kost.belongsTo(Users, {foreignKey: 'userId'});

export default Kost;