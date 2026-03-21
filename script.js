const botao = document.getElementById("salvarNovaTransacao");
const botaoCancelarTransacao = document.getElementById("cancelarNovaTransacao");

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

if (botaoCancelarTransacao) {
    botaoCancelarTransacao.addEventListener("click", function (evento){
        evento.preventDefault();

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

if(valorReceita && valorDespesa && valorSaldo){

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
}


const botaoSalvarCategoria = document.getElementById("botaoSalvarCategoria");
const botaoCancelarCategoria = document.getElementById("botaoCancelarCategoria");

if(botaoSalvarCategoria){
    const queryParamEditarCategoria= window.location.href.split("?")?.pop();
    if(!queryParamEditarCategoria.startsWith("posicao")){
        botaoSalvarCategoria.addEventListener("click", (evento)=>{
            evento.preventDefault()
            const tipoDeEntrada = document.getElementById("TipoEntrada").value;
            const descricaoCategoria = document.getElementById("Categoria").value;
    
            let categorias = localStorage.hasOwnProperty("categorias") ? JSON.parse(localStorage.getItem("categorias")) : [];
    
            categorias.push({
                tipoDeEntrada, descricaoCategoria
            });
    
            localStorage.setItem("categorias", JSON.stringify(categorias));
            window.location.href = "Categorias.html";
        })   

    }
}

if (botaoCancelarCategoria) {
    botaoCancelarCategoria.addEventListener("click", function (evento){
        evento.preventDefault();

        window.location.href = "Categorias.html";
    })
}

const listagemReceitaCategorias = document.getElementById("listagemDeReceitasCategoria");
const listagemDespesaCategorias = document.getElementById("listagemDeDespesasCategoria");

function excluirCategoria(posicao) {
    let categorias = new Array();

    if (localStorage.hasOwnProperty("categorias")) {
        categorias = JSON.parse(localStorage.getItem("categorias"));
    }

    if (categorias.length) {
        categorias.splice(posicao, 1);
        localStorage.setItem("categorias", JSON.stringify(categorias));
        window.location.reload();
    }
}

function editarCategoria(posicao){
    /**
     * Ao clicar no botão de editar o arquivo html abaixo vai ser chamada e vai levar para a tela de nova
     * categoria só que junto vai levar a posicao da categoria que vai editar por meio de um `Query Param` para a tela de edição.
     * OBS: Query Param é um tipo de parametro passado em rotas de navegadores para indicar geralmente consulta ou edições de entidades e alguma pagina.
     * Pesquisar mais e ver as aplicações.
     */
    window.location.href = `NovaCategoria.html?posicao=${posicao}`
}

if(listagemReceitaCategorias && listagemDespesaCategorias){
    let categorias = localStorage.hasOwnProperty("categorias") ? JSON.parse(localStorage.getItem("categorias")) : [];
    if(categorias.length){
        let receitas = categorias.filter((item)=> item.tipoDeEntrada == 'Receita').map( (item, posicao) => {
            return `
            <li>
                <div class="descricaoItemCategoria">
                    ${item.descricaoCategoria}
                </div>
                <div class="botaoDeAcoesItemCategoria">
                    <button onclick="editarCategoria(${posicao})"><i class="fi fi-rr-pencil"></i></button>
                <button onclick="excluirCategoria(${posicao})" ><i class="fi fi-rs-trash"></i></button>
                </div>
            </li>
            `
        }).join('\n')

        let despesas = categorias.filter((item)=> item.tipoDeEntrada == 'Despesa').map( (item, posicao) => {
            return `
            <li>
                <div class="descricaoItemCategoria">
                    ${item.descricaoCategoria}
                </div>
                <div class="botaoDeAcoesItemCategoria">
                    <button onclick="editarCategoria(${posicao})"><i class="fi fi-rr-pencil"></i></button>
                <button onclick="excluirCategoria(${posicao})"><i class="fi fi-rs-trash"></i></button>
                </div>
            </li>
            `
        }).join('\n')

        listagemReceitaCategorias.innerHTML = receitas;
        listagemDespesaCategorias.innerHTML = despesas;
    }
}

/**
 * Todo esse bloco que se inicia do if serve para alterar a tela de nova categoria e indicar que seu comportamento
 * Será uma edição quando aquela query param é chamada. (Conceito utilizado em sistemas complexos para realizar edições de entidades.)
 */
/**
 * Esse IF serve só pra saber se o arquivo html que está carregando esse Script é o arquivo de NovaCategoria.html (Esse Id abaixo está lá)
 */
if(document.getElementById("tituloNovaCategoria")){
    /**
     * Como no conceito de desenvolvimento de front só com html, css e js não existe metodos nativos
     * para pegar query param (Todos os frameworks frontend tem métodos eficientes e simples pra fazer o que tive que fazer pra
     * pegar a query param) foi feita uma regra para pegar a url que está aberta e localizar o query param que está nela.
     * essa sequencia de split e pop que faço é para obter justamente o trecho o query param que está dentro da url. 
     */
    const queryParamEditarCategoria= window.location.href.split("?")?.pop();

    /**
     * Verifico nesse IF abaixo se a query param que está lá existe e se ele é o da posição que eu informo (nesse momento a variavel
     * queryParamEditarCategoria vai ter um valor mais ou menos assim: 'posicao=1')
     */
    if(queryParamEditarCategoria.startsWith("posicao")){
        /**
         * pegue a query param e separei o a parte da chave da parte do valor elas são separadas pelo '='. (Sintaxe query param: 'chave=valor')
         * após separar peguei apenas o valor e coloquei na constante posicao para ser usada para localizar o item que vai ser editado. 
         */
        const posicao = queryParamEditarCategoria.split("=").pop()
        /**
         * Como já confirmei pelo IF anterior que o que está ocorrendo é uma edição, então vou personalizar a pagina e mudar o texto dela
         * para um texto que sugira uma edição.
         */
        document.getElementById("tituloNovaCategoria").innerHTML= "Editando Categoria"

        /**
         * tendo a informação de qual posicao tá o valor que vou editar é só carregar o array lá do local storage e acessar a posicao e colcoar de volta nos inputs
         * para visualização e edição dos valores
         */
        let categorias = localStorage.hasOwnProperty("categorias") ? JSON.parse(localStorage.getItem("categorias")) : [];
        let inputEntrada = document.getElementById("TipoEntrada");
        let inputCategoria = document.getElementById("Categoria")
        let botaoSalvarCategoria= document.getElementById("botaoSalvarCategoria")
       
        inputEntrada.value = categorias[posicao].tipoDeEntrada;
        inputCategoria.value = categorias[posicao].descricaoCategoria;

        /**
         * Cria o event listener para substituir aquele de salvar que tinha antes passando uma logica no especifica para edição.
         */
        botaoSalvarCategoria.addEventListener("click", (e) =>{
            e.preventDefault();
            categorias[posicao].tipoDeEntrada = inputEntrada.value;
            categorias[posicao].descricaoCategoria = inputCategoria.value;

            localStorage.setItem("categorias", JSON.stringify(categorias));
            window.location.href = "Categorias.html"
        })
    }
}

const botaoCancelarLimite = document.getElementById("botaoCancelarLimite");

if (botaoCancelarLimite) {
    botaoCancelarLimite.addEventListener("click", function (evento){
        evento.preventDefault();

        window.location.href = "Orcamentos.html";
    })
}