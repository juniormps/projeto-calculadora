//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("[tecla-display]")

let ultimoDigito = ""

let ultimoNumero = ""

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    //trata as teclas numéricas
    if (!isNaN(valorTecla)) {
        historico.innerHTML += valorTecla;
        ultimoDigito = valorTecla
        ultimoNumero += valorTecla

    }
    
    //trata a tecla de ponto flutuante
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

    if ("+-÷x".includes(valorTecla)) {

        if (ultimoDigito === "."){
            historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }

       
        
    }

    //trata as teclas de operações
    if ("+-÷x".includes(valorTecla)) {

        //Faz com que números finalizados com ponto flutuante e zero, sejam simplificados sem o pf e o zero. Ex.: a expressão (4 + 5.0 x 8.5) passa a ficar (4 + 5 x 8.5)
        if (ultimoDigito === "0" && ultimoNumero[ultimoNumero.length - 2] === ".") {
            historico.innerHTML = historico.innerHTML.slice(0, -2) + valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }

        //Não permite que um sinal de operação seja exibido em seguida de outro no visor.
        if (!"+-÷x".includes(ultimoDigito)) {
            historico.innerHTML += valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }

        
    }

}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)