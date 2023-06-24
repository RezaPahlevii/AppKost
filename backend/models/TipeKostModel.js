import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";
import Users from "./UserModel.js";
// import Users from "./UserModel.js";
// import Kost from "./KostModel.js";

const { DataTypes } = Sequelize;
const TipeKost = db.define(
  "tipe_kamar",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    f_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    f_umum: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    peraturan_kost: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    catatan_tambahan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    foto_kost: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jumlah_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ukuran_kamar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        
      },
    },
  },
  {
    freezeTableName: true,
  }
);

  // // Definisikan relasi antara TipeKost dan Users
  // Users.hasMany(TipeKost, { foreignKey: "userId" });
  // TipeKost.belongsTo(Users, { foreignKey: "userId" });
  // Kost.hasMany(TipeKost, { foreignKey: "kostId" });
  // TipeKost.belongsTo(Kost, { foreignKey: "kostId" });

  // // Fungsi beforeCreate untuk mengatur nilai userId dengan ID user
  // TipeKost.beforeCreate(async (tipeKost, options) => {
  //   // Ambil user yang membuat tipe kost
  //   const user = await Users.findByPk(tipeKost.userId);

  //   if (user && user.id) {
  //     tipeKost.userId = user.id; // Mengatur nilai userId dengan ID user
  //   } else {
  //     throw new Error("User tidak valid");
  //   }
  //   console.log('User ID:', tipeKost.userId);

  //   return tipeKost;
  // });


Users.hasMany(TipeKost);
TipeKost.belongsTo(Users, { foreignKey: 'userId' });

export default TipeKost;
