import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabse(database: SQLiteDatabase) {
  console.log("inicializado banco de dados");

  try {
    // Criação da tabela 'contact'
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);

  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
}
