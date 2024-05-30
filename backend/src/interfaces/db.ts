export interface IDB {
    connect(): Promise<boolean>;
    query(sql: string, params?: any[]): Promise<any>;
    close(): Promise<void>;
  }
  