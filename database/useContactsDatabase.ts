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
            throw error;
        }

    }

    async function read(id?: any | null): Promise<Contact | Contact[] | null> {
        try {
            if (id === null || id === undefined) {
                // Buscar todos os contatos
                const result = await dbAdapter.getAllAsync<Contact>(`SELECT id, name, phone, email FROM contact`);
    
                // Retornar todos os resultados como um array
                return result;
            } else {
                // Buscar um contato específico pelo ID
                const result = await dbAdapter.getFirstAsync<Contact>(`SELECT id, name, phone, email FROM contact WHERE id = $id`, {$id: id});
                    
                return result;

            }
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            throw error;
        }
    }

    async function updateOne(id: Number){
        return [];
    }

    async function deleteOne(){
        return [];
    }

    return { create, read }
}