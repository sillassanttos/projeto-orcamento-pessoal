class Despesa
{
  constructor(ano, mes, dia, tipo, descricao, valor)
  {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados()
  {
    for (let i in this)
    {
      if (this[i] == undefined || this[i] == '' || this[i] == null)
      {
        return false
      }
    }
    return true
  }
}

class Bd
{
  constructor()
  {
    let id = localStorage.getItem('id')

    if (id === null)
    {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  gravar(d)
  {
    let id = this.getProximoId()

    localStorage.setItem(id, JSON.stringify(d))

    localStorage.setItem('id', id)
  }

  recuperarTodosRegistros()
  {
    let despesas = Array()

    let id = localStorage.getItem('id')

    for (let i = 1; i<= id; i++)
    {
      let despesa = JSON.parse(localStorage.getItem(i))

      if (despesas === null) continue

      despesas.push(despesa)
    }
  }
}

let bd = new Bd()

function cadastrarDespesa()
{

  // Recupera as informações da tela
  let ano = document.getElementById('ano')
  let mes = document.getElementById('mes')
  let dia = document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
  let valor = document.getElementById('valor')

  // Adiciona as informacoes da tela no objeto despesa
  let despesas = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  )

  if (despesas.validarDados())
  {
    bd.gravar(despesas)

    document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
    document.getElementById('modal_titulo_div').className = 'modal-header text-success'
    document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
    document.getElementById('modal_btn').innerHTML = 'Voltar'
    document.getElementById('modal_btn').className = 'btn btn-success'

    $('#dialog').modal('show')
  }
  else
  {
    document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
    document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
    document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente.'
    document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
    document.getElementById('modal_btn').className = 'btn btn-danger'

    $('#dialog').modal('show')
  }

}

function carregaListaDespesas()
{
  let despesas = Array()

  despesas = bd.recuperarTodosRegistros()
}

