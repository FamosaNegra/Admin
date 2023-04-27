import mongoose from '../database.js';

const corretoresSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  apelido: {
    type: String,
    required: false,
  },
  gerente: {
    type: String,
    required: true,
  },
  superintendente: {
    type: String,
    required: true,
  },
});

const Corretores = mongoose.model('Corretor', corretoresSchema);

export default Corretores;
