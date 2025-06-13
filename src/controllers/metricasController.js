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

function buscarHorarioPico(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var { inicio, fim } = req.query;

    metricasModel.buscarHorarioPico(idEmpresa, inicio, fim).then(function (resultado) {
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

// --------------------- KPI --------------------------

// KPI 1
function buscarHorarioPicoKPI(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!');
    } if (data_entrada == undefined) {
        console.log('data_entrada está indenifido!');
    } if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        metricasModel.buscarHorarioPicoKPI(idEmpresa, data_entrada, data_saida)
        .then(
            function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar dados da KPI 1",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        )
    }
};

// KPI 2
function buscarFluxoVisitanteKPI(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!');
    } if (data_entrada == undefined) {
        console.log('data_entrada está indenifido!');
    } if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        metricasModel.buscarFluxoVisitanteKPI(idEmpresa, data_entrada, data_saida)
        .then(
            function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar dados da KPI 2",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        )
    }
};

// KPI 3
function buscarTempoParmanenciaKPI(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!');
    } if (data_entrada == undefined) {
        console.log('data_entrada está indenifido!');
    } if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        metricasModel.buscarTempoParmanenciaKPI(idEmpresa, data_entrada, data_saida)
        .then(
            function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar dados da KPI 3",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        )
    }
};

// KPI 4
function buscarSecaoMaisVisitadaKPI(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var data_entrada = req.query.inicio;
    var data_saida = req.query.fim;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!');
    } if (data_entrada == undefined) {
        console.log('data_entrada está indenifido!');
    } if (data_saida == undefined) {
        console.log('data_saida está indefinido!')
    } else {
        metricasModel.buscarSecaoMaisVisitadaKPI(idEmpresa, data_entrada, data_saida)
        .then(
            function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar dados da KPI 4",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        )
    }
};

// QUARTIS

function buscarQuartilFluxo(req, res) {
    var idEmpresa = req.params.idEmpresa;


    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!');
    } else {
        metricasModel.buscarQuartilFluxo(idEmpresa)
        .then(
            function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar dados da KPI 2",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        )
    }
};

function buscarQuartilPermanencia(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        console.log('ID da empresa está indefinido!');
    } else {
        metricasModel.buscarQuartilPermanencia(idEmpresa)
        .then(
            function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve erro ao buscar dados da KPI 2",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
        )
    }
};


// ----------------- COR PROVADOR OCUPADO ------------------

function validarProvador(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        console.log('idEmpresa está indefinido');
    } else {
        metricasModel.validarProvador(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
            }
        )
    }
};

function validarProvador2(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        console.log('idEmpresa está indefinido');
    } else {
        metricasModel.validarProvador2(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
            }
        )
    }
};

// ----- alerta ----- //
function puxarOcioso(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        console.log('idEmpresa está indefinido');
    } else {
        metricasModel.puxarOcioso(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                        "\nHouve erro ao buscar dados da KPI 2",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
            }
        )
    }
}

module.exports = {
    // GRÁFICOs
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
    buscarQuartilPermanencia,

    // Ocupação Provador
    validarProvador,
    validarProvador2,

    // alerta
    puxarOcioso
}
