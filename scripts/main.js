//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("[tecla-display]")

let ultimoDigito = ""

let ultimoNumero = ""

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    //trata como o valor das teclas numéricas aparecerão no visor histórico
    if (!isNaN(valorTecla)) {
        historico.innerHTML += valorTecla;
        ultimoDigito = valorTecla
        ultimoNumero += valorTecla

    }
    
    //trata como o ponto flutuante aparecerá no visor histórico
    if (valorTecla === ".") {
    
        if (!ultimoNumero.includes(".") && ultimoDigito != ".") {
            
           if ("+-÷x".includes(ultimoDigito)) {
                historico.innerHTML += ("0" + valorTecla)
                ultimoDigito = valorTecla  
                ultimoNumero = ("0" + valorTecla)  
                
            } else {
                historico.innerHTML += valorTecla
                ultimoDigito = valorTecla
                ultimoNumero += valorTecla                   
            }
        }
    }

    if ("+-÷x".includes(valorTecla) && ultimoDigito === ".") {
        historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
        ultimoDigito = valorTecla
        ultimoNumero = ""
    }

    //trata como o valor das teclas de operações aparecerão no visor histórico
    if ("+-÷x".includes(valorTecla)) {

        if (!"+-÷x".includes(ultimoDigito)) {
            historico.innerHTML += valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }
    }

}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)