var database = require("../database/config")

function buscarHorarioPicoProvador(idEmpresa, data_entrada, data_saida) {
    console.log('Acessei o model do provador individual - KPI 1');

    var instrucaoSql = `
            SELECT 	
                DATE_FORMAT(data_entrada, '%H horas') AS horario_de_pico,
                COUNT(*) AS Registros
            FROM VW_Dashboard
            WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${data_saida} 00:00:00' AND '${data_entrada} 23:59:59' AND idProvador = 1
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
            WHERE idEmpresa = ${idEmpresa} AND data_entrada BETWEEN '${data_saida} 00:00:00' AND '${data_entrada} 23:59:59' AND idProvador = 1;
    `;
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

module.exports = {
    buscarHorarioPicoProvador,
    buscarFluxoProvador
};