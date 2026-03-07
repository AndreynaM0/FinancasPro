const botao = document.getElementById("save");

botao.addEventListener("click", function(evento){

    evento.preventDefault();

    var valorEntrada = document.getElementById("TipoEntrada").value;
    var valorDescricao = document.getElementById("Descricao").value;
    var pegarValor = document.getElementById("Valor").value;
    var valorCategoria = document.getElementById("TipoCategoria").value;
    var valorData = document.getElementById("Data").value;

    let transacoes = new Array();

    if (localStorage.hasOwnProperty("transacoes")){
        transacoes = JSON.parse(localStorage.getItem("transacoes"));
    }

    transacoes.push({Entrada: valorEntrada, Descricao: valorDescricao, Valor: pegarValor, Categoria: valorCategoria, Data: valorData});

    localStorage.setItem("transacoes", JSON.stringify(transacoes));


})