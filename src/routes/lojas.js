var express = require("express");
var router = express.Router();

var lojaController = require("../controllers/lojaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    lojaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    lojaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:id", function (req, res) {
  lojaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  lojaController.listar(req, res);
});

module.exports = router;