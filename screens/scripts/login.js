iniciou = false;

function entrar() 
{
    var email = inputEmail.value;
    var senha = inputSenha.value;
    
    var validacao = false;

    if (iniciou == false) {
        iniciou = true;
        tentativas = 0;
    }

    while ((email != 'admin@gmail.com' || senha != 'admin') && tentativas < 3) {
        tentativas++;
        mostrarAviso(`Credenciais incorretas. Tente novamente. Tentativa: ${tentativas}`);
        break;
    }

    if (tentativas >= 3) {
        mostrarAviso('Máximo de 3 tentativas atingido. Tente novamente mais tarde.');
    } else if (email == 'admin@gmail.com' && senha == 'admin') {
        validacaoLogin = true;
    }

    if (validacaoLogin == true) {
        alert('Bem vindo!');
        window.location.href = 'dashboard.html';
    }
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