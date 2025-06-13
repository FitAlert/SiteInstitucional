function login() {
    window.location = 'login.html'
}
function cadastro() {
    window.location = 'cadastro.html'
}

function calcular() {
    var resultado = '';
    var ticket = Number(inputTicket.value);
    var clientes = Number(inputClientes.value);

    if (ticket <= 0 || clientes <= 0) {
        alert("Campos inválidos");
        resultado = '';
    } else {

    // Com base na pesquisa da Alert
    var aumentoTicket = 2;  // Clientes que usam provador dobram o número de itens
    var taxaConversaoSemProvador = 0.25;
    var taxaConversaoComProvador = 0.67;

    var ticketComMonitoramento = ticket * aumentoTicket;
    var visitantesConvertidosSemProvador = clientes * taxaConversaoSemProvador;
    var visitantesConvertidosComProvador = clientes * taxaConversaoComProvador;


    // faturamento sem monitoramneto
    var faturamentoSemMonitoramento = ticket * visitantesConvertidosSemProvador;
    // Potencial de aumento no faturamento
    var aumentoFaturamento = ticketComMonitoramento * visitantesConvertidosComProvador;

    var clientesPerda= visitantesConvertidosComProvador - visitantesConvertidosSemProvador

   resultado = `
    <div class="geral">
        <h2>Monitoramento nos Provadores</h2>
        <p><b style="color: red;">Clientes perdidos:</b> ${clientesPerda.toFixed()}<br> <br>
        <b style="color: green;">Aumento potencial no faturamento:</b> R$${aumentoFaturamento.toFixed(2)}</p>
    </div>

    <div class="graficos-topo">
        <div class="grafico-box">
            <canvas id="graficoFaturamento"></canvas>
        </div>

        <div class="grafico-box">
        <canvas id="graficoConversao"></canvas>
        </div>
    </div>

    <div class="grafico-full">
        <canvas id="graficoTicket"></canvas>
    </div>
    `;

    divMensagem.innerHTML = resultado;

    // Gráfico de Faturamento
    new Chart(document.getElementById('graficoFaturamento'), {
        type: 'bar',
        data: {
            labels: ['Sem Monitoramento', 'Com Monitoramento'],
            datasets: [{
                label: 'Faturamento (R$)',
                data: [faturamentoSemMonitoramento, aumentoFaturamento],
                backgroundColor: ['#e74c3c', '#2ecc71']
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Faturamento Mensal Comparado'
                }
            }
        }
    });

    // Gráfico de Conversão
    new Chart(document.getElementById('graficoConversao'), {
        type: 'bar',
        data: {
            labels: ['Sem Monitoramento', 'Com Monitoramento'],
            datasets: [{
                label: 'Clientes Convertidos',
                data: [visitantesConvertidosSemProvador, visitantesConvertidosComProvador],
                backgroundColor: ['#f39c12', '#2980b9']
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Conversão de Clientes'
                }
            }
        }
    });

    // Gráfico de Ticket Médio
    new Chart(document.getElementById('graficoTicket'), {
        type: 'bar',
        data: {
            labels: ['Sem Monitoramento', 'Com Monitoramento'],
            datasets: [{
                label: 'Ticket Médio (R$)',
                data: [ticket, ticketComMonitoramento],
                backgroundColor: ['#9b59b6', '#1abc9c']
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Comparativo de Ticket Médio'
                }
            }
        }
    });
}
}