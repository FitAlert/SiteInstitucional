var provadorModel = require("../models/provadorModel");

function buscarHorarioPicoProvador(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!')
    } else if (data_entrada == undefined) {
        console.log('data_entrada está indefinido!')
    } else if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        provadorModel.buscarHorarioPicoProvador(idEmpresa, data_entrada, data_saida)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados do provador individual KPI 1! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
};

function buscarFluxoProvador(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!')
    } else if (data_entrada == undefined) {
        console.log('data_entrada está indefinido!')
    } else if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        provadorModel.buscarFluxoProvador(idEmpresa, data_entrada, data_saida)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados do provador individual KPI 2! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
};

function buscarDadosGrafico(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!')
    } else if (data_entrada == undefined) {
        console.log('data_entrada está indefinido!')
    } else if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        provadorModel.buscarDadosGrafico(idEmpresa, data_entrada, data_saida)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao buscar dados do gráfico do provador! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
};

function atualizarTempoReal(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('idEmpresa está indefinido!');
    } else if (data_entrada == undefined) {
        console.log('data_entrada está indefinido!');
    } else if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        provadorModel.atualizarTempoReal(idEmpresa, data_entrada, data_saida)

            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar os dados do gráfico! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

module.exports = {
    buscarHorarioPicoProvador,
    buscarFluxoProvador,
    buscarDadosGrafico,
    atualizarTempoReal
};