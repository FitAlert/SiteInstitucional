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
    var taxaConversaoSemProvador = 0.1;
    var taxaConversaoComProvador = 0.67;

    var ticketComMonitoramento = ticket * aumentoTicket;
    var visitantesConvertidosSemProvador = clientes * taxaConversaoSemProvador;
    var visitantesConvertidosComProvador = clientes * taxaConversaoComProvador;

    // Potencial de aumento no faturamento
    var aumentoFaturamento = (ticketComMonitoramento - ticket) * clientes;

    resultado = `
    <div class="geral">
                <h2>O Que Você Está Perdendo</h2>
                <br><br>
                <span style="color:green;">
                    <b>Aumento no faturamento potencial:</b> R$${aumentoFaturamento.toFixed(2)}
                </span><br><br>
                <span style="color:green;">
                    <b>Aumento no ticket médio:</b> R$${(ticketComMonitoramento - ticket).toFixed(2)}
                </span><br><br>
                <span>
                    <b>Você está perdendo cerca de </b><span style="color:red;"> ${visitantesConvertidosComProvador - visitantesConvertidosSemProvador} clientes</span>
                </span>
            </div>

                <div class="container">
                    <div class="resp1">
                        <h2>1. Sem monitoramento em provadores</h2>
                    
                    
                        <div class="dados">
                            <div class="box">
                                    <div class="label_box">
                                            <b> Ticket médio</b>
                                    </div>
                                    R$${ticket.toFixed(2)}
                            </div>
                            <div class="box">
                                    <div class="label_box">
                                        <b>Visitantes mensais:</b>
                                    </div>
                                    ${clientes}
                            </div>
                    
                            <div class="box">
                                    <div class="label_box" >
                                        <b>Taxa de conversão </b>
                                    </div>
                                     10%
                            </div>
                            <div class="box">
                                    <div class="label_box">
                                        <b>Conversão de clientes</b>
                                    </div>
                                        ${visitantesConvertidosSemProvador} em vendas.
                            </div>
                        </div>
                    </div>
                    
                    <div class="resp2">
                        <h2>2. Com monitoramento no provador de forma otimizada</h2>
                    
                            <div class="dados">
                                <div class="box">
                                    <div class="label_box">
                                        <b>Ticket médio potencial:</b>
                                    </div>
                                    R$${ticketComMonitoramento.toFixed(2)}
                                </div>
                    
                               <div class="box">
                                 <div class="label_box">
                                    <b>Mensal:</b>
                                    </div>
                                 R$${aumentoFaturamento.toFixed(2)}
                                  (2x o valor atual)<br>
                                    </div>
                    
                                <div class="box">
                                    <div class="label_box">
                                        <b>Taxa de conversão:</b>
                                        </div>
                                    67%
                                </div>
                    
                                <div class="box">
                                    <div class="label_box">
                                        <b>Visitantes mensais:</b>
                                    </div>
                                    ${clientes}
                                </div>
                    
                                <div class="box" >
                                    <div class="label_box" >
                                        <b>Conversão de clientes:</b>
                                    </div>
                                    ${visitantesConvertidosComProvador}
                            </div>
                         </div> 
                    </div> 
                </div> 
            `;
    }
    divMensagem.innerHTML = resultado;
}