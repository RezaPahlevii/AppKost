import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Spesifikasi = db.define(
  "spesifikasi",
  {
    spesifikasi: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

export default Spesifikasi;
