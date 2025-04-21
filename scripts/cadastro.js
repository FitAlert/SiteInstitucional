function login() {
    window.location = 'login.html'
}

function cadastro() {
// Variáveis do usuário.
var user = inputUser.value;
var email = inputEmail.value;

// Variáveis de senha e confirmação de senha.
var senha = inputSenha.value;
var senhaConfirmar = inputSenhaConfirm.value;

var telefone = inputTelefone.value;

if (user == '' || email == '' || telefone == '' || senha == '' || senhaConfirmar == '') {
alert(`Todos os campos são obrigatórios.`);
} else if (senha !== senhaConfirmar) {
alert(`As senhas não correspondem.`);
} else if (email.includes('@') && (email.includes('.com') || email.includes('.com.br'))){
    alert("Parabéns, sua conta foi registrada.");
    window.location = 'login.html'; 
} else {
    alert('O email não é válido')
};

};

function validarEmail(){
    divEmail.innerHTML = "";
    email = inputEmail.value

    for (i = 0; i < email.length; i++) {
        if(email.includes('@') && (email.includes('.com') || email.includes('.com.br'))){
            temarroba = true;
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
    var validacoesIncorretas = false;

    for (i = 0; i < senha.length; i++) {
        if(senha.length < 8){
            divResultado.innerHTML += `A senha deve conter pelo menos 8 caracteres. <br>`;
            validacoesIncorretas = true;
            break;
        }
        else{
            divResultado.innerHTML = ``;
            break;
        }
    }

    if (senhaConfirmar !== senha) {
        divResultado.innerHTML += `As senhas não correspondem.`;
        validacoesIncorretas = true;
    } 

    return validacoesIncorretas == false;
}