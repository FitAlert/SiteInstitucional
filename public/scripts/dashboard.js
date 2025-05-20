window.onload = () => {
    span_usuario.innerHTML = sessionStorage.NOME_USUARIO;
}

const alerta = document.getElementById('li_alerta');
const boxAlerta = document.getElementById('boxAlerta');

alerta.addEventListener('click', () => {
    const displayAtual = window.getComputedStyle(boxAlerta).display;
    if (displayAtual === 'none') {
        boxAlerta.style.display = 'flex';
    } else {
        boxAlerta.style.display = 'none';
    }
});