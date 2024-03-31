const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
//!criando o array itens para o psuh do stringfy JASON
//!setando os valores do storage no array itens caso contrario cria um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//!criando modal
const openModalButton = document.querySelector('#abre-mochila');
const closeModalButton = document.querySelector('#fecha-mochila');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');
const fecha = document.getElementById('fechar');

const toogleModal = ()=>{
    modal.classList.toggle('hide');
    fade.classList.toggle('hide');
}

[openModalButton, closeModalButton, fade, fecha].forEach((el)=>{
    el.addEventListener('click', ()=> toogleModal());
})

form.addEventListener('submit', ()=>{
    alert("Seu item foi criado")
})

//!fim modal

//*exibindo o array
console.log(itens)

//* carrega o array que esta no localStorage no html
itens.forEach((elemento)=>{
    criaElemento(elemento);
});


form.addEventListener('submit', (event)=>{
    //*evitando o comportamento padrão do submit
    event.preventDefault();

    //*setando target.elements
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    //* busca de existencia de algum elemento com id
    const existe = itens.find(elemento => elemento.nome === nome.value);

        //usando target e elements para acessar o objeto com os valores do form digitado
    // console.log(event.target.elements['nome'].value);
    // console.log(event.target.elements['quantidade'].value);

    // * chamando a função cria elemento
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id; 
        // * mostra o ID do elemento que ja existe
        console.log(existe.id);
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else{
        //usando a condição ternário do JJS
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id+1 : 0;
        criaElemento(itemAtual);    
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    //limpando o form
    nome.value = '';
    quantidade.value = '';

});

//!Funão que cria os elementos HTML
function criaElemento(item){

    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    //manipulando o objeto criado
    //novoItem.innerHTML = numeroItem + nome;
        novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    //criando botao deleta com a funão de botaoDeleta
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem)




    //salvando desta forma no local storage salvamos uma informação por vez elas vão sendo sobre-escritas
    //para resolver isso criamos o objeto listaAtual e transformamos em uma string no formato JSON
    //localStorage.setItem('nome', nome);
    //localStorage.setItem('quantidade', quantidade);
};

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
};

function botaoDeleta(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    //o elemento botao deve ja ser criado com o addEventListener
    elementoBotao.addEventListener("click", ()=>{
        console.log(elementoBotao.parentNode, id);
        deletaElemento(elementoBotao.parentNode,id);

    });
    return elementoBotao;
};

function deletaElemento(tag,id){
    //removendo o elemento HTML
    tag.remove();
    //removendo do array
    console.log(id);
    itens.splice(itens.findIndex(elemento => elemento.id === id),1);
    console.log(itens);
    //escrevendo no localStorage com stringify
    localStorage.setItem('itens', JSON.stringify(itens));
};