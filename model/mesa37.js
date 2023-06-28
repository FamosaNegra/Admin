import mongoose from '../database.js';
import { getApelidos } from './enum.js';


const mesa37Schema = new mongoose.Schema({
    andar: {
      type: String,
      enum: ["37"],
      required: true,
    },
    mesa: {
      type: String,
      enum: Object.keys(
        Array.from({ length: 37 }, (_, i) => ({
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
      required: true,
    },
    tipomesa: {
      type: String,
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
  
  const Mesa37Model = mongoose.model("Mesa37", mesa37Schema);

  (async () => {
    const apelidos = await getApelidos(); // obtem a lista de apelidos dos corretores
    Mesa37Model.schema.path('corretor').enum = apelidos; // define a lista de apelidos como opções para o campo corretor
  })();

  export default Mesa37Model;
  
