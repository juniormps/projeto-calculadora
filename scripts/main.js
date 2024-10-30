//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("[tecla-display]")

let ultimoDigito = ""

let ultimoNumero = "" 

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    //trata as teclas numéricas quando clicadas
    if (!isNaN(valorTecla)) {
        historico.innerHTML += valorTecla;
        ultimoDigito = valorTecla
        ultimoNumero += valorTecla
    }
    
    //trata a tecla de ponto flutuante quando clicadas
    if (valorTecla === ".") {
        
        //Não permite que um ponto flutuante seja adicionado mais de uma vez no mesmo número
        if (!ultimoNumero.includes(".") && ultimoDigito != ".") {
            
            //Caso o último digito seja um sinal de operação e um pf seja adicionado em seguida dele, a expressão é transformada como no exemplo: (1 + 6.8 + .5) => (1 + 6.8 + 0.5). Caso contrário, o pf é adicionado normalmente.
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

    //trata as teclas de operações quando clicadas
    if ("+-÷x".includes(valorTecla)) {

        //Não permite que um sinal de operação seja exibido em seguida de outro no visor
        //e
        //Remove zeros à esquerda e à direita após o pf e valores válidos. 
        //Exemplo.: (00562 + 45) => (562 + 45); (256 - 0.5200) => (256 - 0.52) 
        if (!"+-÷x".includes(ultimoDigito)) {
            const tamanhoUltimoNumOriginal = ultimoNumero.length
            const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
            historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado + valorTecla
            
        } else {
            historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
        }

        ultimoDigito = valorTecla
        ultimoNumero = ""
        
        
        //Caso um número termine com pf e seja seguido de uma nova operação, o pf é omitido, como no exemplo: (1 + 6. + 5) => (1 + 6 + 5)
        if (ultimoDigito === "."){
            historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }
    }
}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)