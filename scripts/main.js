//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("[tecla-display]")

let ultimoValor = ""

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    if (!isNaN(valorTecla)) {
        historico.innerHTML += valorTecla;
        ultimoValor = valorTecla

    } else if ("+-÷x".includes(valorTecla)) {

        if (!"+-÷x".includes(ultimoValor)) {
            historico.innerHTML += valorTecla
            ultimoValor = valorTecla
        }
    } else if (valorTecla === ".") {
    
        if (!ultimoValor.includes(".")) {
            historico.innerHTML += valorTecla
            ultimoValor += valorTecla
        }
    }

}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)