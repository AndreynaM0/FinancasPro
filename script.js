const botao = document.querySelector('#save');

botao.addEventListener("click", function(evento){
    evento.preventDefault();

    const valorEntrada = document.querySelector('#TipoEntrada').value;
    const valorDescricao = document.querySelector('#Descricao').value;
    const pegarValor = document.querySelector('#Valor').value;
    const valorCategoria = document.querySelector('#TipoCategoria').value;
    const valorData = document.querySelector('#Data').value;

    const entrada = localStorage.setItem("Entrada", valorEntrada);
    const descricao = localStorage.setItem("Descricao", valorDescricao);
    const valor = localStorage.setItem("Valor", pegarValor);
    const categoria = localStorage.setItem("Categoria", valorCategoria);
    const data = localStorage.setItem("Data", valorData);
    

})

