import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express, {
  Router
} from "express";
import mongoose from "./database.js";
import * as AdminJSMongoose from "@adminjs/mongoose";
import {
  dark,
  light,
  noSidebar
} from "@adminjs/themes";
import Corretores from './model/corretores.js';
import Mesa37Model from "./model/mesa37.js";
import MesaMezaninoModel from "./model/mesamezanino.js";
import MesaTerreoModel from "./model/mesaterreo.js";
import User from "./model/user.js";
import LeadsCV from "./model/LeadsCV.js";
import passwordsFeature from '@adminjs/passwords';
import {
  ComponentLoader
} from 'adminjs';
import bcrypt from 'bcrypt';

import Interacao from "./model/interacoes.js";
const PORT = 5000;
var app = express();



app.use('/', function () {
  routes
});

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});


const start = async () => {
  const app = express();

  const createUserAction = {
    name: 'createUser',
    type: 'record',
    isVisible: true,
    actionType: 'record',
    handler: async (request, response, data) => {
      const {
        email,
        password
      } = data.record.params;
      const encryptedPassword = await bcrypt.hash(password, 10);
      data.record.params.encryptedPassword = encryptedPassword;
      return request.resource.handlers.create(request, response, data);
    }
  };

  const componentLoader = new ComponentLoader();

  const admin = new AdminJS({
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    locale: {
      language: "pt-BR",
      availableLanguages: ["en", "pt-BR"],
    },
    databases: [mongoose],
    rootPath: '/',
    componentLoader,
    resources: [{
        resource: Corretores,
      },
      {
        resource: User,
        options: {
          properties: {
            password: {
              isVisible: true
            }
          },
          features: [
            passwordsFeature({
              componentLoader,
              properties: {
                encryptedPassword: 'password',
                password: 'newPassword'
              },
              hash: async (password) => {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                return hash;
              },
            })
          ],
          actions: {
            createUser: createUserAction
          }
        }
      },
      {
        resource: Mesa37Model,
        options: {
          sort: {
            sortBy: 'updatedAt',
            direction: 'desc',
          },
          actions: {
            new: {
              after: async (response, request, context) => {
                return {
                  redirectUrl: `/resources/${context.resource.id()}/actions/list?filters.saida=`,
                };
              },
              isAccessible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
            },
            edit: {
              isAccessible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
              isVisible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
            },
            bulkDelete: {
              isAccessible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
              isVisible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
            },
            delete: {
              isAccessible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
              isVisible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
            },
            liberarMesa: {
              actionType: 'bulk',
              icon: 'DateRange',
              label: 'Definir saida',
              isAccessible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
              component: false,
              handler: async (request, response, context) => {
                const {
                  records
                } = context;
                const currentDate = new Date();
                await Promise.all(records.map(record => record.update({
                  saida: currentDate
                })));
                return {
                  records: records.map(record => record.toJSON(context.currentAdmin)),
                  redirectUrl: `/admin/resources/${context.resource.id()}/actions/list`,
                };
              },
            },
          },
          listProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
          ],
          editProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
            "telefone",
            "saida",
          ],
          showProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
          ],
          filterProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
          ],
          filter: {
            saida: {
              $exists: true
            }
          },
          href: ({
            h,
            resource
          }) => {
            return h.resourceActionUrl({
              resourceId: resource.decorate().id(),
              actionName: 'list?filters.saida=',
              params: {
                'filters.saida': '',
              },
            });
          },
        },
      },
      {
        resource: Interacao,
      },
      {
        resource: MesaTerreoModel,
        options: {
          actions: {
            new: {
              after: async (response, request, context) => {
                return {
                  redirectUrl: `/resources/${context.resource.id()}/actions/list?filters.saida=`,
                };
              },
              isAccessible: ({
                currentAdmin
              }) => currentAdmin.role === 'Recep',
            },
            setSaida: {
              actionType: 'bulk',
              icon: 'DateRange',
              label: 'Definir saida',
              component: false,
              handler: async (request, response, context) => {
                const {
                  records
                } = context;
                const currentDate = new Date();
                await Promise.all(records.map(record => record.update({
                  saida: currentDate
                })));
                return {
                  records: records.map(record => record.toJSON(context.currentAdmin)),
                  redirectUrl: `/admin/resources/${context.resource.id()}/actions/list`,
                };
              },
            },
          },
          listProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
          ],
          editProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
            "telefone",
            "saida",
          ],
          filter: {
            saida: {
              $exists: true
            }
          },
          href: ({
            h,
            resource
          }) => {
            return h.resourceActionUrl({
              resourceId: resource.decorate().id(),
              actionName: 'list?filters.saida=',
              params: {
                'filters.saida': '',
              },
            });
          },
        },
      },
      {
        resource: MesaMezaninoModel,
        options: {
          id: "Mesa Mezanino",
          listProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
          ],
          editProperties: [
            "andar",
            "mesa",
            "status",
            "corretor",
            "cliente",
            "entrada",
            "telefone",
            "saida",
          ],
          filter: {
            saida: {
              $exists: true
            }
          },
          href: ({
            h,
            resource
          }) => {
            return h.resourceActionUrl({
              resourceId: resource.decorate().id(),
              actionName: 'list?filters.saida=',
              params: {
                'filters.saida': '',
              },
            });
          },
        },
      },
      {
        resource: LeadsCV,
        options: {
          listProperties: [
            "nomeCliente",
            "codigo",
            "telefonePrincipal",
            "dataCriacaoLead",
            "sexo",
            "valorNegocio",
            "origem",
            "midia",
            "pdv",
            "conversao",
            "email",
          ],
        }
      }
    ],
  });

  const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
  }

  const authenticate = async (email, password) => {
    const user = await User.findOne({
      email
    });
    if (user && await bcrypt.compare(password, user.encryptedPassword)) {
      return user.toJSON();
    }
    return null;
  }


  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin, {
      cookieName: 'admin-bro',
      cookiePassword: 'superlongandcomplicatedname',
      authenticate,
      cookie: {
        maxAge: 86400000, // 1 dia em milissegundos
      },
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

export default Router;

start();