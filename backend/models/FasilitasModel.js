import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Kost from "./KostModel.js";

const { DataTypes } = Sequelize;

const Fasilitas = db.define(
  "fasilitas",
  {
    nama_f: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);
// Kost.hasMany(Fasilitas);
// Fasilitas.belongsTo(Kost);

export default Fasilitas;
