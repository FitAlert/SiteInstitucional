iniciou = false;

function entrar() {
 //   aguardar();

 var emailVar = inputEmail.value;
 var senhaVar = inputSenha.value;
 var validacao = false;

 if (iniciou == false) {
     iniciou = true;
     tentativas = 0;
 }

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location.href = "dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {
            while ((!resposta.ok) && tentativas < 3) {
                tentativas++;
                mostrarAviso(`Credenciais incorretas. Tente novamente. Tentativa: ${tentativas}`);
                break;
            }
           
            if (tentativas >= 3) {
                mostrarAviso('Máximo de 3 tentativas atingido. Tente novamente mais tarde.');
            }
            
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}

function login(){
    window.location = 'login.html'
}

function cadastro(){
    window.location = 'cadastro.html'
}

function mostrarAviso(mensagem){
    var aviso = document.getElementById("aviso");
    aviso.innerHTML = mensagem;
    aviso.style.display = "block";
}