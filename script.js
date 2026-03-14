const botao = document.getElementById("salvarNovaTransacao");

if (botao) {
    botao.addEventListener("click", function (evento) {

        evento.preventDefault();

        let tipoEntrada = document.getElementById("TipoEntrada").value;
        let Descricao = document.getElementById("Descricao").value;
        let pegarValor = document.getElementById("Valor").value;
        let tipoCategoria = document.getElementById("TipoCategoria").value;
        let dataTransacao = document.getElementById("Data").value;

        let transacoes = new Array();

        if (localStorage.hasOwnProperty("transacoes")) {
            transacoes = JSON.parse(localStorage.getItem("transacoes"));
        }

        transacoes.push({ Entrada: tipoEntrada, Descricao: Descricao, Valor: pegarValor, Categoria: tipoCategoria, Data: dataTransacao });

        localStorage.setItem("transacoes", JSON.stringify(transacoes));

        //Retornar a listagem de transações:
        window.location.href = "Transacoes.html";

    })
}

//Listagem de Transações (deixei o comentário por estar no mesmo doc java script...)

function excluirTransacao(posicao) {
    let transacoes = new Array();

    if (localStorage.hasOwnProperty("transacoes")) {
        transacoes = JSON.parse(localStorage.getItem("transacoes"));
    }

    if (transacoes.length) {
        transacoes.splice(posicao, 1);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
        window.location.reload();
    }

}

function editarTransacao(posicao) {
    let trasacoes = new Array();

    if (localStorage.hasOwnProperty("transacoes")) {
        transacoes = JSON.parse(localStorage.getItem("transacoes"));
    }

    if (transacoes.length){
        window.location.href = "NovaTransacao.html";
        transacoes.splice(posicao, 1)
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

const listagemDeTransacoes = document.getElementById("listagemTransacao");

if (listagemDeTransacoes) {
    let transacoes = new Array();

    if (localStorage.hasOwnProperty("transacoes")) {
        transacoes = JSON.parse(localStorage.getItem("transacoes"));
    }

    let itensDaListagemTransacao = transacoes.map((itemTransacao, posicao) => `
        <li class="ItemTransacao ">
            <div class="contentitem ${itemTransacao.Entrada == "Receita" ? "ItemTransacaoReceita" : "ItemTransacaoDespesa"}">
                <div class="description">
                    <b>${itemTransacao.Descricao} - R$${itemTransacao.Valor} </b>
                    <div> ${itemTransacao.Categoria} . ${itemTransacao.Data} </div> 
                </div> 
                <div class="AcoesItemTransacao">
                    <button onclick="editarTransacao(${posicao})"><i class="fi fi-rr-pencil"></i></button>
                    <button onclick="excluirTransacao(${posicao})" ><i class="fi fi-rs-trash"></i></button>
                </div>
            </div>
        </li>
    `)

    listagemDeTransacoes.innerHTML = itensDaListagemTransacao.join("\n");

    const registroDeTransacoes = document.getElementById("registroDeTransacoes");
    registroDeTransacoes.innerHTML = `${transacoes.length} transações registradas`;

}

const valorReceita = document.getElementById("valorReceita");
const valorDespesa = document.getElementById("valorDespesa");
const valorSaldo = document.getElementById("valorSaldo");

let transacoes = new Array();

if (localStorage.hasOwnProperty("transacoes")) {
    transacoes = JSON.parse(localStorage.getItem("transacoes"));
}

let somaR = 0;
let somaD = 0;
let somaT = 0;

let somaRD = transacoes.map((itemTransacao) => {
    if (itemTransacao.Entrada == "Receita"){
        let converterValorReceita = parseFloat(itemTransacao.Valor);
        somaR += converterValorReceita;
    }else if (itemTransacao.Entrada == "Despesa"){
        let converterValorDespesa = parseFloat(itemTransacao.Valor);
        somaD += converterValorDespesa;
    }

    somaT = parseFloat(somaR - somaD).toFixed(2);
})
    
valorReceita.innerHTML = `R$${somaR}`;
valorDespesa.innerHTML = `R$${somaD}`;
valorSaldo.innerHTML = `R$${somaT}`;