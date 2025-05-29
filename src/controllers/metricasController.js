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
        console.log("Houve um erro ao busacr dados pro grafico de pizza", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMediaSecao(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var { inicio, fim } = req.query;

    metricasModel.buscarMediaSecao(idEmpresa, inicio, fim).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar dados para o grafico de media.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPermanencia(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var { inicio, fim } = req.query;

    metricasModel.buscarPermanencia(idEmpresa, inicio, fim).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar dados para o grafico de media.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarSecaoMaisVisitada(req, res) { // KPI de Seção mais visitada (gráfico de Pizza)
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.error('ID da empresa está indefinido!')
    } else if (data_entrada == undefined) {
        console.error('Data de entrada está indefinido!')
    } else if (data_saida == undefined) {
        console.error('Data de saída está indefinido!')
    } else {
        metricasModel.buscarSecaoMaisVisitada(idEmpresa, data_entrada, data_saida)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados da seção mais visitada!",
                        erro.sqlMessage
                    );
                }
            )
    }
}


module.exports = {
    buscarFemininoMasculino,
    buscarSecaoMaisVisitada,
    buscarMediaSecao,
    buscarPermanencia
}