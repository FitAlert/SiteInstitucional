var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER

var mySqlConfig = {
    host: "localhost", //inserir host
    database: "DB_FitAlert", //inserir banco
    user: "FitAlert", // inserir usuario 
    password: "fitalert", // inserir senha 
    port: 3306
};


// var mySqlConfig = {
//     host: "localhost", //inserir host
//     database: "DB_FitAlert", //inserir banco
//     user: "aluno", // inserir usuario 
//     password: "Sptech#2024", // inserir senha 
//     port: 3307
// };

function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);
        conexao.connect();
        conexao.query(instrucao, function (erro, resultados) {
            conexao.end();
            if (erro) {
                reject(erro);
            }
            console.log(resultados);
            resolve(resultados);
        });
        conexao.on('error', function (erro) {
            return ("ERRO NO MySQL SERVER: ", erro.sqlMessage);
        });
    });
}

module.exports = {
    executar
};