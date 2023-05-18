import mongoose from '../database.js';

const interacaoSchema = new mongoose.Schema({
  interacao: {
    ator: String,
    codigo: String,
    data: Date,
    dataFull: Date,
    inclusaoData: Date,
    inclusaoDataFull: Date,
    conclusaoData: Date,
    conclusaoDataFull: Date,
    dataPeriodo: String,
    realizada: Boolean,
    midia: String,
    peca: String,
    produto: String,
    agencia: String,
    pecaMarketing: String,
    campanhaMarketing: String,
    canal: String,
    usuarioIncluiu: String,
    usuarioRealizou: String
  },
  grupo: String,
  grupoHierarquia: String,
  usuario: {
    atendendo: String,
    emailAtendendo: String,
    criouAtendimento: String
  },
  atendimento: {
    codigo: String,
    status: String,
    dataCriacao: Date,
    dataCriacaoFull: Date,
    dataInicio: Date,
    dataInicioFull: Date,
    dataConclusao: Date,
    classificacao: String,
    classificacaoGrupo: String,
    conversao: String,
    diasSemInteracao: Number,
    motivoNaoConversao: String,
    comissao: Number,
    valorNegocio: Number
  },
  campanha: String,
  canal: String,
  meio: String,
  midia: String,
  tipoMidia: String,
  peca: String,
  campanhaPeca: String,
  grupoPeca: String,
  marca: String,
  produto: {
    nome: String,
    sub: String,
    uf: String
  },
  prospect: {
    name: String,
    dataCadastro: Date,
    telefone: String,
    email: String
  },
  usuarioDataPrimeira: String,
  usuarioDataUltima: String,
  usuarioTipoUltimo: String
});

const Interacao = mongoose.model('Interacao', interacaoSchema);

export default Interacao;
