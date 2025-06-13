var database = require("../database/config")

function buscarHorarioPicoProvador(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model do provador individual - KPI 1');

    var instrucaoSql = `
            SELECT 	
                DATE_FORMAT(data_entrada, '%H horas') AS horario_de_pico,
                COUNT(*) AS Registros
            FROM VW_Dashboard
            WHERE idEmpresa = ${idEmpresa} AND data_saida BETWEEN '${data_saida} 00:00:00' AND '${data_entrada} 23:59:59' AND idProvador = 1
            GROUP BY DATE_FORMAT(data_entrada, '%H horas')
            ORDER BY COUNT(*) DESC
            LIMIT 1;
    `;
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function buscarFluxoProvador(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model do provador individual - KPI 2');

    var instrucaoSql = `
            SELECT
                CONCAT(COUNT(data_saida), ' Clientes') AS fluxo_visitantes_provador
            FROM VW_Dashboard 
            WHERE idEmpresa = ${idEmpresa} AND data_saida BETWEEN '${data_saida} 00:00:00' AND '${data_entrada} 23:59:59' AND idProvador = 1;
    `;
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function buscarDadosGrafico(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model do provador individual - Gráfico!');

    var instrucaoSql = `
        SELECT 
            COUNT(*) AS quantidade_visitantes,
            DATE(data_entrada) AS data
        FROM VW_Dashboard
        WHERE idEmpresa = ${idEmpresa} AND idProvador = 1 AND data_saida BETWEEN '${data_saida} 00:00:00' AND '${data_entrada} 23:59:59'
        GROUP BY DATE(data_entrada)
        ORDER BY DATE(data_entrada) DESC
        LIMIT 5;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

function atualizarTempoReal(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model para atualizar o gráfico!');

    var instrucaoSql = `
        SELECT 
            COUNT(*) AS quantidade_visitantes,
            DATE(data_entrada) AS data
        FROM VW_Dashboard
        WHERE idEmpresa = ${idEmpresa} AND idProvador = 1 AND data_saida BETWEEN '${data_saida} 00:00:00' AND '${data_entrada} 23:59:59'
        GROUP BY DATE(data_entrada)
        ORDER BY DATE(data_entrada) DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function sensorInativo(idEmpresa) {
    console.log('Acessei o model! Sensores inativos');

    var instrucaoSql = `
        SELECT idSensor, status_sensor FROM TB_Sensores s JOIN TB_Provadores p ON s.idSensor = p.fkSensor WHERE idEmpresa = ${idEmpresa}; 
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarHorarioPicoProvador,
    buscarFluxoProvador,
    buscarDadosGrafico,
    atualizarTempoReal,
    sensorInativo
};