function login() {
    window.location = 'login.html'
};

function cadastro() {
    window.location = 'cadastro.html'
};

function vincular() {
    var lojaVar = inputLoja.value;
    var cnpjVar = inputCNPJ.value;
    var cidadeVar = inputCidade.value;
    var ufVar = inputUF.value;
    var ruaVar = inputRua.value
    var numeroVar = inputNumero.value
    var cepVar = inputCEP.value;

    if (
        lojaVar == "" ||
        cnpjVar == "" ||
        cidadeVar == "" ||
        ufVar == "" ||
        ruaVar == "" ||
        numeroVar == "" ||
        cepVar == ""
    ) {
        alert('Todos os campos são obrigatórios.');
    } else {
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