// // kostFasilitasController.js

// import { addFasilitasToKost } from './kostController';

// // ...

// // Contoh penggunaan fungsi untuk menambahkan hubungan many-to-many
// async function tambahFasilitasKeKost(req, res) {
//   try {
//     const { kostId, fasilitasId } = req.body;

//     await addFasilitasToKost(kostId, fasilitasId);

//     // Response success
//     res.status(200).json({ message: 'Fasilitas berhasil ditambahkan ke Kost.' });
//   } catch (error) {
//     // Handle error
//     res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan fasilitas ke Kost.' });
//   }
// }

// // Export the functions
// export { tambahFasilitasKeKost };
