
import mongoose from "mongoose";

  const mesaTerreoSchema = new mongoose.Schema({
    andar: {
      type: String,
      enum: ["Terreo"],
      required: true,
    },
    mesa: {
      type: String,
      type: String,
      enum: Object.keys(
        Array.from({ length: 22 }, (_, i) => ({
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
      required: false
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
      default: Date.now,
      required: true,
    },
    saida: {
      type: Date,
      default: Date.now,
      required: false,
    },
  });
  
  const MesaTerreoModel = mongoose.model("MesaTerreo", mesaTerreoSchema);


  export default MesaTerreoModel;

