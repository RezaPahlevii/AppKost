import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const FasilitasUmum = db.define(
  "fasilitas_umum",
  {
    f_umum: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

export default FasilitasUmum;
