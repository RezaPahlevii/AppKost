-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 04 Jul 2023 pada 15.10
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kost_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kost`
--

CREATE TABLE `kost` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `no_hp` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `desa` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `jk` enum('Putra','Putri','Campur') NOT NULL,
  `f_kamar` text NOT NULL,
  `peraturan_kost` varchar(255) NOT NULL,
  `catatan_tambahan` text NOT NULL,
  `foto_kost` blob NOT NULL,
  `kordinat` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kost`
--

INSERT INTO `kost` (`id`, `uuid`, `nama`, `no_hp`, `harga`, `desa`, `alamat`, `jk`, `f_kamar`, `peraturan_kost`, `catatan_tambahan`, `foto_kost`, `kordinat`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'b13929f4-ec50-439b-a2f0-4b5f4578d311', 'KostQ', '0812121212', 700000, 'Sungai Alam', 'sasasa', 'Putra', '[\"Lemari\",\"Bantal\",\"Meja\",\"CCTV\",\"Pagar\",\"Pengurus Kost\",\"Jemuran\",\"Dapur\"]', '[\"Jam Malam\",\"Khusus Mahasiswa\"]', 'sasasa sasa', 0x5b7b7d2c7b7d2c7b7d5d, '1.456861841698712, 102.15208097442374', 1, '2023-07-04 12:41:37', '2023-07-04 12:41:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('ImyxdZdaEGWy_CO3hM6hwCI6Zl9Se1l0', '2023-07-05 12:26:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 12:26:30', '2023-07-04 12:26:30'),
('JDtk1y1MiXi_v0vR1g8qSfJJYqYnanFA', '2023-07-05 12:41:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"03baf94a-0378-4621-bf09-9dc7c67aeb91\"}', '2023-07-04 12:26:30', '2023-07-04 12:41:37'),
('n2lUHdH2AJXlYM0gCgvfRS3u1qlxU41k', '2023-07-05 12:26:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 12:26:30', '2023-07-04 12:26:30'),
('pXKJo4ueB21Sf0nUqouFARkgbbiBNE_g', '2023-07-05 12:26:30', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 12:26:30', '2023-07-04 12:26:30'),
('PYGljc14JafjmLK-9A9x8kzsqSBuRVJ6', '2023-07-05 12:27:01', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 12:27:01', '2023-07-04 12:27:01'),
('q-QouIqGsE5dUImvTgfzqbobLSXBYiMg', '2023-07-05 12:27:18', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 12:27:18', '2023-07-04 12:27:18'),
('wWGf0UTqBd_hkhycI9DzDGo8kMrz7BJB', '2023-07-05 12:41:37', '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}', '2023-07-04 12:41:37', '2023-07-04 12:41:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','pencari kost','pemilik kost') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, '03baf94a-0378-4621-bf09-9dc7c67aeb91', 'levi', 'levi@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$tVEXN8GKkoOSbXsX1MQ2oA$uIG4QCndnj2ay30NZJOOBi9m+hGe3UA65F3+C/w7Pgc', 'admin', '2023-07-04 12:27:01', '2023-07-04 12:27:01');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kost`
--
ALTER TABLE `kost`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kost`
--
ALTER TABLE `kost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `kost`
--
ALTER TABLE `kost`
  ADD CONSTRAINT `kost_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
