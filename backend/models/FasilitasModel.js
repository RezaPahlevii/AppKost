// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";
// import Kost from "./KostModel.js";
// import Users from "./UserModel.js";

// const { DataTypes } = Sequelize;

// const Fasilitas = db.define(
//   "fasilitas",
//   {
//     uuid:{
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate:{
//             notEmpty: true
//         }
//     },
//     nama_f: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       }
//     }
//   },
//   {
//     freezeTableName: true,
//   }
// );

// // Kost.belongsToMany(Fasilitas, {
// //   through: "kost_fasilitas",
// //   foreignKey: "kostId",
// // });
// // Fasilitas.belongsToMany(Kost, {
// //   through: "kost_fasilitas",
// //   foreignKey: "fasilitasId",
// // });

// Kost.hasMany(Fasilitas);
// Fasilitas.belongsTo(Kost);
// // Relasi One-to-Many antara Users dan Fasilitas
// Users.hasMany(Fasilitas);
// Fasilitas.belongsTo(Users, { foreignKey: "userId" });

// export default Fasilitas;
