import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";
import FasilitasUmum from "./FasilitasUmumModel.js";

const { DataTypes } = Sequelize;

const KostFasilitasUmum = db.define(
  "kost_fasilitas_umum",
  {},
  {
    freezeTableName: true,
  }
);

Kost.belongsToMany(FasilitasUmum, { through: KostFasilitasUmum });
FasilitasUmum.belongsToMany(Kost, { through: KostFasilitasUmum });

export default KostFasilitasUmum;
