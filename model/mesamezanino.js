
import mongoose from '../database.js';
import { getApelidos } from './enum.js';

  const MesaMezaninoSchema = new mongoose.Schema({
    andar: {
      type: String,
      enum: ["Mezanino"],
      required: true,
    },
    mesa: {
      type: String,
      type: String,
      enum: Object.keys(
        Array.from({ length: 17 }, (_, i) => ({
          [i + 1]: `${i + 1}`,
        })).reduce((obj, item) => ({ ...obj, ...item }), {})
      ),
      required: true,
    },
    status: {
      type: String,
      enum: ["ocupada", "mba"],
      required: true,
    },
    corretor: {
      type: String,
      enum: await getApelidos(),
      required: false,
    },
    tipomesa: {
      type: String,
      enum: ["venda", "entrevista"],
      required: false,
    },
    cliente: {
      type: String,
      required: true,
    },
    telefone: {
      type: String,
      required: true,
    },
    entrada: {
      type: Date,
      required: true,
    },
    saida: {
      type: Date,
      required: false,
    },
  });
  
  const MesaMezaninoModel = mongoose.model("MesaMezanino", MesaMezaninoSchema);

  (async () => {
    const apelidos = await getApelidos(); // obtem a lista de apelidos dos corretores
    MesaMezaninoModel.schema.path('corretor').enum = apelidos; // define a lista de apelidos como opções para o campo corretor
  })();

  export default MesaMezaninoModel;
