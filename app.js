import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import mongoose from "mongoose";
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

  const mongooseDb = await mongoose.connect(
    "mongodb+srv://Admin:%40Ph974985101@databasemc.w2z5piy.mongodb.net/?retryWrites=true&w=majority")

  const admin = new AdminJS({
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    locale: {
      language: "pt-BR",
      availableLanguages: ["en", "pt-BR"],
    },
    databases: [mongooseDb],
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
