function gerarNumerosAleatorios(quantidade, min, max) {

    if (max - min < quantidade) {
        console.log("Não existem números suficientes");
        return;
    }

    let numerosAleatorios = [];

    for (let i = 0; i < quantidade; i++) {
        let numero = Math.ceil(Math.random() * (max - min)) + min;
        if (numerosAleatorios.indexOf(numero) !== -1) {
            i--;
        } else {
            numerosAleatorios.push(numero);
        }
    }

    return numerosAleatorios;

}

function gerarCartelaBingo() {

    let dono = prompt("digite o nome do dono da cartela:");
    let h3dono = document.createElement("h3");
    h3dono.innerText = dono;

    let area_cartela = document.getElementById("cartela");

    let divCartela = document.createElement("div");
    divCartela.appendChild(h3dono);

    divCartela.style.textAlign = "center";
    divCartela.style.fontSize = "24px";


    let cartela = document.createElement("table");
    let cabecalho_cartela = document.createElement("thead");
    let corpo_cartela = document.createElement("tbody");
    let linha = document.createElement("tr");
    let coluna1 = document.createElement("td");
    coluna1.innerText = "B";
    let coluna2 = document.createElement("td");
    coluna2.innerText = "I";
    let coluna3 = document.createElement("td");
    coluna3.innerText = "N"
    let coluna4 = document.createElement("td");
    coluna4.innerText = "G";
    let coluna5 = document.createElement("td");
    coluna5.innerText = "O";

    linha.appendChild(coluna1);
    linha.appendChild(coluna2);
    linha.appendChild(coluna3);
    linha.appendChild(coluna4);
    linha.appendChild(coluna5);

    cabecalho_cartela.appendChild(linha);

    cartela.appendChild(cabecalho_cartela);

    let cartelaBingo = [];
    cartelaBingo.push(gerarNumerosAleatorios(5, 1, 15));
    cartelaBingo.push(gerarNumerosAleatorios(5, 16, 30));
    cartelaBingo.push(gerarNumerosAleatorios(5, 31, 45));
    cartelaBingo.push(gerarNumerosAleatorios(5, 46, 60));
    cartelaBingo.push(gerarNumerosAleatorios(5, 61, 75));

    console.log(cartelaBingo);

    for (let i = 0; i < 5; i++) {
        let linha_dados = document.createElement("tr");
        for (let j = 0; j < 5; j++) {
            let td = document.createElement("td");
            td.innerText = cartelaBingo[j][i];
            linha_dados.appendChild(td);
        }
        corpo_cartela.appendChild(linha_dados);
    }

    cartela.appendChild(corpo_cartela);
    divCartela.appendChild(cartela);

    area_cartela.appendChild(divCartela);
}

var jogoEstaAcontecendo = false;

function deletarCartelas() {

    if(jogoEstaAcontecendo){
        alert("Você não pode limpar as  cartelas enquanto o jogo está acontecendo!");
        return;
    }

    let divCartela = document.getElementById("cartela");
    let divSorteio = document.getElementById("sorteados");
    let cartela = divCartela.getElementsByTagName("table");
    let h3dono = divCartela.getElementsByTagName("h3");
    let spans = divSorteio.getElementsByTagName("span");
    
    while(cartela[0]){
        cartela[0].parentNode.removeChild(cartela[0]);
    }
    while(h3dono[0]){
        h3dono[0].parentNode.removeChild(h3dono[0]);
    }
    while(spans[0]){
        spans[0].parentNode.removeChild(spans[0]);
    }
}




var intervalo;

function sorteio() {

    let cartelas = document.getElementsByTagName("table");

    if (cartelas.length === 0) {
        alert("Você precisa criar uma cartela antes!");
        return;
    }

    let divsorteados = document.getElementById("sorteados");

    let numerosSorteados = []

    let intervalo = setInterval(function () {
        jogoEstaAcontecendo = true;
        intervalo = true
        let aleatorio = 0;
        do {
            aleatorio = Math.ceil(Math.random() * 75);
        } while (numerosSorteados.indexOf(aleatorio) !== -1)

        numerosSorteados.push(aleatorio);
        let numero = document.createElement("span");
        numero.innerText = aleatorio;
        divsorteados.appendChild(numero);
        //Conferir as cartelas
        for (let i = 0; i < cartelas.length; i++) {
            let numerosCartela = cartelas[i].getElementsByTagName("td");
            for (let j = 0; j < numerosCartela.length; j++) {
                if (numerosCartela[j].innerText == aleatorio) {
                    numerosCartela[j].style.backgroundColor = "green";
                }
            }

            if (verificarVencedor(numerosCartela, numerosSorteados)) {
                alert("Parabéns! Você ganhou o bingo!");
                clearInterval(intervalo);
                jogoEstaAcontecendo = false
            }
        }


        if (numerosSorteados.length === 75) clearInterval(intervalo);
    }, 200)

}

function paraJogo(){
    if(jogoEstaAcontecendo){
        clearInterval(intervalo);
        jogoEstaAcontecendo = false;
    }else{
        alert("Não existe nenhum jogo acontecendo!")
    }
}

function verificarVencedor(cartela, numerosSorteados) {
    if (numerosSorteados.length < 25) return;

    cartela = [...cartela];

    cartela.splice(0,5);

    for (let i = 0; i < cartela.length; i++) {
        console.log(numerosSorteados);
        console.log(cartela[i].innerText)
        if(numerosSorteados.indexOf(parseInt(cartela[i].innerText)) == -1){
            return false;
        }
    }

    return true;
}