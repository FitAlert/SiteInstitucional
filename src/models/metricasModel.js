
var database = require("../database/config");


function buscarFemininoMasculino(idEmpresa, inicio, fim) {

    var instrucaoSql = `SELECT
    COUNT(CASE WHEN p.secao = 'Masculino' THEN r.ativo END) AS Masculino,
    COUNT(CASE WHEN p.secao = 'Feminino' THEN r.ativo END) AS Feminino
    FROM tb_registros r
    JOIN tb_sensores s 
    ON r.fkSensor = s.idSensor
    JOIN tb_provadores p 
    ON p.fkSensor = s.idSensor
    WHERE p.idEmpresa = ${idEmpresa} AND r.data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMediaSecao(idEmpresa, inicio, fim) {
    var instrucaoSql = `
    SELECT p.idProvador,COUNT(r.idRegistro) AS total_visitas
    FROM TB_Provadores p
    JOIN TB_Sensores s ON p.fkSensor = s.idSensor
    LEFT JOIN TB_Registros r 
    ON s.idSensor = r.fkSensor 
    AND r.data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59'
    WHERE p.idEmpresa = ${idEmpresa}
    GROUP BY p.idProvador;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarPermanencia(idEmpresa, inicio, fim) {
    var instrucaoSql = `
    SELECT p.idProvador,SUM(TIMESTAMPDIFF(MINUTE, r.data_entrada, r.data_saida)) AS tempo_permanencia_minutos
    FROM TB_Provadores p
    JOIN TB_Sensores s ON p.fkSensor = s.idSensor
    JOIN TB_Registros r ON s.idSensor = r.fkSensor
    WHERE p.idEmpresa = ${idEmpresa} AND r.data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59'
    GROUP BY p.idProvador
    ORDER BY p.idProvador;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHorarioPico(idEmpresa, inicio, fim) {

    var instrucaoSql = `
    SELECT HOUR(r.data_entrada) AS hora_do_dia, COUNT(DISTINCT r.fkSensor) AS provadores_ocupados
    FROM TB_Registros r
    JOIN TB_Sensores s ON r.fkSensor = s.idSensor
    JOIN TB_Provadores p ON s.idSensor = p.fkSensor
    WHERE r.ativo = '1' AND p.idEmpresa = ${idEmpresa} AND r.data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59'
    GROUP BY hora_do_dia
    ORDER BY hora_do_dia;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarFemininoMasculino,
    buscarMediaSecao,
    buscarPermanencia,
    buscarHorarioPico
}
