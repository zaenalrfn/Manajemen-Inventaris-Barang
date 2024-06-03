-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 03:11 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventaris_barang`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(10) NOT NULL,
  `nama` varchar(225) NOT NULL,
  `quantity` int(50) NOT NULL,
  `price` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `nama`, `quantity`, `price`) VALUES
(1, 'Kecap', 20, 5000),
(3, 'sabun harmoni', 20, 3000),
(5, 'indomie geprek', 10, 3000),
(7, 'tepung terigu', 7, 8000),
(8, 'sari roti', 10, 7000),
(9, 'basreng', 100, 25000),
(21, 'Jagung', 10, 5000),
(22, 'bolpoin', 9, 2000),
(23, 'apel', 12, 15000),
(24, 'tepung tapioka', 14, 10000),
(25, 'oreo', 17, 5000),
(26, 'roma kelapa', 5, 5000),
(28, 'toriyu', 23, 2000),
(29, 'aoka', 1, 3500),
(30, 'flimeal', 10, 150000),
(31, 'gitar', 1, 600000),
(32, 'buku', 3, 1000),
(33, 'galon', 1, 6000),
(34, 'barang1', 23, 1000),
(35, 'barang2', 2, 1),
(38, 'barang5', 1, 1),
(39, 'barang9', 1, 1),
(40, 'barang19', 3, 3),
(41, 'barang11', 1, 1),
(42, 'barang123', 1, 1),
(46, 'babra', 34, 3434),
(47, 'tiramisu', 35, 50000),
(48, 'teh kota', 1, 5000),
(49, 'raket victor', 1, 400000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
