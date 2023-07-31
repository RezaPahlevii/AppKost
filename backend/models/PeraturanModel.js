import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";

const { DataTypes } = Sequelize;

const Peraturan = db.define(
  "peraturan",
  {
    peraturan: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

export default Peraturan;
