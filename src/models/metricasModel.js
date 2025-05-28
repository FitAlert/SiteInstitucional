
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


function buscarSecaoMaisVisitada(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model!');

    var instrucaoSql = `
            select
	            p.secao as Secao,
                count(r.ativo) as Dados
            from tb_registros r join tb_sensores s 
                on r.fkSensor = s.idSensor 
            join tb_provadores p 
                on s.idSensor = p.fkSensor
            where p.idEmpresa = ${idEmpresa} and r.data_entrada between '${inicio} 00:00:00' and '${fim} 23:59:59'
            group by p.secao
            order by Dados desc
            limit 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarFemininoMasculino,
    buscarSecaoMaisVisitada,
    buscarMediaSecao
}
