import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabse(database: SQLiteDatabase) {
    console.log("inicializado banco de dados");
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        );
        `);

        await database.execAsync(`
           INSERT INTO contact ( name, phone, email )
           VALUES ('John Doe', '99999999', 'teste@email.com');
            `);
}