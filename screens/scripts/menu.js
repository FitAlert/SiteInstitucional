var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.menu');

// Event listener para clicar no botão de menu
menuBtn.addEventListener('click', function ativar() {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
});
