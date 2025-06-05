var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/buscarFemininoMasculino/:idEmpresa", function (req, res) {
    metricasController.buscarFemininoMasculino(req, res);
});

router.get("/buscarMediaSecao/:idEmpresa", function (req, res) {
    metricasController.buscarMediaSecao(req, res);
})

router.get("/buscarPermanencia/:idEmpresa", function (req, res) {
    metricasController.buscarPermanencia(req, res);
})

router.get("/buscarHorarioPico/:idEmpresa", function (req, res) {
    metricasController.buscarHorarioPico(req, res);
})

// ---------- KPI ------------

router.get("/buscarHorarioPicoKPI/:idEmpresa", function (req, res) {
    metricasController.buscarHorarioPicoKPI(req, res);
});

router.get("/buscarFluxoVisitanteKPI/:idEmpresa", function (req, res) {
    metricasController.buscarFluxoVisitanteKPI(req, res);
});

router.get("/buscarTempoParmanenciaKPI/:idEmpresa", function (req, res) {
    metricasController.buscarTempoParmanenciaKPI(req, res);
});

router.get("/buscarSecaoMaisVisitadaKPI/:idEmpresa", function (req, res) {
    metricasController.buscarSecaoMaisVisitadaKPI(req, res);
});

module.exports = router;