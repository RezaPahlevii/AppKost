import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from './KostModel.js'

const {DataTypes} = Sequelize;
const Detail_Kost = db.define('detail_kost',{
   uuid:{
       type: DataTypes.STRING,
       defaultValue: DataTypes.UUIDV4,
       allowNull: false,
       validate:{
           notEmpty: true
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
   gender:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true
       }
   },
  fasilitas_kamar:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  spesifikasi_kamar:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  fasilitas_kamar_mandi:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  fasilitas_umum:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  fasilitas_parkir:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  peraturan_kost:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  cerita_pemilik:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  catatan_tambahan:{
       type: DataTypes.STRING,
       allowNull: false,
   },
  maps:{
       type: DataTypes.STRING,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
  foto_kost:{
       type: DataTypes.BLOB,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
   kostId:{
       type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
           notEmpty: true,
       }
   },
},
{
freezeTableName: true
});

Kost.hasMany(Detail_Kost);
Detail_Kost.belongsTo(Kost, {foreignKey: 'kostId'});

export default Detail_Kost;