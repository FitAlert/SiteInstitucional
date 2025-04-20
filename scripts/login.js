iniciou = false;

function entrar() 
{
    // Respostas do formulário
    var email = inputEmail.value;
    var passwd = inputSenha.value;

    if(iniciou == false){
        iniciou = true
        var tentativas = 0
    }

    while((email != 'admin@gmail.com' || passwd != 'admin') && tentativas <3){
        tentativas++
        mostrarAviso(`Credenciais incorretas. Tente novamente. Tentativa: ${tentativas}`)
    }

    if(tentativas >= 3)
    {
        mostrarAviso('Máximo de 3 tentativas atingido. Tente novamente mais tarde')
    }

    if (email == 'admin@gmail.com' && passwd == 'admin') 
    {
        alert('Bem vindo!')
        window.location.href = 'index.html'
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