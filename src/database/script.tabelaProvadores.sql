-- CRIAÇÃO E SELEÇÃO DO BANCO
CREATE DATABASE DB_FitAlert;
USE DB_FitAlert;

-- EMPRESAS
CREATE TABLE TB_Empresas (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL,
    nomeFantasia VARCHAR(45),
    codigo_ativacao CHAR(7) NOT NULL UNIQUE
);

-- ENDEREÇOS
CREATE TABLE TB_Enderecos (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    uf CHAR(2) NOT NULL,
    municipio VARCHAR(45) NOT NULL,
    logradouro VARCHAR(45) NOT NULL,
    numero VARCHAR(5) NOT NULL,
    cep CHAR(8) NOT NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES TB_Empresas(idEmpresa)
);

-- USUÁRIOS
CREATE TABLE TB_Usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    telefone CHAR(11) NOT NULL UNIQUE,
    senha VARCHAR(50) NOT NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkEmpresaUsuario FOREIGN KEY (fkEmpresa) REFERENCES TB_Empresas(idEmpresa),
    CONSTRAINT chkUsuarioEmail CHECK(email LIKE '%@%')
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
    fkSensor INT NOT NULL,
    ativo CHAR(1) NOT NULL,
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_saida DATETIME,
    CONSTRAINT fkRegistroSensor FOREIGN KEY (fkSensor) REFERENCES TB_Sensores(idSensor)
);

-- AVISOS
CREATE TABLE TB_Avisos (
    idAviso INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(150) NOT NULL,
    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES TB_Usuarios(idUsuario)
);

-- VIEW PARA CONSULTAS NA DASHBOARD
CREATE VIEW VW_Dashboard AS
SELECT
	r.fkSensor, r.ativo, r.data_entrada, r.data_saida,
    s.status_sensor,
    p.idProvador, p.idEmpresa, p.secao
FROM TB_Registros r JOIN TB_Sensores s 
ON r.fkSensor = s.idSensor
JOIN TB_Provadores p 
ON p.fkSensor = s.idSensor;

DESC TB_Usuarios;
DESC TB_Empresas;
DESC TB_Sensores;
DESC TB_Provadores;
DESC TB_Registros;
DESC TB_Avisos;
DESC VW_Dashboard;

insert into TB_Sensores Values 
(default, 'Ativo'),
(default, 'Ativo');

-- Inserindo a primeira empresa
INSERT INTO TB_Empresas VALUES (DEFAULT, 'Piticas', '03882576000118', NULL, '1piticas');

-- Inserindo provadores
INSERT INTO TB_Provadores VALUES 
(1, 1, 'masculino', 1),
(2, 1, 'feminino', 2);

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
(DEFAULT, 2, 1, '2025-05-24 09:59:47', '2025-05-24 10:00:47'),
(DEFAULT, 2, 1, '2025-05-23 09:59:47', '2025-05-23 10:00:47'),
(DEFAULT, 2, 1, '2025-05-23 10:59:47', '2025-05-23 11:00:47'),
(DEFAULT, 2, 1, '2025-05-23 11:59:47', '2025-05-23 12:00:47'),
(DEFAULT, 2, 1, '2025-05-23 13:59:47', '2025-05-23 14:00:47'),
(DEFAULT, 2, 1, '2025-05-23 14:59:47', '2025-05-23 15:00:47'),
(DEFAULT, 2, 1, '2025-05-23 16:59:47', '2025-05-23 17:00:47'),
(DEFAULT, 2, 1, '2025-05-23 19:24:47', '2025-05-23 20:00:47');

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

-- SELECT HORÁRIO DE PICO
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

select * from VW_Dashboard;

-- SELECT FLUXO DE VISITANTES
SELECT 
    idProvador,
    ROUND(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)), 2) AS media_permanencia_minutos
FROM VW_Dashboard
WHERE idProvador = 1
AND data_entrada >= '2025-05-23 00:00:00'
  AND data_entrada <  '2025-05-24 00:00:00';


/*
REGRAS DE NEGÓCIO 
- Email deve conter @. 

- 1 Cadastro só pode ter 1 Empresa.
- 1 Empresa pode ser monitorada por vários usuários.
  
- 1 Empresa tem somente 1 Endereço.
- 1 Endereço é de somente 1 Empresa. 

- 1 Empresa pode ter vários Provadores.
- 1 Provador pertence somente a 1 Empresa.
- 1 Provador depende de somente 1 Empresas para existir.
- Seção do provador pode ser somente Masculino, Feminino ou Unissex. 

- 1 Sensor só pode estar em 1 Provador.
- 1 Provador pode ter somente 1 Sensor.
- Sensor só pode ter o status Inativo, Ativo ou Manutenção.  

- 1 Registro é de 1 Sensor.
- 1 Sensor fornece vários Registros.

- 1 Aviso é de somente 1 Usuário.
- 1 Usuário pode receber vários Avisos.
*/