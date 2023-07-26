import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";
import FasilitasKeamanan from "./FasilitasKeamananModel.js";

const { DataTypes } = Sequelize;

const KostFasilitasKeamanan = db.define(
  "kost_fasilitas_keamanan",
  {},
  {
    freezeTableName: true,
  }
);

Kost.belongsToMany(FasilitasKeamanan, { through: KostFasilitasKeamanan });
FasilitasKeamanan.belongsToMany(Kost, { through: KostFasilitasKeamanan });

export default KostFasilitasKeamanan;
