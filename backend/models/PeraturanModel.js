import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";

const { DataTypes } = Sequelize;

const Peraturan = db.define(
  "peraturan_kost",
  {
    peraturan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  },
  {
    freezeTableName: true,
  }
);
Kost.hasMany(Peraturan);
Peraturan.belongsTo(Kost);

export default Peraturan;
