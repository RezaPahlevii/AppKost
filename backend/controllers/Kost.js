import Kost from "../models/KostModel.js";
import Users from "../models/UserModel.js";
// import Fasilitas from "../models/FasilitasModel.js";
import { Op } from "sequelize";
// import path from "path";

export const getKost = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "f_kamar",
          "peraturan_kost",
          "catatan_tambahan",
          "foto_kost",
          "kordinat"
        ],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "f_kamar",
          "peraturan_kost",
          "catatan_tambahan",
          "foto_kost",
          "kordinat"
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKostById = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Kost.findOne({
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "f_kamar",
          "peraturan_kost",
          "catatan_tambahan",
          "foto_kost",
          "kordinat"
        ],
        where: {
          id: kost.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Kost.findOne({
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "f_kamar",
          "peraturan_kost",
          "catatan_tambahan",
          "foto_kost",
          "kordinat"
        ],
        where: {
          [Op.and]: [{ id: kost.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const createKost = async (req, res) => {
//   const {
//     nama,
//     no_hp,
//     harga,
//     desa,
//     alamat,
//     jk,
//     f_kamar,
//     peraturan_kost,
//     catatan_tambahan,
//     longitude,
//     latitude,
//   } = req.body;
  
//   try {
//     if (req.file === null) {
//       return res.status(400).json({ msg: "No File Uploaded" });
//     }
    
//     const file = req.file;
//     const fileSize = file.size;
//     const ext = path.extname(file.originalname);
//     const allowedTypes = ['.png', '.jpg', '.jpeg'];
    
//     if (!allowedTypes.includes(ext.toLowerCase())) {
//       return res.status(422).json({ msg: "Foto harus dalam format PNG, JPG, atau JPEG" });
//     }
    
//     if (fileSize > 5 * 1024 * 1024) {
//       return res.status(422).json({ msg: "Ukuran foto harus kurang dari 5 MB" });
//     }
    
//     const fileName = `${Date.now()}${ext}`;
//     const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
    
//     file.mv(`public/images/${fileName}`, async (err) => {
//       if (err) {
//         return res.status(500).json({ msg: err.message });
//       }
      
//       try {
//         await Kost.create({
//           nama,
//           no_hp,
//           harga,
//           desa,
//           alamat,
//           jk,
//           f_kamar,
//           peraturan_kost,
//           catatan_tambahan,
//           foto_kost: fileName,
//           longitude,
//           latitude,
//           userId: req.userId,
//         });
//         res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
//       } catch (error) {
//         res.status(500).json({ msg: error.message });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const createKost = async (req, res) => {
  const {
    nama,
    no_hp,
    harga,
    desa,
    alamat,
    jk,
    f_kamar,
    peraturan_kost,
    catatan_tambahan,
    foto_kost,
    kordinat
  } = req.body;
  try {
    await Kost.create({
      nama: nama,
      no_hp: no_hp,
      harga: harga,
      desa: desa,
      alamat: alamat,
      jk: jk,
      f_kamar: f_kamar,
      peraturan_kost: peraturan_kost,
      catatan_tambahan: catatan_tambahan,
      foto_kost: foto_kost,
      kordinat: kordinat,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateKost = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      nama,
      no_hp,
      harga,
      desa,
      alamat,
      jk,
      f_kamar,
      peraturan_kost,
      catatan_tambahan,
      foto_kost,
      kordinat
    } = req.body;
    if (req.role === "admin") {
      await Kost.update(
        {
          nama,
          no_hp,
          harga,
          desa,
          alamat,
          jk,
          f_kamar,
          peraturan_kost,
          catatan_tambahan,
          foto_kost,
          kordinat
        },
        {
          where: {
            id: kost.id,
          },
        }
      );
    } else {
      if (req.userId !== kost.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Kost.update(
        {
          nama,
          no_hp,
          harga,
          desa,
          alamat,
          jk,
          f_kamar,
          peraturan_kost,
          catatan_tambahan,
          foto_kost,
          kordinat
        },
        {
          where: {
            [Op.and]: [{ id: kost.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Berhasil update kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteKost = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      nama,
      no_hp,
      harga,
      desa,
      alamat,
      jk,
      f_kamar,
      peraturan_kost,
      catatan_tambahan,
      foto_kost,
      kordinat
    } = req.body;
    if (req.role === "admin") {
      await Kost.destroy({
        where: {
          id: kost.id,
        },
      });
    } else {
      if (req.userId !== kost.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Kost.destroy({
        where: {
          [Op.and]: [{ id: kost.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Berhasil delete kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRekomendasiKost = async (req, res) => {
  try {
    let response;
    // Implementasi logika untuk mengambil data rekomendasi kost
    response = await Kost.findAll({
      attributes: [
        "uuid",
        "nama",
        "harga",
        "no_hp",
        "desa",
        "alamat",
        "jk",
        "f_kamar",
        "peraturan_kost",
        "catatan_tambahan",
        "foto_kost",
        "kordinat"
      ],
      include: {
        model: Users,
        attributes: ["name"],
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterKostByFacilities = async (req, res) => {
  try {
    const { facilities } = req.query;

    // Split string facilities menjadi array
    const facilitiesArray = facilities.split(",");

    // Filter pencarian berdasarkan fasilitas
    const response = await Kost.findAll({
      attributes: ["uuid", "nama", "harga", "f_kamar"],
      where: {
        f_kamar: {
          [Op.or]: facilitiesArray.map((facility) => ({
            [Op.like]: `%${facility}%`,
          })),
        },
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const saveFoto =(req, res)=>{
//   if(req.file === null) return res.status(400).json({msg: "No File Uploaded"});
//   const file = req.files.file;
//   const fileSize = file.data.length;
//   const ext = path.extname(file.name);
//   const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
//   const allowedType = [' png','.jpg','jpeg'];

//   if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "foto harus di bawah 5 MB"});
// }

// file.mv(`.public/images/${fileName}`), async(err)=>{
//   if(err) return res.status(500).json({msg: err.message});
//   try {
//     await Kost.create({image: fileName, url: url});
//     res.status(201).json({msg: "foto kost berhasil di upload"});
//   } catch (error) {
//     console.log(error.message);
//   }
// }