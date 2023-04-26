import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import mongoose from "./database.js";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { dark, light, noSidebar } from "@adminjs/themes";

import Corretores from './model/corretores.js';
import Mesa37Model from "./model/mesa37.js";
import MesaMezaninoModel from "./model/mesamezanino.js";
import MesaTerreoModel from "./model/mesaterreo.js";
const PORT = 5000;

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    defaultTheme: light,
    availableThemes: [dark, light, noSidebar],
    locale: {
      language: "pt-BR",
      availableLanguages: ["en", "pt-BR"],
    },
    databases: [mongoose],
    resources: [
      {
        resource: Corretores,
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
        },
      },
    ],
  });
  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
