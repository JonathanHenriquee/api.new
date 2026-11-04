// SISTEMA DE BUSCA CEP

// variavel para capturar os dados do formulário
const formCep = document.getElementById("form-cep");

const inputCep = document.getElementById("input-cep");

const resultado = document.getElementById("resultado");

//PASSO 2 - IDENTIFICAR O ENVIO DO FORMULÁRIO 

//addEventListener() permite escutar acontecimentos dentro da página - chamados de eventos 

formCep.addEventListener("submit", function (event) {

    //event.preventDefault() IMPEDE QUE A PÁGINA RECARREGA AUTOMATICAMENTE
    // SE EU RECARREGAR A MINHA PÁGINA, TODOS OS DADOS SOMEM  

    event.preventDefault();


    //PASSO 3 - CAPTURAR O CEP DO USUÁRIO

    // value acessa o conteudo digitado dentro do input
    // O trin remove os espaços em branco que esteja no inicio ou final do texto
    const cep = inputCep.value.trim()

    // PASSO 4 - VALIDAR O CEP 

    /* UMA EXPRESSÃO REGULAR É UMA FORMA DE DEFINIR UM PADRÃO QUE O MEU TEXTO PRECISA SEGUIR 
    ^ - INDICA O INICIO DO TEXTO 
    [0-9] - PERMITE QUALQUER NÚMERO DE 0 ATÉ 9
    {8} - EXIGE EXATAMENTE 8 NÚMEROS 
    $ - INDICA O FINAL DO TEXTO

    ESSE PADRÃO ACEITA SOMENTE CEPs QUE TENHA SOMENTE 8 NÚMEROS
    
    
    */
    const validacaoCep = /^[0-9]{8}$/;

    // PASSO 5 - VERIFICAR SE O CEP É VALIDO

    // IF É UMA ESTRUTURA CONDICIONAL 
    // ela permite executar uma bloc de código somente quando a condição for verdadeira

    // ! - significa NÃO, portanto estamos verificando se o CEP NÃO  corresponde ao padrão. 
    if (!validacaoCep.test(cep)) {
        resultado.innerHTML = '<p class="erro"> Por favor, digite um CEP válido com 8 números . </p>'

        // return encerra a execução da função naquele momento
        // impede que o sistema tente consultar a API quando o CEP não passou pela validação
        return

    }

    // MOSTRAR MENSAGEM CARREGAMENTO

    resultado.innerHTML = "<p> Buscando... </p>"

    // PASSO 7 - CONSUMIR A API VIA CEP

    // api é um sistema que serve para conversar com outros  
    // PARA SOLICITAR OU COMPARTILHAR INFORMAÇÕES 


    // fetch() é uma função utilizada para requisições, externas. Nesse caso uma API
    fetch(`https://viacep.com.br/ws/${cep}/json/`)

        // PASSO 8 - TRANSFORMAR A RESPOSTAS DA API EM JSON

        .then(response => response.json())

        // PASSO 9 - RECEBER OS DADOS DO ENDEREÇO

        .then(data => {
            // passo 10 - verifica se o CEP foi encontrado
            if (data.erro) {
                resultado.innerHTML = '<p class="erro"> Cep não encontrado </p>'
                return
            }

            // PASSO 11 - mostra os dados na tela

            resultado.innerHTML = `
<h2> Resultado: </h2>

<p><strong>CEP:</strong> ${data.cep} </p>
<p><strong>Logradouro:</strong> ${data.logradouro || "Não Informado"} </p>
<p><strong>Bairro:</strong> ${data.bairro || "Não Informado"} </p>
<p><strong>Cidade:</strong> ${data.localidade || "Não Informado"} </p>
<p><strong>Estado:</strong> ${data.uf || "Não Informado"} </p>
`

        })
        .catch(() => {
            resultado.innerHTML = '<p class="erro"> Erro ao buscar o CEP. Tente novamente mais tarde.'
        })
});

