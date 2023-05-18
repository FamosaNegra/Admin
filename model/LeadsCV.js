import mongoose from '../database.js';
import bcrypt from 'bcrypt';

const LeadsCVSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
  },
  telefonePrincipal: {
    type: String,
    required: true,
  },
  nomeCliente: {
    type: String,
    required: true,
  },
  dataCriacaoLead: {
    type: Date,
    required: true,
  },
  sexo: {
    type: String,
    enum: ['M', 'F'], // Se você quiser restringir os valores possíveis para 'M' e 'F'
    required: true,
  },
  valorNegocio: {
    type: Number,
    required: true,
  },
  origem: {
    type: String,
    required: true,
  },
  midia: {
    type: String,
    required: true,
  },
  pdv: {
    type: String,
    required: true,
  },
  conversao: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const LeadsCV = mongoose.model('LeadsCV', LeadsCVSchema);

export default LeadsCV;
