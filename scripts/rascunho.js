//Faz com que cada número ou operação teclado, seja visualizado no visor

const historico = document.querySelector("#historico") 

const botoes = document.querySelectorAll("button")

let ultimoDigito = ""

let ultimoNumero = "" 

let numerosEOperacoes = []

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

        //Não permite que o usuário insira uma operação antes de inserir um número
        if (ultimoDigito === "") {
            historico.innerHTML = "Digite um número primeiro"
            ultimoDigito = ""
        }

        //Faz com que o sinal de operação clicado mais recente substitua o que já existe, caso teclas com valor de operações sejam clicadas uma em seguida da outra.
        //e
        //Remove zeros à esquerda e à direita sem valor. 
        //Exemplo.: (00562 + 45) => (562 + 45); (256 - 0.5200) => (256 - 0.52) 
         else if (!"+-÷x".includes(ultimoDigito)) {
            const tamanhoUltimoNumOriginal = ultimoNumero.length
            const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
            historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado + valorTecla
            ultimoDigito = valorTecla
            numerosEOperacoes.push(ultimoNumero, valorTecla)
            ultimoNumero = ""
            
        } else {
            historico.innerHTML = historico.innerHTML.slice(0, -1) + valorTecla
            ultimoDigito = valorTecla
            numerosEOperacoes.pop()  //Remove o último sinal de operação, o qual será trocado pelo utual digitado.
            numerosEOperacoes.push(valorTecla)
            ultimoNumero = ""
        }

    }

    

    //Trata eventos quando a tecla de sinal de igual "=" é clicada
    if (valorTecla === "=") {

        //Remove um sinal de operação inserido no final de todos os números, como no exemplo:
        //(15 + 96 -) => (15 + 96)
        if ("+-÷x".includes(ultimoDigito)) {
            historico.innerHTML = historico.innerHTML.slice(0, -1)
            ultimoDigito = historico.innerHTML.slice(-1)
            numerosEOperacoes.pop()
            ultimoNumero = numerosEOperacoes[numerosEOperacoes.length - 1]



        } else {  //Formata o último número quando o sinal de igual é clicado.
            const tamanhoUltimoNumOriginal = ultimoNumero.length
            const ultimoNumeroFormatado = parseFloat(ultimoNumero).toString()
            historico.innerHTML = historico.innerHTML.slice(0, - tamanhoUltimoNumOriginal) + ultimoNumeroFormatado
            ultimoDigito = ultimoNumeroFormatado.slice(-1)
            ultimoNumero = ultimoNumeroFormatado
            numerosEOperacoes.push(ultimoNumero)   //RESOLVER ERRO DA REPETIÇAO DO ÚLTIMO NÚMERO AO APERTAR A TECLA IGUAL REPETIDAMENTE
        }


        if (historico.innerText.includes("(")) {
            let expressaoFinal = historico.innerText.split("")
            let quantidadeParenteses = expressaoFinal.reduce((total, carcterAtual) => carcterAtual === "(" ? total + 1 : total, 0)
            
        }

    }

    //Trata a tecla "C" quando clicada
    if (valorTecla === "C") {
        historico.innerHTML = ""
        ultimoDigito = ""
        ultimoNumero = ""
        numerosEOperacoes = [] //reseta o array para começar uma nova operação
    }

    //Trata a tecla "Backspace"
    if (valorTecla === "⌫") {
        historico.innerHTML = historico.innerHTML.slice(0, -1)
        
        if ("+-÷x".includes(ultimoDigito)) {
            ultimoDigito = historico.innerHTML.slice(-1)
            numerosEOperacoes.pop()
            ultimoNumero = numerosEOperacoes[numerosEOperacoes.length - 1]

        } else if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
            ultimoDigito = historico.innerHTML.slice(-1)
            ultimoNumero = ultimoNumero.slice(0, -1)
            numerosEOperacoes.pop()
            numerosEOperacoes.push(ultimoNumero) //continuar daqui
        }    
    }

    console.log(numerosEOperacoes)
    console.log(ultimoNumero)
    console.log(ultimoDigito)
    console.log(historico.innerText)
}

botoes.forEach(botao => botao.onclick = imprimirNoHistorico)



if (valorTecla === "+/-") {
    let teclaAtivada = false

    if (teclaAtivada === false) {
        if (historico.innerText === "") {
                historico.innerHTML = "(-"
                teclaAtivada = true
        }

        if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
                historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 1))
                historico.innerHTML = historico.innerText + "(-" + ultimoNumero
                teclaAtivada = true
        }

    }
    
    if (teclaAtivada === true) {

    }
    if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
            historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 2))
            historico.innerHTML = historico.innerText + ultimoNumero
            teclaAtivada = false
    }

    /*
    if ("+-÷x".includes(ultimoDigito)) {
        historico.innerHTML += "(-"
    } */
}



if (valorTecla === "+/-") {
    let teclaAtivada = false
    
    if (historico.innerText === "") {
        if (teclaAtivada === false) {
            historico.innerHTML = "(-"
            teclaAtivada = true
        }
    }
        
    if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
        if (teclaAtivada === false) {
            historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 1))
            historico.innerHTML = historico.innerText + "(-" + ultimoNumero
            teclaAtivada = true

        } else if (teclaAtivada === true) {
            historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 2))
            historico.innerHTML = historico.innerText + ultimoNumero
            teclaAtivada = false
        }
        
    }

    /*
    if ("+-÷x".includes(ultimoDigito)) {
        historico.innerHTML += "(-"
    } */
}

if (valorTecla === "+/-") {
    
    if (teclaAterarSinalAtivada === false) {
        if (ultimoDigito === "" && ultimoNumero === "") {
                historico.innerHTML += "(-"
        }

        if (!isNaN(ultimoDigito) || ultimoDigito === ".") {
                historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 1))
                historico.innerHTML = historico.innerText + "(-" + ultimoNumero
        }

        teclaAterarSinalAtivada = true

    } else if (teclaAterarSinalAtivada === true) {
        if (ultimoNumero.startsWith("(-")) {
            historico.innerHTML = historico.innerHTML.slice(0, - (ultimoNumero.length + 2))
            historico.innerHTML = historico.innerText + ultimoNumero
        }

        teclaAterarSinalAtivada = false
    }
    

    /*
    if ("+-÷x".includes(ultimoDigito)) {
        historico.innerHTML += "(-"
    } */
}