let area_cartela = document.getElementById("cartela");
let cartela = document.createElement("table");
let cabecalho_cartela = document.createElement("thead");
let corpo_cartela = document.createElement("tbody");
let linha = document.createElement("tr");
let coluna1 = document.createElement("td");
coluna1.innerText = "B";
let coluna2 = document.createElement("td");
coluna2.innerText = "I";
let coluna3 = document.createElement("td");
coluna3.innerText = "N";
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


for (let i= 0; i < 5; i++) {
    let linha_dados = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
        let td = document.createElement("td");
        td.innerText = Math.ceil(Math.random () * 75);
         linha_dados.appendChild(td);
    }
    corpo_cartela.appendChild(linha_dados);
}

cartela.appendChild(corpo_cartela);
area_cartela.appendChild(cartela);