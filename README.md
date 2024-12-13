# **My Phone Book App**  
Um aplicativo de gerenciamento de contatos desenvolvido com **React Native** utilizando **Expo Router** para navegação. Este projeto implementa um sistema de CRUD (Create, Read, Update, Delete) de contatos, com uma interface simples e eficiente.  

## **Visão Geral**  
O aplicativo permite ao usuário:  
- Adicionar novos contatos com informações relevantes.  
- Visualizar detalhes de contatos cadastrados.  
- Editar informações de contatos existentes.  
- Excluir contatos com um sistema de confirmação para evitar exclusões acidentais.  

O sistema utiliza a estrutura de arquivos para definir rotas, aproveitando o poder do **Expo Router** para criar uma navegação dinâmica e organizada.  


## **Estrutura do Projeto**  
```plaintext  
app  
|-- tabs  
|   |-- details  
|   |   |-- [id].tsx          # Página de detalhes de um contato  
|   |-- index.tsx            # Página principal com lista de contatos  
|   |-- register.tsx         # Página de cadastro de novos contatos  
|   |-- _layout.tsx          # Layout principal da tabBar  
|-- +not-found.tsx           # Página exibida para rotas inexistentes  
|-- header.tsx               # Componente de cabeçalho do app  
|-- _layout.tsx              # Layout compartilhado do app  
assets                       # Recursos estáticos, como imagens  
components                   # Componentes reutilizáveis, como botões e cards  
constants                    # Arquivos de constantes globais do projeto  
database                     # Simulação de banco de dados local  
hooks                        # Hooks personalizados para gerenciar estados e funcionalidades  
```  



## **Tecnologias Utilizadas**  
- **React Native**  
- **Expo Router**  
- **TypeScript**  



## **Funcionalidades Principais**  
1. **CRUD de Contatos**  
   - Criação, leitura, edição e exclusão de contatos.  
   - Confirmação antes de excluir para evitar erros.  

2. **Navegação Dinâmica**  
   - Baseada na estrutura de arquivos, facilitada pelo **Expo Router**.  
   - Rotas dinâmicas, como `/tabs/details/[id]`, para acessar informações específicas.  

3. **Design Consistente**  
   - Utilização de layouts compartilhados (`_layout.tsx`) para manter a consistência visual em todas as páginas.  


## **Como Executar o Projeto**  

### Pré-requisitos  
- Node.js instalado  
- Expo CLI configurado  
- Emulador ou dispositivo físico para testes  

### Passos para executar  
1. Clone o repositório:  
   ```bash  
   git clone https://github.com/joy-caroline/my-phone-book  
   cd my-phone-book  
   ```  

2. Instale as dependências:  
   ```bash  
   npm install  
   ```  

3. Inicie o projeto no Expo:  
   ```bash  
   npm start  
   ```  

4. Escaneie o QR Code com o aplicativo Expo Go ou execute no emulador.  


## **Melhorias Futuras**  
- Adicionar animações para ações como excluir ou adicionar contatos.  
- Implementar autenticação de usuário.  
- Integrar com um banco de dados remoto para persistência de dados.  
- Criar uma suíte de testes automatizados para garantir maior confiabilidade.  


## **Licença**  
Este projeto está licenciado sob a [Licença MIT](LICENSE).  

