var express = require("express");
var router = express.Router();

var provadorController = require("../controllers/provadorController");

router.get("/buscarHorarioPicoProvador/:idEmpresa", function (req, res) {
    provadorController.buscarHorarioPicoProvador(req, res);
});

router.get("/buscarFluxoProvador/:idEmpresa", function (req, res) {
    provadorController.buscarFluxoProvador(req, res);
});

module.exports = router;