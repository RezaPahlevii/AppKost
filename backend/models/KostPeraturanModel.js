import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";
import Peraturan from "./PeraturanModel.js";

const { DataTypes } = Sequelize;

const KostPeraturan = db.define(
  "kost_peraturan",
  {},
  {
    freezeTableName: true,
  }
);

Kost.belongsToMany(Peraturan, { through: KostPeraturan });
Peraturan.belongsToMany(Kost, { through: KostPeraturan });

export default KostPeraturan;
