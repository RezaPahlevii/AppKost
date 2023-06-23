import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Users from "./UserModel.js";
import Kost from "./KostModel.js";

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
    kostId: {
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

Kost.hasMany(TipeKost);
TipeKost.belongsTo(Kost, { foreignKey: "kostId" });

export default TipeKost;
