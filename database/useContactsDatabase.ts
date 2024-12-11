import { useSQLiteContext } from "expo-sqlite";

export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export function useContactsDatabase() {
  const dbAdapter = useSQLiteContext();

  /** Função para criar um novo contato na lista de contatos
   *  @param data
   *   - Parâmetro com um objeto com as mesmas propriedades de Contact com exceção de id
   *  @returns id do novo contato inserido na lista de contatos
   */
  async function create(data: Omit<Contact, "id">): Promise<Pick<Contact, "id">> {
    validateContact(data);
  
    // Verificar se o e-mail já existe antes de tentar inserir
    const existingContact = await dbAdapter.getFirstAsync<Contact>(
      "SELECT id FROM contact WHERE email = ?",
      data.email
    );
  
    if (existingContact) {
      throw new Error("Já existe um contato com este e-mail.");
    }
  
    const stmt = await dbAdapter.prepareAsync(
      "INSERT INTO contact (name, phone, email) VALUES ($name, $phone, $email)"
    );
  
    try {
      const result = await stmt.executeAsync({
        $name: data.name,
        $phone: data.phone,
        $email: data.email,
      });
  
      if (typeof result.lastInsertRowId !== "number") {
        throw new Error("Falha ao obter o ID do novo contato.");
      }
  
      return { id: result.lastInsertRowId };
    } catch (error) {
      console.error(error);
      throw new Error("Falha ao cadastrar contato!");
    } finally {
      await stmt.finalizeAsync();
    }
  }
  
  

  /** Função para buscar todos os contatos salvos na lista
   *
   *  @returns Lista de contatos ordenados em ordem alfabética, com apenas a informação de nome e id de cada contato
   */
  async function findAll(): Promise<Contact[] | []> {
    try {
      const result = await dbAdapter.getAllAsync<Contact>(
        `SELECT id, name FROM contact ORDER BY name ASC`
      );

      return result;
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      throw new Error("Falha ao buscar contatos!");
    }
  }

  /** Função para buscar todos os dados de um contato
   *  @param id  - id do contato
   *  @returns Retorna as informações completas do contato buscado
   */
  async function findById(id: number): Promise<Contact | null> {
    try {
      const result = await dbAdapter.getFirstAsync<Contact>(
        `SELECT id, name, phone, email FROM contact WHERE id = ?`,
        id
      );

      // Retornar todos os resultados como um array
      return result;
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      throw new Error(`Falha ao buscar contato de ID: ${id}!`);
    }
  }

  /** Função para atualizar os dados de um contato
   *  @param data - Dados (incluindo id) do contato que será atualizado no banco de dados
   *  @returns Retorna se a atualização dos dados foi realizada com sucesso ou uma exceção em caso de falha;
   *
   *  `Obs: Em sistemas mais sensíveis, uma tabela de histórico é recomendada para manter controle das informações de alterações`
   */
  async function updateOne(data: Contact): Promise<boolean | Error> {
    validateContact(data);
    const stmt = await dbAdapter.prepareAsync(
      "UPDATE contact SET name = $name, phone = $phone, email = $email WHERE id = $id"
    );
    try {
      await stmt.executeAsync({
        $id: data.id,
        $name: data.name,
        $phone: data.phone,
        $email: data.email,
      });

      return true;
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      throw new Error(`Falha ao atualizar contato de ID: ${data.id}!`);
    } finally {
      await stmt.finalizeAsync();
    }
  }

  /** Função para remover um contato da lista de contatos
   *  @param id - id do contato que deve ser removido
   *  @returns Retorna se a remoção foi realizada com sucesso ou uma exceção em caso de falha;
   */
  async function deleteOne(id: number): Promise<boolean | Error> {
    const stmt = await dbAdapter.prepareAsync(
      "DELETE FROM contact WHERE id = $id"
    );
    try {
      await stmt.executeAsync({
        $id: id,
      });

      return true;
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      throw new Error(`Falha ao remover contato de ID: ${id}!`);
    } finally {
      await stmt.finalizeAsync();
    }
  }

  /** Função para validar os dados de um contato
   *  @param contact - Dados do contato que deve ser validado
   *  @returns Lança exceção caso os dados sejam inválidos
   */
  function validateContact(contact: Contact | Omit<Contact, "id">): void {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(contact.email)) {
      throw new Error("Email informado inválido");
    }
    const regexTelefone = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
    if (!regexTelefone.test(contact.phone)) {
      throw new Error("Telefone informado inválido");
    }
  }

  return { create, findAll, findById, updateOne, deleteOne };
}
