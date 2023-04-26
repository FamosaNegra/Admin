import mongoose from '../database.js';

const corretoresSchema = new mongoose.Schema({
  CPF: {
    type: String,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
  },
  apelido: {
    type: String,
    required: false,
  },
  data_nasc: {
    type: Date,
    required: true,
  },
  rg: {
    type: String,
    required: true,
  },
  endereco: {
    logradouro: {
      type: String,
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
  },
  imobiliaria: {
    type: String,
    required: true,
  },
});

const Corretores = mongoose.model('Corretor', corretoresSchema);

export default Corretores;
