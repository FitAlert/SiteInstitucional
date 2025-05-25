var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/buscarFemininoMasculino/:idEmpresa", function (req, res) {
    metricasController.buscarFemininoMasculino(req, res);
});

router.get("/buscarSecaoMaisVisitada/:idEmpresa", function (req, res) {
    metricasController.buscarSecaoMaisVisitada(req, res);
})


module.exports = router;