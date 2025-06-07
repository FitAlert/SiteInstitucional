var iniciou = false;
var bloquear = true;

function entrar() {
    //   aguardar();

    var emailVar = inputEmail.value;
    var senhaVar = inputSenha.value;

    if (bloquear) {

        if (iniciou == false) {
            iniciou = true;
            tentativas = 0;
        }

        if (emailVar == "" || senhaVar == "") {
            aviso.style.display = "block"
            mostrarAviso("Preencha todos os campos para prosseguir.");
        } else {
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
            })
            .then(function (resposta) {
                console.log("ESTOU NO THEN DO entrar()!")

                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                        sessionStorage.EMAIL_USUARIO = json.email;
                        sessionStorage.NOME_USUARIO = json.nomeUsuario;
                        sessionStorage.ID_USUARIO = json.idUsuario;
                        sessionStorage.ID_EMPRESA = json.fkEmpresa;

                        mostrarAviso(`Login Realizado!`)

                        setTimeout(() => {
                            aviso.style.display = "none"
                        }, 1600)

                        setTimeout(function () {
                            if (emailVar == "admin@admin.com" || senhaVar == "admin1234") {
                                window.location.href = "suporteN3.html";
                            }
                            else{  window.location.href = "dashboard.html";}
                           
                        }, 1500); // apenas para exibir o loading

                    });

                } else {
                    while ((!resposta.ok) && tentativas < 3) {
                        tentativas++;
                        mostrarAviso(`Credenciais incorretas. Tente novamente. Tentativa: ${tentativas}`);
                        break;
                    }

                    if (tentativas >= 3) {
                        mostrarAviso('Máximo de 3 tentativas atingido. Tente novamente mais tarde.');
                        bloquear = false;
                    }

                    console.log("Houve um erro ao tentar realizar o login!");
                }

            })
            .catch(function (erro) {
                console.log(erro);
            })
        }
    }


}


function sumirMensagem() {
    aviso.style.display = "none"
}

function login() {
    window.location = 'login.html'
}

function cadastro() {
    window.location = 'cadastro.html'
}

function mostrarAviso(mensagem) {
    var aviso = document.getElementById("aviso");
    aviso.innerHTML = mensagem;
    aviso.style.display = "flex";
}