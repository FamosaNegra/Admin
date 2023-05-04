import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express, { Router } from "express";
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
import passwordsFeature from '@adminjs/passwords';
import { ComponentLoader } from 'adminjs';
import bcrypt from 'bcrypt';

const PORT = 5000;
var app = express();

app.use('/', function(){routes});

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
      const { email, password } = data.record.params;
      const encryptedPassword = await bcrypt.hash(password, 10);
      data.record.params.encryptedPassword = encryptedPassword;
      return request.resource.handlers.create(request, response, data);
    }
  };

  const componentLoader = new ComponentLoader()
  const admin = new AdminJS({
    defaultTheme: dark,
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
        options:{
          properties: { password: { isVisible: true } },
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
        resource: MesaTerreoModel,
        options: {
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
    ],
  });

  const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
  }
  
  const authenticate = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.encryptedPassword)) {
      return user.toJSON();
    }
    return null;
  }
  

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      cookieName: 'admin-bro',
      cookiePassword: 'superlongandcomplicatedname',
      authenticate,
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