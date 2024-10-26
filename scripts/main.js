//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("[tecla-display]")

let ultimoDigito = ""

let ultimoNumero = ""

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    if (!isNaN(valorTecla)) {
        historico.innerHTML += valorTecla;
        ultimoDigito = valorTecla
        ultimoNumero += valorTecla

    } else if ("+-÷x".includes(valorTecla)) {

        if (!"+-÷x".includes(ultimoDigito)) {
            historico.innerHTML += valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }
    } else if (valorTecla === ".") {
    
        if (!ultimoNumero.includes(".") && ultimoDigito != ".") {
            historico.innerHTML += valorTecla
            ultimoDigito = valorTecla
            ultimoNumero += valorTecla
        }
    }

}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)