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

select * from TB_Sensores;

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

INSERT INTO TB_Sensores (status_sensor) VALUES 
('Ativo'), ('Ativo'), ('Ativo'), ('Ativo'), ('Ativo'), ('Ativo');

INSERT INTO TB_Sensores (status_sensor) VALUES 
('Ativo');

SELECT MAX(idSensor) AS novoSensorID FROM TB_Sensores;

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

INSERT INTO TB_Provadores VALUES (12, 1, 'feminino', 12);


SELECT * FROM TB_Provadores;
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
 
 -- Adidionado registros valiados do sensor 1 e 2 
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-09 08:00:00', '2025-06-09 10:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-09 09:30:00', '2025-06-09 12:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-09 11:00:00', '2025-06-09 13:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-09 13:15:00', '2025-06-09 15:45:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-09 16:00:00', '2025-06-09 18:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-09 17:30:00', '2025-06-09 20:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-09 19:00:00', '2025-06-09 21:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-09 20:00:00', '2025-06-09 22:00:00');

INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-10 07:45:00', '2025-06-10 09:45:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-10 10:00:00', '2025-06-10 12:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-10 12:30:00', '2025-06-10 14:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-10 15:00:00', '2025-06-10 17:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-10 16:00:00', '2025-06-10 18:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-10 17:00:00', '2025-06-10 19:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-10 19:00:00', '2025-06-10 21:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-10 20:00:00', '2025-06-10 22:00:00');

INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-11 08:15:00', '2025-06-11 11:15:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-11 09:00:00', '2025-06-11 11:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-11 13:00:00', '2025-06-11 15:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-11 14:30:00', '2025-06-11 16:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-11 16:00:00', '2025-06-11 18:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-11 17:30:00', '2025-06-11 20:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-11 19:00:00', '2025-06-11 21:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-11 20:00:00', '2025-06-11 22:00:00');

INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-12 07:30:00', '2025-06-12 09:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-12 10:45:00', '2025-06-12 13:15:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-12 11:30:00', '2025-06-12 13:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-12 13:45:00', '2025-06-12 16:15:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-12 16:00:00', '2025-06-12 18:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-12 17:30:00', '2025-06-12 19:30:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-12 19:00:00', '2025-06-12 21:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-12 20:00:00', '2025-06-12 22:00:00');

INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-13 08:00:00', '2025-06-13 11:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-13 09:15:00', '2025-06-13 11:45:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-13 12:00:00', '2025-06-13 14:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-13 14:30:00', '2025-06-13 17:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-13 16:00:00', '2025-06-13 18:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-13 17:30:00', '2025-06-13 20:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (1, '1', '2025-06-13 19:00:00', '2025-06-13 21:00:00');
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES (2, '1', '2025-06-13 20:00:00', '2025-06-13 22:00:00');


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

-- 50 INSERTS PARA O SENSOR 12
INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES
(12, '1', '2025-06-06 10:00:00', '2025-06-06 10:10:00'),
(12, '1', '2025-06-06 10:15:00', '2025-06-06 10:30:00'),
(12, '1', '2025-06-06 10:35:00', '2025-06-06 10:48:00'),
(12, '1', '2025-06-06 10:50:00', '2025-06-06 11:03:00'),
(12, '1', '2025-06-06 11:05:00', '2025-06-06 11:20:00'),
(12, '1', '2025-06-06 11:25:00', '2025-06-06 11:37:00'),
(12, '1', '2025-06-06 11:40:00', '2025-06-06 11:55:00'),
(12, '1', '2025-06-06 12:00:00', '2025-06-06 12:12:00'),
(12, '1', '2025-06-06 12:15:00', '2025-06-06 12:28:00'),
(12, '1', '2025-06-06 12:30:00', '2025-06-06 12:42:00'),
(12, '1', '2025-06-06 12:45:00', '2025-06-06 12:58:00'),
(12, '1', '2025-06-06 13:00:00', '2025-06-06 13:14:00'),
(12, '1', '2025-06-06 13:15:00', '2025-06-06 13:28:00'),
(12, '1', '2025-06-06 13:30:00', '2025-06-06 13:45:00'),
(12, '1', '2025-06-06 13:50:00', '2025-06-06 14:03:00'),
(12, '1', '2025-06-06 14:05:00', '2025-06-06 14:18:00'),
(12, '1', '2025-06-06 14:20:00', '2025-06-06 14:32:00'),
(12, '1', '2025-06-06 14:35:00', '2025-06-06 14:48:00'),
(12, '1', '2025-06-06 14:50:00', '2025-06-06 15:03:00'),
(12, '1', '2025-06-06 15:05:00', '2025-06-06 15:20:00'),
(12, '1', '2025-06-06 15:25:00', '2025-06-06 15:38:00'),
(12, '1', '2025-06-06 15:40:00', '2025-06-06 15:55:00'),
(12, '1', '2025-06-06 16:00:00', '2025-06-06 16:14:00'),
(12, '1', '2025-06-06 16:15:00', '2025-06-06 16:28:00'),
(12, '1', '2025-06-06 16:30:00', '2025-06-06 16:43:00'),
(12, '1', '2025-06-06 16:45:00', '2025-06-06 16:58:00'),
(12, '1', '2025-06-06 17:00:00', '2025-06-06 17:12:00'),
(12, '1', '2025-06-06 17:15:00', '2025-06-06 17:27:00'),
(12, '1', '2025-06-06 17:30:00', '2025-06-06 17:45:00'),
(12, '1', '2025-06-06 17:50:00', '2025-06-06 18:03:00'),
(12, '1', '2025-06-06 18:05:00', '2025-06-06 18:20:00'),
(12, '1', '2025-06-06 18:25:00', '2025-06-06 18:38:00'),
(12, '1', '2025-06-06 18:40:00', '2025-06-06 18:55:00'),
(12, '1', '2025-06-06 19:00:00', '2025-06-06 19:12:00'),
(12, '1', '2025-06-06 19:15:00', '2025-06-06 19:28:00'),
(12, '1', '2025-06-06 19:30:00', '2025-06-06 19:43:00'),
(12, '1', '2025-06-06 19:45:00', '2025-06-06 20:00:00'),
(12, '1', '2025-06-06 20:05:00', '2025-06-06 20:20:00'),
(12, '1', '2025-06-06 20:25:00', '2025-06-06 20:38:00'),
(12, '1', '2025-06-06 20:40:00', '2025-06-06 20:55:00'),
(12, '1', '2025-06-06 21:00:00', '2025-06-06 21:12:00'),
(12, '1', '2025-06-06 21:15:00', '2025-06-06 21:28:00'),
(12, '1', '2025-06-06 21:30:00', '2025-06-06 21:42:00'),
(12, '1', '2025-06-06 21:45:00', '2025-06-06 21:58:00'),
(12, '1', '2025-06-06 22:00:00', '2025-06-06 22:13:00'),
(12, '1', '2025-06-06 22:15:00', '2025-06-06 22:27:00'),
(12, '1', '2025-06-06 22:30:00', '2025-06-06 22:43:00'),
(12, '1', '2025-06-06 22:45:00', '2025-06-06 22:58:00'),
(12, '1', '2025-06-06 23:00:00', '2025-06-06 23:13:00'),
(12, '1', '2025-06-06 23:15:00', '2025-06-06 23:29:00'),
(12, '1', '2025-06-06 23:30:00', '2025-06-06 23:45:00');

