var usuarioModel = require("../models/usuarioModel");
var provadorModel = require("../models/provadorModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
        .then(
            function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json(resultadoAutenticar[0]);
                } 
                else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var telefone = req.body.telefoneServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está indefinido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinido!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, telefone, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function vincular(req, res) {
    var loja = req.body.lojaServer;
    var cnpj = req.body.cnpjServer;
    var cidade = req.body.cidadeServer;
    var uf = req.body.ufServer;
    var rua = req.body.ruaServer;
    var numero = req.body.numeroServer;
    var cep = req.body.cepServer;

     if (loja == undefined) {
        res.status(400).send("Sua loja está indefinida!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu CNPJ está indefinido!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está indefinida!");
    } else if (uf == undefined) {
        res.status(400).send("Seu UF está indefinido!");
    } else if (rua == undefined) {
        res.status(400).send("Sua rua está indefinida!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está indefinido!");
    } else if (cep == undefined) {
        res.status(400).send("Seu CEP está indefinido!");
    } else {

    

    usuarioModel.vincular(loja, cnpj, cidade, uf, rua, numero, cep)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar,
    vincular
}