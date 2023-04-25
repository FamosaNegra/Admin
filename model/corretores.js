import mongoose from 'mongoose';

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

async function run() {
  // Create a separate connection and register a model on it...
  const conn = mongoose.createConnection();
  conn.model('Corretor', corretoresSchema);

  // But call `mongoose.connect()`, which connects MongoDB's default
  // connection to MongoDB. `conn` is still disconnected.
  await mongoose.connect('mongodb+srv://Admin:%40Ph974985101@databasemc.w2z5piy.mongodb.net/?retryWrites=true&w=majority');

  await conn.model('Corretor').findOne(); // Error: buffering timed out ...
}

run();

const Corretores = mongoose.model('Corretor', corretoresSchema);

export default Corretores;
