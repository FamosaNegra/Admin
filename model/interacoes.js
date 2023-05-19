import mongoose from '../database.js';

const interacaoSchema = new mongoose.Schema({
  interacao: {
    interacao: String,
    ator: String,
    data: Date,
    dataFull: Date,
    inclusaoData: Date,
    inclusaoDataFull: Date,
    conclusaoData: Date,
    conclusaoDataFull: Date,
    realizada: Boolean,
    midia: String,
    peca: String,
    produto: String,
    integradoraExterna: String,
    agencia: String,
    pecaMarketing: String,
    campanhaMarketing: String,
    canal: String,
    usuarioIncluiu: String,
    usuarioRealizou: String
  },
  grupo: {
    grupo: String,
    hierarquia: String
  },
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
    convertido: Boolean,
    motivoNaoConversao: String
  },
  campanha: String,
  canal: {
    canal: String,
    meio: String
  },
  midia: {
    midia: String,
    tipo: String
  },
  peca: String,
  marketing: {
    campanhaPeca: String,
    grupoPeca: String
  },
  produto: {
    marca: String,
    nome: String,
    sub: String,
    uf: String
  },
  prospect: {
    nome: String,
    dataCadastro: Date,
    telefone: String,
    email: String,
    cpf: String,
    hashtag: String
  },
  usuarioDataPrimeira: String,
  usuarioDataUltima: String,
  usuarioTipoUltima: String
});

const Interacao = mongoose.model('Interacao', interacaoSchema);

export default Interacao;
