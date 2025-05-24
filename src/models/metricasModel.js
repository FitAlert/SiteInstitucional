
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

module.exports = {
    buscarFemininoMasculino
}
