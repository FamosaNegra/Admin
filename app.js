import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import mongoose from 'mongoose'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { dark, light, noSidebar } from '@adminjs/themes'


const PORT = 3000

const mesa37Schema = new mongoose.Schema({
    andar: {
      type: String,
      enum: ['37'],
      required: true
    },
    mesa: {
       type: String,
       type: String,
    enum: Object.keys(
      Array.from({ length: 37 }, (_, i) => ({
        [i + 1]: `${i + 1}`,
      }))
      .reduce((obj, item) => ({ ...obj, ...item }), {})
    ),
    required: true
  },
    status: {
      type: String,
      enum: ['ocupada', 'mba'],
      required: true
    },
    corretor: {
      type: String,
      required: false
    },
    tipomesa: {
      type: String,
      enum: ['venda', 'entrevista'],
      required: false
    },
    cliente: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    entrada: {
      type: Date,
      required: true
    },
    saida: {
      type: Date,
      required: false
    }
});

const Mesa37Model = mongoose.model("Mesa37", mesa37Schema);


const mesaTerreoSchema = new mongoose.Schema({
    andar: {
      type: String,
      enum: ['Terreo'],
      required: true
    },
    mesa: {
       type: String,
       type: String,
    enum: Object.keys(
      Array.from({ length: 22 }, (_, i) => ({
        [i + 1]: `${i + 1}`,
      }))
      .reduce((obj, item) => ({ ...obj, ...item }), {})
    ),
    required: true
  },
    status: {
      type: String,
      enum: ['ocupada', 'mba'],
      required: true
    },
    corretor: {
      type: String,
      required: false
    },
    tipomesa: {
      type: String,
      enum: ['venda', 'entrevista'],
      required: false
    },
    cliente: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    entrada: {
      type: Date,
      default: Date.now,
      required: true
    },
    saida: {
      type: Date,
      default: Date.now,
      required: false
    }
});

const MesaTerreoModel = mongoose.model("MesaTerreo", mesaTerreoSchema);

const MesaMezaninoSchema = new mongoose.Schema({
    andar: {
      type: String,
      enum: ['Mezanino'],
      required: true
    },
    mesa: {
       type: String,
       type: String,
    enum: Object.keys(
      Array.from({ length: 17 }, (_, i) => ({
        [i + 1]: `${i + 1}`,
      }))
      .reduce((obj, item) => ({ ...obj, ...item }), {})
    ),
    required: true
  },
    status: {
      type: String,
      enum: ['ocupada', 'mba'],
      required: true
    },
    corretor: {
      type: String,
      required: false
    },
    tipomesa: {
      type: String,
      enum: ['venda', 'entrevista'],
      required: false
    },
    cliente: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
      required: true
    },
    entrada: {
      type: Date,
      required: true
    },
    saida: {
      type: Date,
      required: false
    }
});

const MesaMezaninoModel = mongoose.model("MesaMezanino", MesaMezaninoSchema);

const corretoresSchema = new mongoose.Schema({
    CPF: {
      type: String,
      required: true,
      unique: true
    },
    nome: {
      type: String,
      required: true
    },
    apelido: {
      type: String,
      required: false
    },
    data_nasc: {
      type: Date,
      required: true
    },
    rg: {
      type: String,
      required: true
    },
    endereco: {
      logradouro: {
        type: String,
        required: true
      },
      numero: {
        type: String,
        required: true
      },
      cep: {
        type: String,
        required: true
      }
    },
    imobiliaria: {
      type: String,
      required: true
    }
  });
  
  const Corretores = mongoose.model("Corretores", corretoresSchema);

  const mesa37Filter = {
    actionType: 'filter',
    isVisible: true,
    name: 'Documentos sem saída',
    filter: async (options, values) => {
      const { currentAdmin } = options;
      // Faça a consulta no banco de dados para buscar os documentos que não possuem a propriedade "saida" preenchida
      const documentos = await Mesa37Model.find({ saida: { $exists: false } });
      return { documents };
    },
  };

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const start = async () => {
  const app = express()

  const mongooseDb = await mongoose.connect('mongodb+srv://Admin:%40Ph974985101@databasemc.w2z5piy.mongodb.net/?retryWrites=true&w=majority')

  const admin = new AdminJS({
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    locale: { 
        language: 'pt-BR', 
        availableLanguages: ['en', 'pt-BR'], 
      },
    databases: [mongooseDb],
    resources: [
        {
            resource: Corretores,
          },
      {
        resource: Mesa37Model,
        options: {
            listProperties: ['andar', 'mesa', 'status', 'corretor', 'cliente', 'entrada'],
            editProperties: ['andar', 'mesa', 'status', 'corretor', 'cliente', 'entrada', 'telefone', 'saida'],
            filter: [mesa37Filter],
        },
        
      },
      {
        resource: MesaTerreoModel,
        options: {
            listProperties: ['andar', 'mesa', 'status', 'corretor', 'cliente', 'entrada'],
            editProperties: ['andar', 'mesa', 'status', 'corretor', 'cliente', 'entrada', 'telefone', 'saida'],
            filter: { saida: { $eq: null } }

        },
        
      },
      {
        resource: MesaMezaninoModel,
        options: {
            listProperties: ['andar', 'mesa', 'status', 'corretor', 'cliente', 'entrada'],
            editProperties: ['andar', 'mesa', 'status', 'corretor', 'cliente', 'entrada', 'telefone', 'saida'],
            params: {
                'filters.saida': ''
            }
        },
      },
    ],
  });
  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
