import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const FasilitasKeamanan = db.define(
  "fasilitas_keamanan",
  {
    f_keamanan: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

export default FasilitasKeamanan;
