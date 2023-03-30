//Configuração do Lightbox
lightbox.option({
    'imageFadeDuration': 300,
    'FadeDuration': 300,
    'albumLabel': "Foto %1 do total de %2",
    'resizeDuration': 300
})

// Inicialização do plugin AOS Animate
AOS.init();

// Tratamento do campo range
// Função de execução automática
(() => {
    //variáveis para selecionar os elementos
    const FIELD_IDADE = document.getElementById('idade')
    const TXT_IDADE = document.getElementById('txt-idade')
    //txt-idade mostra o valor do campo idade
    TXT_IDADE.innerText = FIELD_IDADE.value

    FIELD_IDADE.addEventListener('change', () => {
        TXT_IDADE.innerText = FIELD_IDADE.value
    })
})()

// Tratamento para os campos Estado e Cidade
const URL_ESTADO = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
var estados = document.getElementById('estados')

// O pimeiro .then capitura os dados na variàvel response
// O segundo .then tratata os dados recebidos
// E o .cath vai tratar os erros
//fetch(url).then(response).then(json).catch(erro)
fetch(URL_ESTADO).then(response => response.json()).then(
    json => {
        // Inicia a variável options com os itens da lista 
        let options = '<option>Selecione um estado</option>'

        // Laço para CONCATENAR a variável com todos os estados
        for (const i in json) {
            options += `<option value="${json[i].id}">${json[i].nome}</option>`
        }
        // Mostra dentro do select estados
        estados.innerHTML = options
    }

).catch(erro => { alert('Houve um erro na consulta: ' + erro) })


// Quando o campo estados for atualizado, o campo cidades será preenchido
estados.addEventListener('change', () => {
    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estados.value}/municipios`
    let cidades = document.getElementById('cidades')
    let options = '<option>Selecione uma cidade</option>'

    fetch(url).then(response => response.json()).then(json => {
        for (const i in json) {
            options += `<option value="${json[i].nome}">${json[i].nome}</option>`
        }
        cidades.innerHTML = options
    }).catch(erro => alert('Erro na conexão -' + erro))


})



