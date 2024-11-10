//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const displayResultado = document.querySelector("#resultado")

const botoes = document.querySelectorAll("button")

let ultimoDigito = ""

let ultimoNumero = ""

let penultimoNumero = ""

function calculoResultado(expresaoString) {
    let expressao = expresaoString.replace(/x/g, "*").replace(/÷/g, "/")

    let resultado = math.evaluate(expressao)

    return resultado
}

function imprimirNoHistorico(event) {
    const valorTecla = event.target.innerText

    //trata as teclas numéricas quando clicadas
    if (!isNaN(valorTecla)) {

        //Reseta o display histórico se hover algum aviso nele.
        if (historico.innerHTML === "Digite um número primeiro") {
            historico.innerHTML = ""
        }

        historico.innerHTML += valorTecla;
        ultimoDigito = valorTecla
        ultimoNumero += valorTecla
    }
    
    //trata a tecla de ponto flutuante quando clicadas
    if (valorTecla === ".") {

        //Reseta o display histórico se hover algum aviso nele.
        if (historico.innerHTML === "Digite um número primeiro") {
            historico.innerHTML = ""
        }
        
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
        
        if (ultimoNumero === "(-") {
            //Não faz nada quando o último número é apenas "(-"

            return

        } else {

            //Não permite que o usuário insira uma operação antes de inserir um número
            if (ultimoDigito === "") {
                historico.innerHTML = "Digite um número primeiro"
                ultimoDigito = ""

            } else if (!"+-÷x".includes(ultimoDigito)) {
                //Faz com que o sinal de operação clicado mais recente substitua o que já existe, caso teclas com valor de operações sejam clicadas uma em seguida da outra.
                //e
                //Remove zeros à esquerda e à direita sem valor. 
                //Exemplo.: (00562 + 45) => (562 + 45); (256 - 0.5200) => (256 - 0.52) 

                if (ultimoNumero.startsWith("(-")) {
                    ultimoNumero = ultimoNumero.slice(2)
                    const tamanhoUltimoNumOriginal = ultimoNumero.length
                    const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
                    historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado + valorTecla
                    ultimoDigito = valorTecla
                    penultimoNumero = "(-" + ultimoNumeroFormatado
                    ultimoNumero = ""

                } else {
                    const tamanhoUltimoNumOriginal = ultimoNumero.length
                    const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
                    historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado + valorTecla
                    ultimoDigito = valorTecla
                    penultimoNumero = ultimoNumeroFormatado
                    ultimoNumero = ""
                }

                

            } else {
                historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
                ultimoDigito = valorTecla
                ultimoNumero = ""
            }
        }
    }

    //Trata eventos quando a tecla de sinal de igual "=" é clicada
    if (valorTecla === "=") {

        if (ultimoNumero === "(-") {
            historico.innerHTML = historico.innerHTML.slice(0, -3)
            ultimoDigito = historico.innerHTML.slice(-1)
            ultimoNumero = penultimoNumero

        } else if (historico.innerHTML.includes(")")) {
            //Não faz nada, pois a operação já foi finalizada
            return

        } else {

            if ("+-÷x".includes(ultimoDigito)) {
                //Remove um sinal de operação inserido no final de todos os números, como no exemplo:
                //(15 + 96 -) => (15 + 96)
                historico.innerHTML = historico.innerHTML.slice(0, -1)
                ultimoDigito = historico.innerHTML.slice(-1)
                ultimoNumero = penultimoNumero

            } else {  
                //Formata o último número quando o sinal de igual é clicado.

                if (ultimoNumero.startsWith("(-")) {
                    ultimoNumero = ultimoNumero.slice(2)
                    const tamanhoUltimoNumOriginal = ultimoNumero.length
                    const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
                    historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado
                    ultimoDigito = ultimoNumeroFormatado.slice(-1)
                    ultimoNumero = "(-" + ultimoNumeroFormatado

                } else {
                    const tamanhoUltimoNumOriginal = ultimoNumero.length
                    const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
                    historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado
                    ultimoDigito = ultimoNumeroFormatado.slice(-1)
                    ultimoNumero = ultimoNumeroFormatado
                }
                
            }
        }

        if (historico.innerText.includes("(")) {
            let expressaoFinal = historico.innerText.split("")
            let parentesesNaExpressao = expressaoFinal.filter(caractere => caractere === "(")
            let quantidadeParenteses = parentesesNaExpressao.length

            for (let i = 1; i <= quantidadeParenteses; i++) {
                historico.innerHTML += ")"
            }
 
            //console.log(quantidadeParenteses)
        } 

        let resultadoFinal = calculoResultado(historico.innerText)
        displayResultado.innerHTML = resultadoFinal
        

    }

    //Trata a tecla "C" quando clicada
    if (valorTecla === "C") {
        displayResultado.innerHTML = "0"
        historico.innerHTML = ""
        ultimoDigito = ""
        ultimoNumero = ""
    }

    //Trata a tecla "Backspace"
    if (valorTecla === "⌫") {
        
        
        if (ultimoNumero.startsWith("(-")) {

            if (ultimoNumero === "(-") {
                historico.innerHTML = historico.innerHTML.slice(0, -2)
                ultimoDigito = historico.innerHTML.slice(-1)
                ultimoNumero = ""


            } else if (!isNaN(ultimoDigito) || ultimoDigito === "."){
                historico.innerHTML = historico.innerHTML.slice(0, -1)
                ultimoDigito = historico.innerHTML.slice(-1)
                ultimoNumero = ultimoNumero.slice(0, -1)
            }

        } else {
            historico.innerHTML = historico.innerHTML.slice(0, -1)

            if ("+-÷x".includes(ultimoDigito)) {
                ultimoDigito = historico.innerHTML.slice(-1)
                ultimoNumero = penultimoNumero
    
            } else if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
                ultimoDigito = historico.innerHTML.slice(-1)
                ultimoNumero = ultimoNumero.slice(0, -1)
            }
        }
            
    }

    if (valorTecla === "+/-") {
    
        if (historico.innerText === "") {
            ultimoNumero = "(-"
            historico.innerHTML = ultimoNumero

        } else if (historico.innerText === "(-") {
            ultimoNumero = ""
            historico.innerHTML = ""

        } else if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
            if (ultimoNumero.startsWith("(-")) {
                ultimoNumero = ultimoNumero.slice(2)  //remove o parênteses e o sinal negativo do último número
                historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 2)) + ultimoNumero

            } else {
                ultimoNumero = "(-" + ultimoNumero
                historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length - 2)) + ultimoNumero
            }   

        } else if ("+-÷x".includes(ultimoDigito)) {
            if (ultimoNumero === "") {
                ultimoNumero = "(-" + ultimoNumero
                historico.innerHTML += ultimoNumero

            } else {
                ultimoNumero = ""  //remove o parênteses e o sinal negativo do último número
                historico.innerHTML = historico.innerHTML.slice(0, -2)
            } 
        }
    }

    console.log("historico => " + historico.innerText)
    console.log("penultimoNumero => " + penultimoNumero)
    console.log("ultimoDigito => " + ultimoDigito)
    console.log("ultimoNumero => " + ultimoNumero)
    //console.log(quantidadeParenteses)
}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)