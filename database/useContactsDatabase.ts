import { useSQLiteContext } from "expo-sqlite"

export type Contact = {
    id: number,
    name: string,
    phone: string,
    email: string
}

export function useContactsDatabase(){
    const dbAdapter = useSQLiteContext();
    
    async function create(data: Omit<Contact, "id">){
        try {
            const stmt = await dbAdapter.prepareAsync("INSERT INTO contacts (name, phone, email) VALUES ($name, $phone, $email)");

            const result = await stmt.executeAsync({
                $name: data.name,
                $phone: data.phone,
                $email: data.email
            })

            const newId = result.lastInsertRowId.toString();

            return newId;
        } catch (error) {
            console.error(error)
            throw new Error('Falha ao cadastrar contato!');
        }

    }

    async function findAll(): Promise<Contact | Contact[] | null> {
        try {
            const result = await dbAdapter.getAllAsync<Contact>(`SELECT id, name FROM contact`);
    
            // Retornar todos os resultados como um array
            return result;
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            throw new Error('Falha ao buscar contatos!');
        }
    }

    async function findById(id: number): Promise<Contact | null>{
        try {
            const result = await dbAdapter.getFirstAsync<Contact>(`SELECT id, name, phone, email FROM contact WHERE id = ?`, id);
    
            // Retornar todos os resultados como um array
            return result;
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            throw new Error(`Falha ao buscar contato de ID: ${id}!`);
        }
    }

    async function updateOne(id: Number): Promise<Boolean | Error>{
        return true;
    }

    async function deleteOne(): Promise<Boolean | Error>{
        return true;
    }

    return { create, findAll, findById, updateOne, deleteOne }
}