const botao = document.querySelector('#save');

botao.addEventListener("click", function(evento){
    evento.preventDefault();

    const valorEntrada = document.querySelector('#TipoEntrada').value;
    const valorDescricao = document.querySelector('#Descricao').value;
    const pegarValor = document.querySelector('#Valor').value;
    const valorCategoria = document.querySelector('#TipoCategoria').value;
    const valorData = document.querySelector('#Data').value;

    const transacao = {
        Entrada: valorEntrada,
        Descricao: valorDescricao,
        Valor: pegarValor,
        Categoria: valorCategoria,
        Data: valorData
    }

    localStorage.setItem("transacao", JSON.stringify(transacao))
    

})

