import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";
import Spesifikasi from "./SpesifikasiModel.js";

const { DataTypes } = Sequelize;

const KostSpesifikasi = db.define(
  "kost_spesifikasi",
  {},
  {
    freezeTableName: true,
  }
);

Kost.belongsToMany(Spesifikasi, { through: KostSpesifikasi });
Spesifikasi.belongsToMany(Kost, { through: KostSpesifikasi });

export default KostSpesifikasi;
