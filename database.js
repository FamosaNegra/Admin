import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env


const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso'))
  .catch((err) => console.log(`Erro ao estabelecer conexão com o banco de dados: ${err}`));

export default mongoose;
