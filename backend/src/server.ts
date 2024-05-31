import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DB from './bdd/connect';
import todoRoute from './router/todoRoute';
import { IDB } from './interfaces/db';

dotenv.config();

const app = express();
const dbInstance: IDB = new DB();

// Configuration de CORS
app.use(cors());
app.use(express.json());

// Configuration du middleware d'analyse des données URL encodées
app.use(express.urlencoded({ extended: true }));

// Configuration des routes
app.use('/api', todoRoute(dbInstance));

// Lancement du serveur
app.listen(5000, async () => {
  console.log("Serveur lancé");
  console.log("Connexion à la base de donnée " + process.env.DB_DATABASE);
  await dbInstance.connect().then((res: boolean) => res && console.log(process.env.DB_DATABASE + ' connectée'));
});
