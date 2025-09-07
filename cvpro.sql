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
-- Base de données : `cvpro`
-- --------------------------------------------------------

--
-- Structure de la table `stages`
--
CREATE TABLE stages (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mat VARCHAR(255) NOT NULL,
    filiere VARCHAR(255) NOT NULL,
    niveau VARCHAR(10) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    sexe VARCHAR(2) NOT NULL,
    dat DATE NOT NULL,
    annee VARCHAR(10) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    competences TEXT,
    experience TEXT,
    formation TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Données de la table `stages`
--
--
-- AUTO_INCREMENT pour la table `stages`
--
ALTER TABLE `stages`
  MODIFY `id` INT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
