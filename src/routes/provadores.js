var express = require("express");
var router = express.Router();

var provadorController = require("../controllers/provadorController");

router.get("/buscarHorarioPicoProvador/:idEmpresa", function (req, res) {
    provadorController.buscarHorarioPicoProvador(req, res);
});

router.get("/buscarFluxoProvador/:idEmpresa", function (req, res) {
    provadorController.buscarFluxoProvador(req, res);
});

router.get("/buscarDadosGrafico/:idEmpresa", function (req, res) {
    provadorController.buscarDadosGrafico(req, res);
});

router.get("/atualizarTempoReal/:idEmpresa", function (req, res) {
    provadorController.atualizarTempoReal(req, res);
});

module.exports = router;