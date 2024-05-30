import { createPool, Pool, PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
import { IDB } from '../interfaces/db';

dotenv.config();

class DB implements IDB {
  private pool: Pool;
  private connection: PoolConnection | null = null;

  constructor() {
    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
  }

  async connect(): Promise<boolean> {
    try {
      this.connection = await this.pool.getConnection();
      return true;
    } catch (error) {
      console.error(
        `Erreur de connexion à la base de données.
        Assurez-vous que le serveur MySQL est en cours d'exécution et que le port 3306 est accessible.
        Vérifiez également les paramètres de configuration de la base de données. :
        `,
        error,
      );
      return false;
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      if (!this.connection) {
        throw new Error('No database connection');
      }
      const [results] = await this.connection.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      if (this.connection) {
        this.connection.release();
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion de la base de données :', error);
    }
  }
}

export default DB;
