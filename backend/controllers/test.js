// export const createKost = async (req, res) => {
//     const files = req.files?.['foto_kost[]']; // Mengambil semua file yang diunggah
  
//     if (!files || files.length === 0)
//       return res.status(400).json({ msg: "No File Uploaded" });
  
//     try {
//       const promises = [];
  
//       // Loop melalui setiap file dan menyimpannya
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
  
//         if (!file) return res.status(400).json({ msg: "Invalid File" });
//         const fileSize = file.data.length;
//         const ext = path.extname(file.name);
//         const fileName = file.md5 + ext;
//         const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
//         const allowedType = [".png", ".jpg", ".jpeg"];
  
//         if (!allowedType.includes(ext.toLowerCase()))
//           return res.status(422).json({ msg: "Invalid Images" });
//         if (fileSize > 5000000)
//           return res.status(422).json({ msg: "Image must be less than 5 MB" });
  
//         const promise = new Promise((resolve, reject) => {
//           file.mv(`./public/images/${fileName}`, async (err) => {
//             if (err) {
//               reject(err);
//             } else {
//               try {
//                 const newKost = await Kost.create({
//                   nama: req.body.nama,
//                   no_hp: req.body.no_hp,
//                   harga: req.body.harga,
//                   desa: req.body.desa,
//                   alamat: req.body.alamat,
//                   jk: req.body.jk,
//                   catatan_tambahan: req.body.catatan_tambahan,
//                   kordinat: req.body.kordinat,
//                   userId: req.userId,
//                 });
  
//                 await Foto.create({
//                   foto_kost: fileName,
//                   url: url,
//                   kostId: newKost.id,
//                 });
  
//                 resolve();
//               } catch (error) {
//                 reject(error);
//               }
//             }
//           });
//         });
  
//         promises.push(promise);
//       }
  
//       await Promise.all(promises);
  
//       res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//       console.log(error.message);
//     }
//   };