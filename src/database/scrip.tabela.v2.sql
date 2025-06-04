-- CRIAÇÃO E SELEÇÃO DO BANCO
CREATE DATABASE DB_FitAlert;
USE DB_FitAlert;

-- EMPRESAS
CREATE TABLE TB_Empresas (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    fkEmpresaMatriz INT,
    codigoAtivacao VARCHAR(50),
    CONSTRAINT fkEmpresaMatriz FOREIGN KEY (fkEmpresaMatriz) REFERENCES TB_Empresas(idEmpresa)
);

-- ENDEREÇOS
CREATE TABLE TB_Enderecos (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    uf CHAR(2) NOT NULL,
    municipio VARCHAR(45) NOT NULL,
    logradouro VARCHAR(45) NOT NULL,
    numero VARCHAR(5) NOT NULL,
    cep CHAR(8) NOT NULL,
    fkEmpresa INT,
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES TB_Empresas(idEmpresa)
);

-- USUÁRIOS
CREATE TABLE TB_Usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(45) NOT NULL,
    fkEmpresa INT,
    email VARCHAR(45) NOT NULL UNIQUE,
    telefone CHAR(11) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    CONSTRAINT chkUsuarioEmail CHECK(email LIKE '%@%'),
    CONSTRAINT chkUsuarioEmpresa FOREIGN KEY (fkEmpresa) REFERENCES TB_Empresas(idEmpresa)
);

-- SENSORES
CREATE TABLE TB_Sensores (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    status_sensor VARCHAR(20) NOT NULL,
    CONSTRAINT chkSensorStatus CHECK(status_sensor IN ('Inativo', 'Ativo', 'Manutenção'))
);

-- PROVADORES
CREATE TABLE TB_Provadores (
    idProvador INT,
    idEmpresa INT,
    secao VARCHAR(45) NOT NULL,
    fkSensor INT UNIQUE,
    PRIMARY KEY (idProvador, idEmpresa),
    CONSTRAINT chkProvadorSecao CHECK(secao IN ('Masculino', 'Feminino', 'Unissex')),
    CONSTRAINT fkProvadorEmpresa FOREIGN KEY (idEmpresa) REFERENCES TB_Empresas(idEmpresa),
    CONSTRAINT fkProvadorSensor FOREIGN KEY (fkSensor) REFERENCES TB_Sensores(idSensor)
);

-- REGISTROS DE USO
CREATE TABLE TB_Registros (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    fkSensor INT,
    ativo CHAR(1) NOT NULL,
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_saida DATETIME,
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES TB_Sensores(idSensor)
);

-- AVISOS
CREATE TABLE TB_Avisos (
    idAviso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descricao VARCHAR(150),
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES TB_Usuarios(idUsuario)
);

-- dados


-- Sensores
INSERT INTO TB_Sensores (status_sensor) VALUES
('Ativo'), ('Ativo'), ('Ativo'), ('Ativo'), ('Ativo');

-- Empresa
INSERT INTO TB_Empresas VALUES (DEFAULT, 'Piticas', '11111111111111', NULL, 'abc');

-- Provadores (Masculino)
INSERT INTO TB_Provadores VALUES 
(1, 1, 'masculino', 1),
(2, 1, 'masculino', 2),
(3, 1, 'masculino', 3),
(4, 1, 'masculino', 4),
(5, 1, 'masculino', 5),
(10, 1, 'masculino', 10);

-- Provadores (Feminino)
INSERT INTO TB_Provadores VALUES 
(6, 1, 'feminino', 6),
(7, 1, 'feminino', 7),
(8, 1, 'feminino', 8),
(9, 1, 'feminino', 9),
(11, 1, 'feminino', 11);

-- Registros diversos
INSERT INTO TB_Registros VALUES
(DEFAULT, 1, 1, '2025-05-23 09:59:47', '2025-05-23 10:00:47'),
(DEFAULT, 1, 1, '2025-05-23 10:59:47', '2025-05-23 11:00:47'),
(DEFAULT, 1, 1, '2025-05-23 11:59:47', '2025-05-23 12:00:47'),
(DEFAULT, 1, 1, '2025-05-23 13:59:47', '2025-05-23 14:00:47'),
(DEFAULT, 1, 1, '2025-05-23 14:59:47', '2025-05-23 15:00:47'),
(DEFAULT, 1, 1, '2025-05-23 16:59:47', '2025-05-23 17:00:47'),
(DEFAULT, 1, 1, '2025-05-23 19:24:47', '2025-05-23 20:00:47'),
(DEFAULT, 1, 1, '2025-05-24 09:59:47', '2025-05-24 10:00:47'),
(DEFAULT, 1, 1, '2025-05-28 09:59:47', '2025-05-28 10:00:47'),
(DEFAULT, 9, 9, '2025-05-24 09:59:47', '2025-05-24 10:00:47'),
(DEFAULT, 2, 1, '2025-05-23 09:59:47', '2025-05-23 10:00:47'),
(DEFAULT, 3, 1, '2025-05-23 10:59:47', '2025-05-23 11:00:47'),
(DEFAULT, 4, 1, '2025-05-23 11:59:47', '2025-05-23 12:00:47'),
(DEFAULT, 5, 1, '2025-05-23 13:59:47', '2025-05-23 14:00:47'),
(DEFAULT, 6, 1, '2025-05-23 14:59:47', '2025-05-23 15:00:47'),
(DEFAULT, 7, 1, '2025-05-23 16:59:47', '2025-05-23 17:00:47'),
(DEFAULT, 8, 1, '2025-05-23 19:24:47', '2025-05-23 20:00:47');

-- IDs dos provadores da empresa 1
SELECT idProvador FROM TB_Provadores WHERE idEmpresa = 1;

-- Atualização de saída
UPDATE TB_Registros
SET data_saida = '2025-05-23 13:59:47'
WHERE idRegistro = 1;

-- Consulta completa dos registros
SELECT * FROM TB_Registros;

INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES
(1, '1', '2025-05-28 09:00:00', '2025-05-28 09:15:00'),
(2, '1', '2025-05-28 09:10:00', '2025-05-28 09:25:00'),
(3, '1', '2025-05-28 09:20:00', '2025-05-28 09:35:00'),
(4, '1', '2025-05-28 09:30:00', '2025-05-28 09:45:00'),
(5, '1', '2025-05-28 09:40:00', '2025-05-28 09:55:00'),
(6, '1', '2025-05-28 10:00:00', '2025-05-28 10:15:00'),
(7, '1', '2025-05-28 10:10:00', '2025-05-28 10:25:00'),
(8, '1', '2025-05-28 10:20:00', '2025-05-28 10:35:00'),
(9, '1', '2025-05-28 10:30:00', '2025-05-28 10:45:00'),
(10, '1', '2025-05-28 10:40:00', '2025-05-28 10:55:00');









