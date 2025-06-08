
var database = require("../database/config");


function buscarFemininoMasculino(idEmpresa, inicio, fim) {

    var instrucaoSql = `SELECT
    COUNT(CASE WHEN secao = 'Masculino' THEN ativo END) AS Masculino,
    COUNT(CASE WHEN secao = 'Feminino' THEN ativo END) AS Feminino
    FROM VW_Dashboard
    WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59';`;

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
    SELECT 
        idProvador,
        SUM(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)) AS tempo_permanencia_minutos
    FROM VW_Dashboard
    WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59'
    GROUP BY idProvador
    ORDER BY idProvador;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHorarioPico(idEmpresa, inicio, fim) {

    var instrucaoSql = `
    SELECT 
	    HOUR(data_entrada) AS hora_do_dia, 
        COUNT(*) AS provadores_ocupados
    FROM VW_Dashboard
    WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${inicio} 00:00:00' AND '${fim} 23:59:59'
    GROUP BY HOUR(data_entrada)
    ORDER BY HOUR(data_entrada);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// ----------------------- KPI ----------------------------------

// KPI 1
function buscarHorarioPicoKPI(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model para KPI 1');

    var instrucaoSql = `
            SELECT 	
                DATE_FORMAT(data_entrada, '%H:%i') AS horario_de_pico,
                COUNT(*) AS Registros
            FROM VW_Dashboard
            WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${data_entrada} 00:00:00' AND '${data_saida} 23:59:59'
            GROUP BY DATE_FORMAT(data_entrada, '%H:%i')
            ORDER BY COUNT(*) DESC
            LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

// KPI 2
function buscarFluxoVisitanteKPI(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model para KPI 2');

    var instrucaoSql = `
            SELECT
                COUNT(data_saida) AS fluxo_visitantes
            FROM VW_Dashboard 
            WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${data_entrada} 00:00:00' AND '${data_saida} 23:59:59';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

// KPI 3
function buscarTempoParmanenciaKPI(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model para KPI 3');

    var instrucaoSql = `
            SELECT 
                CONCAT(TRUNCATE(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida)) ,0), 'min',
                LPAD(TRUNCATE(AVG(TIMESTAMPDIFF(SECOND, data_entrada, data_saida) % 60), 0), 2, '0')) AS tempo_medio
            FROM VW_Dashboard
            WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${data_entrada} 00:00:00' AND '${data_saida} 23:59:59';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

// KPI 4
function buscarSecaoMaisVisitadaKPI(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model para KPI 3');

    var instrucaoSql = `
            SELECT
                secao AS secao,
                COUNT(ativo) AS Dados
            FROM VW_Dashboard
            WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${data_entrada} 00:00:00' AND '${data_saida} 23:59:59'
            GROUP BY p.secao
            ORDER BY Dados desc
            LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

// quartis

function buscarQuartilFluxo(idEmpresa) {
    console.log('Acessei o model para quartil permanencia!');

    var instrucaoSql = `
        SELECT DATE(r.data_entrada) AS dia, COUNT(*) AS total_visitas
        FROM TB_Registros r
        JOIN TB_Sensores s ON r.fkSensor = s.idSensor
        JOIN TB_Provadores p ON p.fkSensor = s.idSensor
        JOIN TB_Empresas e ON e.idEmpresa = p.idEmpresa
        WHERE e.idEmpresa = ${idEmpresa}
        GROUP BY dia
        ORDER BY total_visitas;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function buscarQuartilPermanencia(idEmpresa){
    console.log('Acessei a model para o quartil permanencia!')

    var instrucaoSql = `
    SELECT DATE(data_entrada) AS dia, FLOOR(AVG(TIMESTAMPDIFF(MINUTE, data_entrada, data_saida))) AS tempo_medio_minutos
    FROM VW_Dashboard
    WHERE idEmpresa = ${idEmpresa}
    GROUP BY dia ORDER BY dia;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    // GRÁFICOS
    buscarFemininoMasculino,
    buscarMediaSecao,
    buscarPermanencia,
    buscarHorarioPico,

    // KPIs
    buscarHorarioPicoKPI,
    buscarFluxoVisitanteKPI,
    buscarTempoParmanenciaKPI,
    buscarSecaoMaisVisitadaKPI,

    // quartis
    buscarQuartilFluxo,
    buscarQuartilPermanencia
}
