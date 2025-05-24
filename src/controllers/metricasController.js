var metricasModel = require("../models/metricasModel");

function buscarFemininoMasculino(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var { inicio, fim } = req.query;

    metricasModel.buscarFemininoMasculino(idEmpresa, inicio, fim).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar erros e acertos.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    buscarFemininoMasculino
}