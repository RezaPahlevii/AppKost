import Kost from "../models/KostModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import Foto from "../models/FotoModel.js";
import Peraturan from "../models/PeraturanModel.js";
import KostPeraturan from "../models/KostPeraturanModel.js";
import Fasilitas from "../models/FasilitasModel.js";
import KostFasilitas from "../models/KostFasilitasModel.js";
import FasilitasUmum from "../models/FasilitasUmumModel.js";
import KostFasilitasUmum from "../models/KostFasilitasUmumModel.js";
import FasilitasKeamanan from "../models/FasilitasKeamananModel.js";
import KostFasilitasKeamanan from "../models/KostFasilitasKeamananModel.js";
import Spesifikasi from "../models/SpesifikasiModel.js";
import KostSpesifikasi from "../models/KostSpesifikasiModel.js";
// import fs from "fs";

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
          "catatan_tambahan",
          "kordinat",
        ],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Peraturan,
            attributes: ["peraturan"],
          },
          {
            model: Fasilitas,
            attributes: ["nama_f"],
          },
          {
            model: FasilitasUmum,
            attributes: ["f_umum"],
          },
          {
            model: FasilitasKeamanan,
            attributes: ["f_keamanan"],
          },
          {
            model: Spesifikasi,
            attributes: ["spesifikasi"],
          },
          {
            model: Foto,
            attributes: ["url1", "url2", "url3", "url4"],
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
          "catatan_tambahan",
          "kordinat",
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Peraturan,
            attributes: ["peraturan"],
          },
          {
            model: Fasilitas,
            attributes: ["nama_f"],
          },
          {
            model: FasilitasUmum,
            attributes: ["f_umum"],
          },
          {
            model: FasilitasKeamanan,
            attributes: ["f_keamanan"],
          },
          {
            model: Spesifikasi,
            attributes: ["spesifikasi"],
          },
          {
            model: Foto,
            attributes: ["url1", "url2", "url3", "url4"],
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
          "catatan_tambahan",
          "kordinat",
        ],
        where: {
          id: kost.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Peraturan,
            attributes: ["peraturan"],
          },
          {
            model: Fasilitas,
            attributes: ["nama_f"],
          },
          {
            model: FasilitasUmum,
            attributes: ["f_umum"],
          },
          {
            model: FasilitasKeamanan,
            attributes: ["f_keamanan"],
          },
          {
            model: Spesifikasi,
            attributes: ["spesifikasi"],
          },
          {
            model: Foto,
            attributes: ["url1", "url2", "url3", "url4"],
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
          "catatan_tambahan",
          "kordinat",
        ],
        where: {
          [Op.and]: [{ id: kost.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Peraturan,
            attributes: ["peraturan"],
          },
          {
            model: Fasilitas,
            attributes: ["nama_f"],
          },
          {
            model: FasilitasUmum,
            attributes: ["f_umum"],
          },
          {
            model: FasilitasKeamanan,
            attributes: ["f_keamanan"],
          },
          {
            model: Spesifikasi,
            attributes: ["spesifikasi"],
          },
          {
            model: Foto,
            attributes: ["url1", "url2", "url3", "url4"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKost = async (req, res) => {
  try {
    const {
      nama,
      no_hp,
      harga,
      desa,
      alamat,
      jk,
      spesifikasi,
      peraturan,
      nama_f,
      f_umum,
      f_keamanan,
      catatan_tambahan,
      kordinat,
    } = req.body;

    const newKost = await Kost.create({
      nama: nama,
      no_hp: no_hp,
      harga: harga,
      desa: desa,
      alamat: alamat,
      jk: jk,
      catatan_tambahan: catatan_tambahan,
      kordinat: kordinat,
      userId: req.userId,
    });
    //================================================================================
    if (req.files === null)
      return res.status(400).json({ msg: "No File Uploaded" });
    const fotoFiles = req.files; // Mengambil semua file foto yang diupload

    // Mengatur ukuran maksimal dan jenis file yang diizinkan
    const allowedTypes = [".png", ".jpg", ".jpeg"];
    const maxSize = 5000000; // 5MB
    // Menyimpan informasi foto ke dalam tabel "Foto"
    const fotoUrls = []; // Menampung URL foto

    // Mengunggah dan menyimpan setiap file foto
    for (let i = 1; i <= 4; i++) {
      const file = fotoFiles[`url${i}`];

      if (!file)
        // Jika file tidak ada, lanjutkan ke iterasi berikutnya
        continue;

      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      if (!allowedTypes.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: `Invalid Image Type for foto${i}` });

      if (fileSize > maxSize)
        return res
          .status(422)
          .json({ msg: `Image for foto${i} must be less than 5 MB` });

      await file.mv(`./public/images/${fileName}`);

      // Menyimpan URL foto ke dalam array
      fotoUrls.push(url);
    }

    // Menyimpan informasi foto ke dalam tabel "Foto"
    await Foto.create({
      url1: fotoUrls[0],
      url2: fotoUrls[1],
      url3: fotoUrls[2],
      url4: fotoUrls[3],
      kostId: newKost.id,
    });

    //==========================================================================
    // Menyimpan Peraturan kost
    const existingPeraturan = [];
    const peraturanArray = peraturan.split(","); // Ubah string menjadi array
    for (let i = 0; i < peraturanArray.length; i++) {
      const peraturanName = peraturanArray[i];
      let peraturan = await Peraturan.findOne({
        where: { peraturan: peraturanName },
      });

      if (!peraturan) {
        peraturan = await Peraturan.create({
          peraturan: peraturanName,
        });
      }
      if (peraturan) {
        existingPeraturan.push(peraturan.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostPeraturan.create({
          kostId: newKost.id,
          peraturanId: peraturan.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }
    console.log(existingPeraturan);

    //==================================================================
    // Menyimpan fasilitas kost
    const existingFasilitas = [];
    const fasilitasArray = nama_f.split(","); // Ubah string menjadi array
    for (let i = 0; i < fasilitasArray.length; i++) {
      const fasilitasName = fasilitasArray[i];

      let fasilitas = await Fasilitas.findOne({
        where: { nama_f: fasilitasName },
      });

      if (!fasilitas) {
        fasilitas = await Fasilitas.create({
          nama_f: fasilitasName,
        });
      }

      if (fasilitas) {
        existingFasilitas.push(fasilitas.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostFasilitas.create({
          kostId: newKost.id,
          fasilitaId: fasilitas.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }

    console.log(existingFasilitas);
    //==================================================================
    // Menyimpan fasilitas Umum kost
    const existingFasilitasUmum = [];
    const fasilitasUmumArray = f_umum.split(","); // Ubah string menjadi array
    for (let i = 0; i < fasilitasUmumArray.length; i++) {
      const fasilitasUmumName = fasilitasUmumArray[i];

      let fasilitasUmum = await FasilitasUmum.findOne({
        where: { f_umum: fasilitasUmumName },
      });

      if (!fasilitasUmum) {
        fasilitasUmum = await FasilitasUmum.create({
          f_umum: fasilitasUmumName,
        });
      }

      if (fasilitasUmum) {
        existingFasilitasUmum.push(fasilitasUmum.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostFasilitasUmum.create({
          kostId: newKost.id,
          fasilitasUmumId: fasilitasUmum.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }
    console.log(existingFasilitasUmum);
        //==================================================================
    // Menyimpan fasilitas Keamanan kost
    const existingFasilitasKeamanan = [];
    const fasilitasKeamananArray = f_keamanan.split(","); // Ubah string menjadi array
    for (let i = 0; i < fasilitasKeamananArray.length; i++) {
      const fasilitasKeamananName = fasilitasKeamananArray[i];

      let fasilitasKeamanan = await FasilitasKeamanan.findOne({
        where: { f_keamanan: fasilitasKeamananName },
      });

      if (!fasilitasKeamanan) {
        fasilitasKeamanan = await FasilitasKeamanan.create({
          f_keamanan: fasilitasKeamananName,
        });
      }

      if (fasilitasKeamanan) {
        existingFasilitasKeamanan.push(fasilitasKeamanan.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostFasilitasKeamanan.create({
          kostId: newKost.id,
          fasilitasKeamananId: fasilitasKeamanan.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }
    console.log(existingFasilitasKeamanan);
        //==================================================================
    // Menyimpan Spesifikasi kost
    const existingSpesifikasi = [];
    const SpesifikasiArray = spesifikasi.split(","); // Ubah string menjadi array
    for (let i = 0; i < SpesifikasiArray.length; i++) {
      const SpesifikasiName = SpesifikasiArray[i];

      let spesifikasi = await Spesifikasi.findOne({
        where: { spesifikasi: SpesifikasiName },
      });

      if (!spesifikasi) {
        spesifikasi = await Spesifikasi.create({
          spesifikasi: SpesifikasiName,
        });
      }

      if (spesifikasi) {
        existingSpesifikasi.push(spesifikasi.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostSpesifikasi.create({
          kostId: newKost.id,
          spesifikasiId: spesifikasi.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }
    console.log(existingSpesifikasi);

    res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
  }
};

export const updateKost = async (req, res) => {
  try {
    const kostId = req.params.id;
    const kost = await Kost.findOne({
      where: { uuid: kostId },
    });
    const {
      nama,
      no_hp,
      harga,
      desa,
      alamat,
      jk,
      peraturan,
      nama_f,
      f_keamanan,
      spesifikasi,
      f_umum,
      catatan_tambahan,
      kordinat,
    } = req.body;

    // Temukan data Kost yang sudah ada berdasarkan kostId
    if (!kost) {
      return res.status(404).json({ msg: "Kost tidak ditemukan" });
    }

    const upKost = await Kost.update(
      {
        nama: nama,
        no_hp: no_hp,
        harga: harga,
        desa: desa,
        alamat: alamat,
        jk: jk,
        catatan_tambahan: catatan_tambahan,
        kordinat: kordinat,
        userId: req.userId,
      },
      {
        where: { uuid: kostId }, // Tambahkan kondisi untuk mencari data Kost yang sesuai
      }
    );
    //================================================================================
    try {
      if (req.files === null)
        return res.status(400).json({ msg: "No File Uploaded" });
      const fotoFiles = req.files; // Mengambil semua file foto yang diupload

      // Mengatur ukuran maksimal dan jenis file yang diizinkan
      const allowedTypes = [".png", ".jpg", ".jpeg"];
      const maxSize = 5000000; // 5MB
      // Menyimpan informasi foto ke dalam tabel "Foto"
      const fotoUrls = []; // Menampung URL foto

      // Mengunggah dan menyimpan setiap file foto
      for (let i = 1; i <= 4; i++) {
        const file = fotoFiles[`url${i}`];

        if (!file)
          // Jika file tidak ada, lanjutkan ke iterasi berikutnya
          continue;

        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        if (!allowedTypes.includes(ext.toLowerCase()))
          return res
            .status(422)
            .json({ msg: `Invalid Image Type for foto${i}` });

        if (fileSize > maxSize)
          return res
            .status(422)
            .json({ msg: `Image for foto${i} must be less than 5 MB` });

        await file.mv(`./public/images/${fileName}`);

        // Menyimpan URL foto ke dalam array
        fotoUrls.push(url);
      }

      let fotoData = await Foto.findOne({
        where: { kostId: kost.id },
      });
      if (fotoData) {
        // Jika data foto sudah ada, maka perbarui data foto tersebut
        await Foto.update(
          {
            url1: fotoUrls[0],
            url2: fotoUrls[1],
            url3: fotoUrls[2],
            url4: fotoUrls[3],
          },
          {
            where: { kostId: kost.id },
          }
        );
      } else {
        // Jika data foto belum ada, maka buat baris baru dalam tabel "Foto"
        await Foto.create({
          url1: fotoUrls[0],
          url2: fotoUrls[1],
          url3: fotoUrls[2],
          url4: fotoUrls[3],
          kostId: kost.id,
        });
      }
      console.log(fotoUrls);
    } catch (error) {}
    //===============================================================================
    // Menyimpan Peraturan kost
    try {
      await KostPeraturan.destroy({
        where: { kostId: kost.id },
      });
      const existingPeraturan = [];
      const peraturanArray = peraturan.split(","); // Ubah string menjadi array
      for (let i = 0; i < peraturanArray.length; i++) {
        const peraturanName = peraturanArray[i];
        let peraturan = await Peraturan.findOne({
          where: { peraturan: peraturanName },
        });

        if (!peraturan) {
          peraturan = await Peraturan.create({
            peraturan: peraturanName,
          });
        }
        if (peraturan) {
          existingPeraturan.push(peraturan.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostPeraturan.create({
            kostId: kost.id,
            peraturanId: peraturan.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
      }
    } catch (error) {}
    //==================================================================
    // Menyimpan fasilitas kost
    try {
      await KostFasilitas.destroy({ where: { kostId: kost.id } });
      const existingFasilitas = [];
      const fasilitasArray = nama_f.split(","); // Ubah string menjadi array
      for (let i = 0; i < fasilitasArray.length; i++) {
        const fasilitasName = fasilitasArray[i];

        let fasilitas = await Fasilitas.findOne({
          where: { nama_f: fasilitasName },
        });

        if (!fasilitas) {
          fasilitas = await Fasilitas.create({
            nama_f: fasilitasName,
          });
        }

        if (fasilitas) {
          existingFasilitas.push(fasilitas.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostFasilitas.create({
            kostId: kost.id,
            fasilitaId: fasilitas.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
        console.log(fasilitas);
        console.log(fasilitas);
      }
    } catch (error) {}
    //==================================================================
    // Menyimpan fasilitas umum kost
    try {
      await KostFasilitasUmum.destroy({ where: { kostId: kost.id } });
      const existingFasilitasUmum = [];
      const fasilitasUmumArray = f_umum.split(","); // Ubah string menjadi array
      for (let i = 0; i < fasilitasUmumArray.length; i++) {
        const fasilitasUmumName = fasilitasUmumArray[i];

        let fasilitasUmum = await FasilitasUmum.findOne({
          where: { f_umum: fasilitasUmumName },
        });

        if (!fasilitasUmum) {
          fasilitasUmum = await FasilitasUmum.create({
            f_umum: fasilitasUmumName,
          });
        }

        if (fasilitasUmum) {
          existingFasilitasUmum.push(fasilitasUmum.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostFasilitasUmum.create({
            kostId: kost.id,
            fasilitasUmumId: fasilitasUmum.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
      }
    } catch (error) {}
    //==================================================================
    // Menyimpan fasilitas keamanan kost
    try {
      await KostFasilitasKeamanan.destroy({ where: { kostId: kost.id } });
      const existingFasilitasKeamanan = [];
      const fasilitasKeamananArray = f_keamanan.split(","); // Ubah string menjadi array
      for (let i = 0; i < fasilitasKeamananArray.length; i++) {
        const fasilitasKeamananName = fasilitasKeamananArray[i];

        let fasilitasKeamanan = await FasilitasKeamanan.findOne({
          where: { f_keamanan: fasilitasKeamananName },
        });

        if (!fasilitasKeamanan) {
          fasilitasKeamanan = await FasilitasKeamanan.create({
            f_keamanan: fasilitasKeamananName,
          });
        }

        if (fasilitasKeamanan) {
          existingFasilitasKeamanan.push(fasilitasKeamanan.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostFasilitasKeamanan.create({
            kostId: kost.id,
            fasilitasKeamananId: fasilitasKeamanan.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
      }
    } catch (error) {}
    //==================================================================
    // Menyimpan spesifikasi kamar
    try {
      await KostSpesifikasi.destroy({ where: { kostId: kost.id } });
      const existingFasilitasspesifikasi = [];
      const spesifikasiArray = spesifikasi.split(","); // Ubah string menjadi array
      for (let i = 0; i < spesifikasiArray.length; i++) {
        const spesifikasiName = spesifikasiArray[i];

        let spesifikasi = await Spesifikasi.findOne({
          where: { spesifikasi: spesifikasiName },
        });

        if (!spesifikasi) {
          spesifikasi = await Spesifikasi.create({
            spesifikasi: spesifikasiName,
          });
        }

        if (spesifikasi) {
          existingFasilitasspesifikasi.push(spesifikasi.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostSpesifikasi.create({
            kostId: kost.id,
            spesifikasiId: spesifikasi.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
        console.log(spesifikasi);
      }
    } catch (error) {}

    res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error.message);
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
    await KostFasilitas.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await KostFasilitasUmum.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await KostFasilitasKeamanan.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await KostPeraturan.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await KostSpesifikasi.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await Foto.destroy({
      where: {
        kostId: kost.id,
      },
    });
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
        "catatan_tambahan",
        "kordinat",
      ],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: Peraturan,
          attributes: ["peraturan"],
        },
        {
          model: Fasilitas,
          attributes: ["nama_f"],
        },
        {
          model: FasilitasUmum,
          attributes: ["f_umum"],
        },
        {
          model: FasilitasKeamanan,
          attributes: ["f_keamanan"],
        },
        {
          model: Foto,
          attributes: ["url1", "url2", "url3", "url4"],
        },
      ],
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
      attributes: ["uuid", "nama", "harga"],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: KostPeraturan,
          attributes: ["peraturan"],
        },
        {
          model: KostFasilitas,
          attributes: ["nama_f"],
          where: {
            f_kamar: {
              [Op.or]: facilitiesArray.map((facility) => ({
                [Op.like]: `%${facility}%`,
              })),
            },
          },
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKostView = async (req, res) => {
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
        "catatan_tambahan",
        "kordinat",
      ],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: Peraturan,
          attributes: ["peraturan"],
        },
        {
          model: Fasilitas,
          attributes: ["nama_f"],
        },
        {
          model: FasilitasUmum,
          attributes: ["f_umum"],
        },
        {
          model: FasilitasKeamanan,
          attributes: ["f_keamanan"],
        },
        {
          model: Spesifikasi,
          attributes: ["spesifikasi"],
        },
        {
          model: Foto,
          attributes: ["url1", "url2", "url3", "url4"],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getKostViewById = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Kost.findOne({
      attributes: [
        "uuid",
        "nama",
        "harga",
        "no_hp",
        "desa",
        "alamat",
        "jk",
        "catatan_tambahan",
        "kordinat",
      ],
      where: {
        id: kost.id,
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: Peraturan,
          attributes: ["peraturan"],
        },
        {
          model: Fasilitas,
          attributes: ["nama_f"],
        },
        {
          model: FasilitasUmum,
          attributes: ["f_umum"],
        },
        {
          model: FasilitasKeamanan,
          attributes: ["f_keamanan"],
        },
        {
          model: Spesifikasi,
          attributes: ["spesifikasi"],
        },
        {
          model: Foto,
          attributes: ["url1", "url2", "url3", "url4"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKordinat = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || !req.userId) {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "desa",
          "alamat",
          "harga",
          "jk",
          "kordinat",
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
          "desa",
          "alamat",
          "harga",
          "jk",
          "kordinat",
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
