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
        validateContact(data);

        const stmt = await dbAdapter.prepareAsync("INSERT INTO contact (name, phone, email) VALUES ($name, $phone, $email)");
        try {
           
            const result = await stmt.executeAsync({
                $name: data.name,
                $phone: data.phone,
                $email: data.email
            });

            const newId = result.lastInsertRowId.toString();

            return newId;
        } catch (error) {
            console.error(error)
            throw new Error('Falha ao cadastrar contato!');
        } finally {
            await stmt.finalizeAsync();
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

    async function updateOne(data: Contact ): Promise<Boolean | Error>{
        validateContact(data);
        const stmt = await dbAdapter.prepareAsync("UPDATE contact SET name = $name, phone = $phone, email = $email WHERE id = $id");
        try {
            await stmt.executeAsync({
                $id: data.id,
                $name: data.name,
                $phone: data.phone,
                $email: data.email
            });

            return true;
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            throw new Error(`Falha ao atualizar contato de ID: ${data.id}!`);
        } finally {
            await stmt.finalizeAsync();
        }
       
    }

    async function deleteOne(id: number): Promise<Boolean | Error>{
        const stmt = await dbAdapter.prepareAsync("DELETE FROM contact WHERE id = $id");
        try {
            await stmt.executeAsync({
                $id: id
            });

            return true;
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            throw new Error(`Falha ao atualizar contato de ID: ${id}!`);
        } finally {
            await stmt.finalizeAsync();
        }
    }

    function validateContact(contact: Contact | Omit<Contact, "id">): boolean {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(contact.email)) throw new Error("Email informado invalido");
        const regexTelefone = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
        if(!regexTelefone.test(contact.email)) throw new Error("Telefone informado invalido"); // Aceita formatos com ou sem DDD, com ou sem traços, espaços ou parênteses.

        return true;
    }

    return { create, findAll, findById, updateOne, deleteOne }
}