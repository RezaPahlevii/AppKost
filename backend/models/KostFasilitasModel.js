import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kost from "./KostModel.js";
import Fasilitas from "./FasilitasModel.js";

const { DataTypes } = Sequelize;

const KostFasilitas = db.define(
  "kost_fasilitas",
  {
    
  },
  {
    freezeTableName: true,
  }
);

Kost.belongsToMany(Fasilitas, { through: KostFasilitas });
Fasilitas.belongsToMany(Kost, { through: KostFasilitas });

export default KostFasilitas;
