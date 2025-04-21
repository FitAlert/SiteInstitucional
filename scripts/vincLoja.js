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
    var loja = inputLoja.value;
    var cnpj = inputCNPJ.value;
    var cidade = inputCidade.value;
    var uf = inputUF.value;
    var rua = inputRua.value
    var numero = inputNumero.value
    var cep = inputCEP.value;

    if (
        loja == '' ||
        cnpj == '' ||
        cidade == '' ||
        uf == '' ||
        rua == '' ||
        numero == '' ||
        cep == ''
    ) {
        alert('Todos os campos são obrigatórios.');
    } else {
        alert('Loja vinculada com sucesso. Bem vindo!');
        window.location = 'index.html';
    }
};