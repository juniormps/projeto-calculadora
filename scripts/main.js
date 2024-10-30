//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("button")

let ultimoDigito = ""

let ultimoNumero = ""

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    // Trata as teclas numéricas quando clicadas
    if (!isNaN(valorTecla)) {

        //Trata os zeros à esquerda
        if (ultimoDigito === "0") {

            const digitosNoDisplay = historico.innerText
            const totalDeDigitos = digitosNoDisplay.length
            const penultimoDigito = digitosNoDisplay[totalDeDigitos - 1]

            // Se o penúltimo caractere for uma operação, substitua o último zero
            if ("+-÷x".includes(penultimoDigito)) {
                
                // Atualiza o último número com a remoção de zero à esquerda
                historico.innerHTML = historico.innerHTML.slice(0, -1) + ultimoNumero
                ultimoNumero = valorTecla
                ultimoDigito = valorTecla // Atualiza o último dígito
            
            } else {
                // Se não for uma operação, apenas atualiza o último número normalmente
                historico.innerHTML += valorTecla
                ultimoNumero += valorTecla
                ultimoDigito = valorTecla // Atualiza o último dígito
            }

        } else {
            // Se não houver condição de zero à esquerda, apenas adicione o número
            historico.innerHTML += valorTecla
            ultimoNumero += valorTecla
            ultimoDigito = valorTecla // Atualiza o último dígito
        }

    }
    
    //trata o ponto flutuante
    if (valorTecla === ".") {
        
        //Não permite que um ponto flutuante seja adicionado mais de uma vez no mesmo número
        if (!ultimoNumero.includes(".") && ultimoDigito != ".") {
            
            //Caso um número inicie com pf como (3 + .5), ele é transformado como (3 + 0.5). ou seja, é inserido um zero antes do pf.
           if ("+-÷x".includes(ultimoDigito)) {
                historico.innerHTML += ("0" + valorTecla)
                ultimoDigito = valorTecla  
                ultimoNumero = ("0" + valorTecla)  
                
            } else {  //Caso o pf estiver sendo adicionado no meio de um número, ele é adicionado normalmente.
                historico.innerHTML += valorTecla
                ultimoDigito = valorTecla
                ultimoNumero += valorTecla                   
            }
        }
    }

    //Caso um número termine com pf e seja seguido de uma nova operação, o pf é omitido, como no exemplo: (1 + 6. + 5) => (1 + 6 + 5)
    if ("+-÷x".includes(valorTecla)) {

        if (ultimoDigito === ".") {
            historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }
    }

    //trata as teclas de operações quando clicadas
    if ("+-÷x".includes(valorTecla)) {

        //Não permite que um sinal de operação seja exibido em seguida de outro no visor.
        if (!"+-÷x".includes(ultimoDigito)) {
            historico.innerHTML += valorTecla
            ultimoDigito = valorTecla
            ultimoNumero = ""
        }
    }

    //Caso o último digito do histórico seja uma operação (+-÷x) e após ele seja clicado o sinal de igual (=), o símbolo da operação é apagado.
    if (valorTecla === "=") {

        if ("+-÷x".includes(ultimoDigito)) {
            historico.innerHTML = historico.innerHTML.slice(0, -1)
        }
    }

}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)