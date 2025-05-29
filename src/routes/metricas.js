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

module.exports = router;