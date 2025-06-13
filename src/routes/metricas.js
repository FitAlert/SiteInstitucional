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

// --------- QUARTIS -----------

router.get("/buscarQuartilFluxo/:idEmpresa", function (req, res) {
    metricasController.buscarQuartilFluxo(req, res);
});

router.get("/buscarQuartilPermanencia/:idEmpresa", function (req, res) {
    metricasController.buscarQuartilPermanencia(req, res);
});

// ------- COR BOTÃO PROVADOR ----------


router.get("/validarProvador/:idEmpresa", function (req, res) {
    metricasController.validarProvador(req, res);
});

router.get("/validarProvador2/:idEmpresa", function (req, res) {
    metricasController.validarProvador2(req, res);
});

// ------------------ alerta ------------ //
router.get("/puxarOcioso/:idEmpresa", function (req, res) {
    metricasController.puxarOcioso(req, res);
});



module.exports = router;