INSERT INTO TB_Registros (fkSensor, ativo, data_entrada, data_saida) VALUES
(12, '1', '2025-06-06 14:00:00', '2025-06-06 14:12:00');

-- SELECT TEMPO PERMANÊNCIA SENSOR 12
SELECT 
    idProvador,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)), 2) AS media_permanencia_minutos
FROM VW_Dashboard
WHERE idProvador = 12
  AND TIMESTAMPDIFF(MINUTE, data_entrada, data_saida) BETWEEN 1 AND 30;

SELECT COUNT(*) AS total_usuarios
FROM TB_Registros
WHERE fkSensor = 12
AND DATE(data_entrada) = '2025-06-06';

  

-- VIEW
CREATE VIEW VW_Dashboard AS
SELECT
	r.fkSensor, r.ativo, r.data_entrada, r.data_saida,
    s.status_sensor,
    p.idProvador, p.idEmpresa, p.secao
FROM TB_Registros r JOIN TB_Sensores s 
ON r.fkSensor = s.idSensor
JOIN TB_Provadores p 
ON p.fkSensor = s.idSensor;

-- SELECT HORÁRIO DE PICO PROVADOR 1
SELECT 
    HOUR(data_entrada) AS hora_pico,
    COUNT(*) AS total_entradas
FROM VW_Dashboard
WHERE idProvador = 1
  AND data_entrada >= '2025-05-23 00:00:00'
  AND data_entrada <  '2025-05-24 00:00:00'
GROUP BY HOUR(data_entrada)
ORDER BY total_entradas DESC
LIMIT 1;

-- SELECT PROVADOR 1 FLUXO DE VISITANTES
SELECT 
    idProvador,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)), 2) AS media_permanencia_minutos
FROM VW_Dashboard
WHERE idProvador = 1
AND data_entrada >= '2025-05-23 00:00:00'
  AND data_entrada <  '2025-05-24 00:00:00';
  
/* 
	PROVADOR 1
FLUXO DE VISITANTES EXCLUINDO DADOS EXTREMOS (
UPDATE TB_Registros
SET data_saida = '2025-05-23 13:59:47'
WHERE idRegistro = 1
;)
*/
SELECT 
    idProvador,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)), 2) AS media_permanencia_minutos
FROM VW_Dashboard
WHERE idProvador = 1
  AND data_entrada >= '2025-05-23 00:00:00'
  AND data_entrada <  '2025-05-24 00:00:00'
  AND TIMESTAMPDIFF(MINUTE, data_entrada, data_saida) BETWEEN 1 AND 30;
  
  -- SELECT TEMPO MÉDIO DE CADA PROVADOR
  SELECT 
    idProvador,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)), 2) AS media_permanencia_minutos
FROM VW_Dashboard
WHERE TIMESTAMPDIFF(MINUTE, data_entrada, data_saida) BETWEEN 1 AND 30
GROUP BY idProvador
ORDER BY idProvador;








