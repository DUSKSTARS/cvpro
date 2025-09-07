-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 08 avr. 2024 à 09:18
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Base de données : `etustage`
-- --------------------------------------------------------

--
-- Structure de la table `stage`
--
CREATE TABLE `stage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mat` VARCHAR(255) NOT NULL,
  `filiere` VARCHAR(255) NOT NULL,
  `niveau` VARCHAR(10) NOT NULL,
  `nom` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NOT NULL,
  `sexe` VARCHAR(2) NOT NULL,
  `dat` DATE NOT NULL,
  `annee` VARCHAR(10) NOT NULL,
  `photo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de la table `stage`
--
INSERT INTO `stage` (`id`, `mat`, `filiere`, `niveau`, `nom`, `prenom`, `sexe`, `dat`, `annee`, `photo`) VALUES
(22, '7VL9RI6C', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/28e1d66c1c706c01add30226aceeb818.jpg'),
(23, 'OONMD3G2', '1', '1', 'totofk', 'tata', '1', '2023-07-31', '1', 'image/61b15054a7601c728270785e316faf0b.jpg'),
(26, 'QBSD45DH', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/81c64e1eb4d60faeced2ddf28c0ed4f5.jpg'),
(27, 'REBIMSVL', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/10a5e392f0de58e8ebf10825840148b9.jpg'),
(28, 'S5X7958R', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/10a5e392f0de58e8ebf10825840148b9.jpg'),
(29, '6MYIJD62', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/833a0b846dab3a0ad0ea498e24abf513.jpg'),
(30, '7ASQBUI0', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/61b15054a7601c728270785e316faf0b.jpg'),
(31, 'BWOF2TF3', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/addons-video-thumb.png'),
(34, '0R131IG7', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/ka.jpg'),
(35, 'SP1ZRDME', '1', '1', 'toto', 'tata', '1', '2023-07-31', '1', 'image/20230517_140614.jpg'),
(36, '6EMZ0A07', '1', '1', 'toto', 'tata', '1', '2023-05-29', '1', 'image/20230517_140614.jpg');

--
-- AUTO_INCREMENT pour la table `stage`
--
ALTER TABLE `stage`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
