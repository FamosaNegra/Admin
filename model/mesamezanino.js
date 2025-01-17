
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

  export default MesaMezaninoModel;
