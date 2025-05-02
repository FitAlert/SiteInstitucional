function login() {
    window.location = 'login.html'
}
function cadastro() {
    window.location = 'cadastro.html'
}


function validarEmail(){
    divEmail.innerHTML = "";
    email = inputEmail.value

    for (i = 0; i < email.length; i++) {
        if(email.includes('@')){
            temArroba = true;
            break;
        }
        else{
            divEmail.innerHTML = `Digite um email válido. <br>`;
        }
    }
}

function validacaoSenha() {
    divResultado.innerHTML = "";
    
    var senha = inputSenha.value;
    var senhaConfirmar = inputSenhaConfirm.value;
    var validacao = true;

    for (i = 0; i < senha.length; i++) {
        if(senha.length < 8){
            divResultado.innerHTML += `A senha deve conter pelo menos 8 caracteres. <br>`;
            validacao = false;
            break;
        }
        else{
            divResultado.innerHTML = ``;
            break;
        }
    }

    if (senhaConfirmar !== senha) {
        divResultado.innerHTML += `As senhas não correspondem.`;
        validacao = false;
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

    // Verificando se há algum campo em branco
    if (
      nomeVar == "" ||
      telefoneVar == "" ||
      emailVar == "" ||
      confirmacaoSenhaVar == ""
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "(Mensagem de erro para todos os campos em branco)";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
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
        senhaServer: senhaVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
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

 function sumirMensagem() {
 cardErro.style.display = "none";
  }