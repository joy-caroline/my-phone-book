import { useSQLiteContext } from "expo-sqlite"

export type Contact = {
    id: number,
    name: string,
    phone: string,
    email: string
}

export function useContactsDatabase(){
    const dbAdapter = useSQLiteContext();
    
    /** Função para criar um novo contato na lista de contatos
     *  @param data 
     *   - Paremetro com um objeto com as mesmas propriedades de Contact com execeção id  
     *  @returns id do novo contato inserido na lista de contatos 
     */
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

    /** Função para buscar todos os contatos salvos na lista
     *  
     *  @returns Lista de contatos ordenados em ordem alfabetica, com a penas a informação de nome e id de cada contato
     */
    async function findAll(): Promise<Contact | Contact[] | null> {
        try {
            const result = await dbAdapter.getAllAsync<Contact>(`SELECT id, name FROM contact ORDEM BY name ASC`);

            return result;
        } catch (error) {
            console.error('Erro ao executar consulta:', error);
            throw new Error('Falha ao buscar contatos!');
        }
    }

    /** Função para buscar todos os dados de um contato
     *  @param id  - id do contato
     *  @returns Retorna as informações completas do contato buscado
     */
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

    /** Função para atualizar os dados de um contato
     *  @param data - Dados (incluindo id) do contato que será atualizado no banco de dados
     *  @returns Retorna se a atualização dos dados foi realizada com sucesso ou um exceção em caso de falha;
     * 
     *  `Obs: Em sistemas mais sensiveis, uma tabela de historico é recomendada para manter controle das informações de alterações`
     */
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


     /** Função para remover um contato da lista de contatos
     *  @param id -  id do contato que deve ser removido
     *  @returns Retorna se a remoção foi realizada com sucesso ou um exceção em caso de falha;
     */
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

    /** Função para buscar todos os dados de um contato
     *  @param data - Dados do contato que deve ser validado
     *  @returns Retorna as sucesso caso os dados sejam validos ou exceção caso exista alguma incoerencia nos dados
     */
    function validateContact(contact: Contact | Omit<Contact, "id">): boolean {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regexEmail.test(contact.email)) throw new Error("Email informado invalido");
        const regexTelefone = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
        if(!regexTelefone.test(contact.email)) throw new Error("Telefone informado invalido"); // Aceita formatos com ou sem DDD, com ou sem traços, espaços ou parênteses.

        return true;
    }

    return { create, findAll, findById, updateOne, deleteOne }
}