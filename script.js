const botao = document.getElementById("salvarNovaTransacao");

if(botao){
    botao.addEventListener("click", function(evento){
    
        evento.preventDefault();
    
        let tipoEntrada = document.getElementById("TipoEntrada").value;
        let Descricao = document.getElementById("Descricao").value;
        let pegarValor = document.getElementById("Valor").value;
        let tipoCategoria = document.getElementById("TipoCategoria").value;
        let dataTransacao = document.getElementById("Data").value;
    
        let transacoes = new Array();
    
        if (localStorage.hasOwnProperty("transacoes")){
            transacoes = JSON.parse(localStorage.getItem("transacoes"));
        }
    
        transacoes.push({Entrada: tipoEntrada, Descricao: Descricao, Valor: pegarValor, Categoria: tipoCategoria, Data: dataTransacao});
    
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    
        //Retornar a listagem de transações:
        window.location.href = "ListaDeTransacao.html";
    
    })
}

//Listagem de Transações (deixei o comentário por estar no mesmo doc java script...)

function excluirTransacao(posicao){
    let transacoes = new Array();

    if(localStorage.hasOwnProperty("transacoes")){
        transacoes= JSON.parse(localStorage.getItem("transacoes"));
    }

    if(transacoes.length){
        transacoes.splice(posicao, 1);
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
        window.location.reload();
    }

}

const listagemDeTransacoes = document.getElementById("listagemTransacao");

if(listagemDeTransacoes){
    let transacoes = new Array();

    if(localStorage.hasOwnProperty("transacoes")){
        transacoes= JSON.parse(localStorage.getItem("transacoes"));
    }

    let itensDaListagemTransacao = transacoes.map((itemTransacao, posicao) => `
        <li class="ItemTransacao ">
            <div class="contentitem ${itemTransacao.Entrada == "Receita"? "ItemTransacaoReceita" : "ItemTransacaoDespesa"}">
                <div class="description">
                    <b>${itemTransacao.Descricao} - R$${itemTransacao.Valor} </b>
                    <div> ${itemTransacao.Categoria} . ${itemTransacao.Data} </div> 
                </div> 
                <div class="AcoesItemTransacao">
                    <button><i class="fi fi-rr-pencil"></i></button>
                    <button onclick="excluirTransacao(${posicao})" ><i class="fi fi-rs-trash"></i></button>
                </div>
            </div>
        </li>
    `)

    listagemDeTransacoes.innerHTML = itensDaListagemTransacao.join("\n");
    
    const registroDeTransacoes = document.getElementById("registroDeTransacoes");
    registroDeTransacoes.innerHTML = `${transacoes.length} transações registradas`;

}

