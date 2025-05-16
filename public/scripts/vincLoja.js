function login() {
    window.location = 'login.html'
};

function cadastro() {
    window.location = 'cadastro.html'
};

function maskCNPJ() {
    var cnpj = inputCNPJ.value;
    var cnpjTamanho = cnpj.length;
    var mensagem = '';

    for (var i = 0; i < cnpjTamanho; i++) {
       
        if (i == 2 || i == 6) {
            mensagem += '.';
        } else if (i == 10) {
            mensagem += '/';
        } else if (i == 15) {
            mensagem += '-';
        } else {
            mensagem += cnpj[i]
        }
    }
    inputCNPJ.value = mensagem;
};

function maskUF() {
    var uf = inputUF.value;
    var ufTamanho = uf.length
    var mensagem = '';

    for (var i = 0; i < ufTamanho; i++) {

        if (uf[i] == uf[i].toLowerCase()) {
            mensagem += `${uf[i].toUpperCase()}`;
        } else {
            mensagem += `${uf[i]}`;
        }
    }
    inputUF.value = mensagem;
};

function maskCEP() {
    var cep = inputCEP.value;
    var cepTamanho = cep.length;
    var mensagem = '';

    for (var i = 0; i < cepTamanho; i++) {

        if (i == 5) {
            mensagem += '-';
        } else {
            mensagem += cep[i];
        }
    }
    inputCEP.value = mensagem;
}

function vincular() {
    var lojaVar = inputLoja.value;
    var cnpjVar = inputCNPJ.value;
    var cidadeVar = inputCidade.value;
    var ufVar = inputUF.value;
    var ruaVar = inputRua.value
    var numeroVar = inputNumero.value
    var cepVar = inputCEP.value;

    if (
        lojaVar == '' ||
        cnpjVar == '' ||
        cidadeVar == '' ||
        ufVar == '' ||
        ruaVar == '' ||
        numeroVar == '' ||
        cepVar == ''
    ) {
        alert('Todos os campos são obrigatórios.');
    } else {
        alert('Loja vinculada com sucesso. Bem vindo!');

        fetch("/usuarios/vincular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        lojaServer: lojaVar,
        cnpjServer: cnpjVar,
        cidadeServer: cidadeVar,
        ufServer: ufVar,
        ruaServer:  ruaVar,
        numeroServer: numeroVar,
        cepServer: cepVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        console.log('Sucesso!')

        if (resposta.ok) {
          alert('Loja cadastrada com sucesso! Redirecionando para dashboard...')

          setTimeout(() => {
            window.location = "dashboard.html";
          }, "1500");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        console.log('Erro!')
        finalizarAguardar();
      });

    return false;
  }
};