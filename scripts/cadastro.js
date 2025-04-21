function login() {
    window.location = 'login.html'
}
function cadastro() {
    window.location = 'cadastro.html';

// Variáveis do usuário.
var user = inputUser.value;
var email = inputEmail.value;

// Variáveis de senha e confirmação de senha.
var senha = inputSenha.value;
var senhaConfirmar = inputSenhaConfirm.value;

var loja = inputLoja.value;
var cnpj = inputCNPJ.value;
var cidade = inputCidade.value;
var uf = inputUF.value;
var rua = inputRua.value
var numero = inputNumero.value
var cep = inputCEP.value;
var telefone = inputTelefone.value;

if (user == "" || email == "" || telefone == "" || senha == "" || senhaConfirmar == "" || loja == "" || cnpj == "" || cidade == "" || uf == "" || rua == "" || numero == "" || cep == "") {
divResultado.innerHTML = `Todos os campos são obrigatórios.`;

} 

if (senha !== senhaConfirmar) {
divResultado.innerHTML = `As senhas não correspondem.`;
} 

if (validacaoSenha() == false) {
return;
}

alert("Parabéns, sua conta foi registrada.");
window.location = 'login.html'; }

function mascaraTelefone() {
    var mensagem = '';
    var telefone = inputTelefone.value;
    var telefoneTamanho = telefone.length;

    for (var i = 0; i < telefoneTamanho; i++) {

        if (i == 0) {
            mensagem += '(';
        } else if (i == 3) {
            mensagem += ')';
        } else if (i == 4) {
            mensagem += ' ';
        } else if (i == 10) {
            mensagem += '-';
        } else {
            mensagem += telefone[i]
        }
    }
    inputTelefone.value = mensagem;
}

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