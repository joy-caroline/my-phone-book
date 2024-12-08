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

    // Inserção de um contato
    await database.execAsync(`
      INSERT INTO contact (name, phone, email)
      VALUES ('John Doe da Silva', '99999999', 'joyce@email.com');
    `);
    
    console.log("Contato inserido com sucesso!");
  } catch (error) {
    console.error("Erro ao executar consulta:", error);
  }
}
