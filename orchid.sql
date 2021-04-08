-- --------------------------------------------------------
-- DM de PW6 2021 - Le site pour un fleuriste
-- Author: Gabriel DA SILVA aka. cmuagab
-- Date: 05/04/2021
-- --------------------------------------------------------

DROP TABLE IF EXISTS flowers;
DROP TABLE IF EXISTS premade;
DROP TABLE IF EXISTS commands_contents;
DROP TABLE IF EXISTS commands;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS users;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--
-- Utilisateurs du site

CREATE TABLE `users` (
  `userID` int(8) NOT NULL AUTO_INCREMENT,
  `mail` varchar(320) NOT NULL DEFAULT '',
  `name` varchar(64) NOT NULL,
  `password` varchar(32) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (userID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`mail`, `name`, `password`, `admin`) VALUES
('employe@orchid.fr', 'Gabriel', 'employe', 1),
('jacqueline@mail.com', 'Jacqueline', 'client', 0);

-- --------------------------------------------------------

--
-- Structure de la table `commands`
--
-- Liste des commandes qui ont été éffectuées

CREATE TABLE `commands` (
  `commandID` VARCHAR(256) NOT NULL,
  `user` int(8) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (commandID),
  FOREIGN KEY (user) REFERENCES users(userID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Structure de la table `commands_contents`
--
-- Liste le contenus des commandes

CREATE TABLE `commands_contents` (
  `id` VARCHAR(256) NOT NULL,
  `type` VARCHAR(24) NOT NULL,
  `contentID` INT(8) NOT NULL,
  FOREIGN KEY (id) REFERENCES commands(commandID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `flowers`
--
-- Liste toutes les fleurs (customisation du site)

CREATE TABLE `flowers` (
  `flowerID` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL DEFAULT '',
  `price` int(8) UNSIGNED NOT NULL DEFAULT '0',
  `image` text NOT NULL,
  PRIMARY KEY (flowerID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `flowers`
--

INSERT INTO `flowers` (`name`, `price`, `image`) VALUES
('Blanche', 6, 'http://assets.stickpng.com/images/580b585b2edbce24c47b268b.png'),
('Rose', 8, 'https://img2.freepng.fr/20171127/a17/pnk-orchid-transparent-png-clip-art-image-5a1bebd1c92b22.974193061511779281824.jpg'),
('Bleue', 10, 'https://i.pinimg.com/originals/c1/30/8a/c1308abbb422a401e63e91d731322fb3.png'),
('Violette', 14, 'https://www.photogriffon.com/photos-du-monde/Fleurs-PNG-detourees-gratuites-free-300dpi-Libres-de-Droits/FLEUR-DETOUREE-platycodom-photogriffon-77.png');

-- --------------------------------------------------------

--
-- Structure de la table `premade`
--
-- Liste tous les bouquets préfaits

CREATE TABLE `premade` (
  `premadeID` int(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL DEFAULT '',
  `price` int(8) UNSIGNED NOT NULL DEFAULT '0',
  `image` text NOT NULL,
  PRIMARY KEY (premadeID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `premade`
--

INSERT INTO `premade` (`name`, `price`, `image`) VALUES
('Neptune', 25, 'https://nantes.hibiscusfleurs.fr/8148-large_default/neptune.jpg'),
('Jupiter', 23, 'https://www.veron-fleuriste.com/media/57noce1__054696700_1521_17032016.jpg'),
('Exotique', 32, 'https://fleursexotiques.fr/48-large_default/bouquet-d-orchidee-jardin-d-afrique.jpg'),
('Summer', 36, 'https://previews.123rf.com/images/sutsaiy/sutsaiy1712/sutsaiy171200277/92093862-beau-bouquet-d-orchid%C3%A9es.jpg');


-- --------------------------------------------------------

--
-- Structure de la table `cart`
--
-- Le panier d'achat des utilistaurs




CREATE TABLE `cart` (
  `user` int(8) NOT NULL,
  `type` VARCHAR(24) NOT NULL,
  `id` INT(8) NOT NULL,
  FOREIGN KEY (user) REFERENCES users(userID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;