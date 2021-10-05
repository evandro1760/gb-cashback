-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Tempo de geração: 04-Out-2021 às 17:14
-- Versão do servidor: 8.0.26
-- versão do PHP: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `GB-CASHBACK`
--
CREATE DATABASE IF NOT EXISTS `GB-CASHBACK` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `GB-CASHBACK`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `AUTO_STATUS_PURCHASE_EVENTS`
--

DROP TABLE IF EXISTS `AUTO_STATUS_PURCHASE_EVENTS`;
CREATE TABLE `AUTO_STATUS_PURCHASE_EVENTS` (
  `cpf` varchar(11) NOT NULL COMMENT 'CPF of a retailer, registered or not',
  `idStatus` bigint UNSIGNED NOT NULL COMMENT 'Purchase status identifier'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `AUTO_STATUS_PURCHASE_EVENTS`
--

INSERT INTO `AUTO_STATUS_PURCHASE_EVENTS` (`cpf`, `idStatus`) VALUES
('15350946056', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `PURCHASE`
--

DROP TABLE IF EXISTS `PURCHASE`;
CREATE TABLE `PURCHASE` (
  `idPurchase` bigint UNSIGNED NOT NULL COMMENT 'Purchase identifier',
  `code` varchar(20) NOT NULL COMMENT 'Purchase unique code',
  `amount` float NOT NULL COMMENT 'Purchase value',
  `date` datetime NOT NULL COMMENT 'Purchase date',
  `idRetailer` bigint UNSIGNED NOT NULL COMMENT 'Retailer identifier that does this purchase',
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Purchase registration date'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `RETAILER`
--

DROP TABLE IF EXISTS `RETAILER`;
CREATE TABLE `RETAILER` (
  `idRetailer` bigint UNSIGNED NOT NULL COMMENT 'Retailer primary key',
  `name` text NOT NULL COMMENT 'Retailer full name',
  `cpf` varchar(11) NOT NULL COMMENT 'Retailer CPF document',
  `email` text NOT NULL COMMENT 'Retailer email',
  `hashedPassword` text NOT NULL COMMENT 'Retailer hash password',
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Retailer registration date',
  `previousCashbackBalance` float NOT NULL COMMENT 'Retailer previous cashback balance'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `STATUS_PURCHASE`
--

DROP TABLE IF EXISTS `STATUS_PURCHASE`;
CREATE TABLE `STATUS_PURCHASE` (
  `idStatus` bigint UNSIGNED NOT NULL COMMENT 'Purchase registration status identifier',
  `statusName` text NOT NULL COMMENT 'Status name'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `STATUS_PURCHASE`
--

INSERT INTO `STATUS_PURCHASE` (`idStatus`, `statusName`) VALUES
(1, 'Em validação'),
(2, 'Aprovado'),
(3, 'Negado');

-- --------------------------------------------------------

--
-- Estrutura da tabela `STATUS_PURCHASE_EVENTS`
--

DROP TABLE IF EXISTS `STATUS_PURCHASE_EVENTS`;
CREATE TABLE `STATUS_PURCHASE_EVENTS` (
  `idStatusEvent` bigint UNSIGNED NOT NULL COMMENT 'Status event identifier',
  `idPurchase` bigint UNSIGNED NOT NULL COMMENT 'Purchase identifier',
  `idStatus` bigint UNSIGNED NOT NULL COMMENT 'Purchase register status identifier',
  `statusDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date when status has been attributed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `AUTO_STATUS_PURCHASE_EVENTS`
--
ALTER TABLE `AUTO_STATUS_PURCHASE_EVENTS`
  ADD KEY `idStatus` (`idStatus`);

--
-- Índices para tabela `PURCHASE`
--
ALTER TABLE `PURCHASE`
  ADD PRIMARY KEY (`idPurchase`),
  ADD UNIQUE KEY `idPurchase` (`idPurchase`),
  ADD UNIQUE KEY `CODE` (`code`),
  ADD UNIQUE KEY `PURCHASE_CODE` (`code`),
  ADD KEY `ID_RETAILER` (`idRetailer`),
  ADD KEY `PURCHASE_ID_RETAILER` (`idRetailer`);

--
-- Índices para tabela `RETAILER`
--
ALTER TABLE `RETAILER`
  ADD PRIMARY KEY (`idRetailer`),
  ADD UNIQUE KEY `idRetailer` (`idRetailer`),
  ADD UNIQUE KEY `CPF` (`cpf`),
  ADD UNIQUE KEY `EMAIL` (`email`(100));

--
-- Índices para tabela `STATUS_PURCHASE`
--
ALTER TABLE `STATUS_PURCHASE`
  ADD PRIMARY KEY (`idStatus`),
  ADD UNIQUE KEY `idStatus` (`idStatus`);

--
-- Índices para tabela `STATUS_PURCHASE_EVENTS`
--
ALTER TABLE `STATUS_PURCHASE_EVENTS`
  ADD PRIMARY KEY (`idStatusEvent`),
  ADD UNIQUE KEY `idStatusEvent` (`idStatusEvent`),
  ADD KEY `STATUS_EVENT_ID_PURCHASE` (`idPurchase`),
  ADD KEY `idStatus` (`idStatus`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `PURCHASE`
--
ALTER TABLE `PURCHASE`
  MODIFY `idPurchase` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Purchase identifier';

--
-- AUTO_INCREMENT de tabela `RETAILER`
--
ALTER TABLE `RETAILER`
  MODIFY `idRetailer` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Retailer primary key';

--
-- AUTO_INCREMENT de tabela `STATUS_PURCHASE`
--
ALTER TABLE `STATUS_PURCHASE`
  MODIFY `idStatus` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Purchase registration status identifier', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `STATUS_PURCHASE_EVENTS`
--
ALTER TABLE `STATUS_PURCHASE_EVENTS`
  MODIFY `idStatusEvent` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Status event identifier';

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `AUTO_STATUS_PURCHASE_EVENTS`
--
ALTER TABLE `AUTO_STATUS_PURCHASE_EVENTS`
  ADD CONSTRAINT `AUTO_STATUS_PURCHASE_EVENTS_ibfk_1` FOREIGN KEY (`idStatus`) REFERENCES `STATUS_PURCHASE` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Limitadores para a tabela `PURCHASE`
--
ALTER TABLE `PURCHASE`
  ADD CONSTRAINT `PURCHASE_ibfk_1` FOREIGN KEY (`idRetailer`) REFERENCES `RETAILER` (`idRetailer`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Limitadores para a tabela `STATUS_PURCHASE_EVENTS`
--
ALTER TABLE `STATUS_PURCHASE_EVENTS`
  ADD CONSTRAINT `STATUS_PURCHASE_EVENTS_ibfk_1` FOREIGN KEY (`idPurchase`) REFERENCES `PURCHASE` (`idPurchase`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `STATUS_PURCHASE_EVENTS_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `STATUS_PURCHASE` (`idStatus`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
