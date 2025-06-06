function login() {
    window.location = 'login.html'
}
function cadastro() {
    window.location = 'cadastro.html'
}

 // Array para armazenar empresas cadastradas para validação de código de ativação 
 let listaEmpresasCadastradas = [];


function validarEmail(){
    divResultado.innerHTML = "";
    var email = inputEmail.value;
    var res = document.getElementById('divResultado');


    for (i = 0; i < email.length; i++) {
        if(email.includes('@')){
          res.style.display = 'none';
            temArroba = true;
            break;
        }
        else{
          res.style.display = 'flex'
            divResultado.innerHTML = `Digite um email válido. <br>`;
        }
    }
}

function validacaoSenha() {
    divResultado.innerHTML = "";
    
    var senha = inputSenha.value;
    var senhaConfirmar = inputSenhaConfirm.value;
    var res = document.getElementById('divResultado');
    var validacao = true;

    for (i = 0; i < senha.length; i++) {
        if(senha.length < 8){
          res.style.display = 'flex'
            divResultado.innerHTML += `A senha deve conter pelo menos 8 caracteres. <br>`;
            validacao = false;
            break;
        }
        else{
          res.style.display = 'none'
            divResultado.innerHTML = ``;
            break;
        }
    }

    if (senhaConfirmar !== senha) {
          res.style.display = 'flex'

        divResultado.innerHTML += `As senhas não correspondem.`;
        validacao = false;
    } else{
          res.style.display = 'none'

    }
}


function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inputNome.value;
    var telefoneVar = inputTelefone.value;
    var emailVar = inputEmail.value;
    var senhaVar = inputSenha.value;
    var confirmacaoSenhaVar = inputSenhaConfirm.value;
    var codigoVar = inputCodigo.value;
    var idEmpresaVincular

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      telefoneVar == "" ||
      emailVar == "" ||
      confirmacaoSenhaVar == "" ||
      codigoVar == ""
    ) {
      divResultado.style.display = "flex";
      divResultado.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

        // Verificando se o código de ativação é de alguma empresa cadastrada
        for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
          if (listaEmpresasCadastradas[i].codigo_ativacao == codigoVar) {
            idEmpresaVincular = listaEmpresasCadastradas[i].idEmpresa
            console.log("Código de ativação válido.");
            break;
          } else {
            divResultado.style.display = "block";
            divResultado.innerHTML = "(Mensagem de erro para código inválido)";
            finalizarAguardar();
          }
        }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        telefoneServer: telefoneVar,
        senhaServer: senhaVar,
        idEmpresaVincularServer: idEmpresaVincular
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {

          divResultado.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

    // Listando empresas cadastradas 
    function listar() {
      fetch("/empresas/listar", {
        method: "GET",
      })
        .then(function (resposta) {
          resposta.json().then((empresas) => {
            empresas.forEach((empresa) => {
              listaEmpresasCadastradas.push(empresa);
  
              console.log("listaEmpresasCadastradas")
              console.log(listaEmpresasCadastradas[0].codigo_ativacao)
            });
          });
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
    }

 function sumirMensagem() {
 divResultado.style.display = "none";
  }