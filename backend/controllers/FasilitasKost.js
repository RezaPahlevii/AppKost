// import { Op } from "sequelize";
// import Users from "../models/UserModel.js";
// import Fasilitas from "../models/FasilitasModel.js";
// import Kost from "../models/KostModel.js";

// export const getFasilitas = async (req, res) => {
//     try {
//       let response;
//       if (req.role === "admin") {
//         response = await Fasilitas.findAll({
//           attributes: ["uuid", "nama_f"],
//           include: [
//             {
//               model: Users,
//               attributes: ["name", "email"],
//             },
//             {
//               model: Kost,
//               attributes: ["nama", "harga"],
//             }
//           ],
//         });
//       } else {
//         response = await Fasilitas.findAll({
//           attributes: ["uuid", "nama_f"],
//           where: {
//             userId: req.userId,
//           },
//           include: [
//             {
//               model: Users,
//               attributes: ["name", "email"],
//             },
//           ],
//         });
//       }
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };

//   export const getFasilitasById = async (req, res) => {
//     try {
//       const fasilitas = await Fasilitas.findOne({
//         where: {
//           uuid: req.params.id,
//         },
//       });
//       if (!fasilitas) return res.status(404).json({ msg: "Data tidak ditemukan" });
//       let response;
//       if (req.role === "admin") {
//         response = await Fasilitas.findOne({
//           attributes: ["uuid", "nama_f"],
//           where: {
//             id: fasilitas.id,
//           },
//           include: [
//             {
//               model: Users,
//               attributes: ["name", "email"],
//             },
//           ],
//         });
//       } else {
//         response = await Fasilitas.findOne({
//           attributes: ["uuid", "nama_f"],
//           where: {
//             [Op.and]: [{ id: fasilitas.id }, { userId: req.userId }],
//           },
//           include: [
//             {
//               model: Users,
//               attributes: ["name", "email"],
//             },
//           ],
//         });
//       }
//       res.status(200).json(response);
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };

//   export const createFasilitas = async (req, res) => {
//     const {nama_f} = req.body;
//     try {
//       await Fasilitas.create({nama_f, userId: req.userId, kostId: req.kostId});
//       res.status(201).json({ msg: "Berhasil menambahkan fasilitas" });
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };

//   export const updateFasilitas = async (req, res) => {
//     try {
//       const fasilitas = await Fasilitas.findOne({
//         where: {
//           uuid: req.params.id,
//         },
//       });
//       if (!fasilitas) return res.status(404).json({ msg: "Data tidak ditemukan" });
//       const { nama_f } = req.body;
//       if (req.role === "admin") {
//         await Fasilitas.update(
//           { nama_f },
//           {
//             where: {
//               id: fasilitas.id,
//             },
//           }
//         );
//       } else {
//         if (req.userId !== fasilitas.userId)
//           return res.status(403).json({ msg: "Akses terlarang" });
//         await Fasilitas.update(
//           { nama_f },
//           {
//             where: {
//               [Op.and]: [{ id: fasilitas.id }, { userId: req.userId }],
//             },
//           }
//         );
//       }
//       res.status(200).json({ msg: "Berhasil update fasilitas" });
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };

//   export const deleteFasilitas = async (req, res) => {
//     try {
//       const fasilitas = await Fasilitas.findOne({
//         where: {
//           uuid: req.params.id,
//         },
//       });
//       if (!fasilitas) return res.status(404).json({ msg: "Data tidak ditemukan" });
//       const { nama_f } = req.body;
//       if (req.role === "admin") {
//         await Fasilitas.destroy({
//           where: {
//             id: fasilitas.id,
//           },
//         });
//       } else {
//         if (req.userId !== fasilitas.userId)
//           return res.status(403).json({ msg: "Akses terlarang" });
//         await Fasilitas.destroy({
//           where: {
//             [Op.and]: [{ id: fasilitas.id }, { userId: req.userId }],
//           },
//         });
//       }
//       res.status(200).json({ msg: "Berhasil delete fasilitas" });
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };

//   export const tambahFasilitas = async (req, res) => {
//     try {
//       // Mendapatkan data yang dibutuhkan dari request (misalnya: nama_f dan kostId)
//       const { nama_f, kostId } = req.body;
  
//       // Membuat data fasilitas dengan nilai kostId yang sesuai
//       const fasilitas = await Fasilitas.create({
//         nama_f,
//         kostId,
//       });
  
//       // Mengirim response sukses
//       res.status(201).json({ message: "Fasilitas berhasil ditambahkan", fasilitas });
//     } catch (error) {
//       // Mengirim response jika terjadi error
//       res.status(500).json({ message: "Terjadi kesalahan saat menambahkan fasilitas", error });
//     }
//   };