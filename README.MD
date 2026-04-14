# Sistema de Controle de Gastos Fullstack em C#, React e TypeScript

Este projeto foi desenvolvido como parte de um teste para a vaga de Desenvolvedor Junior. É uma aplicação Full-Stack para gerenciar receitas e despesas, incluindo regras específicas para validação de idade e categorias.

## Decisões Arquiteturais

Para facilitar a avaliação técnica, foram tomadas as seguintes decisões:

* **Banco de Dados SQLite:** Foi escolhido para garantir um modelo Zero-Config. O avaliador não precisa ter um servidor de banco de dados em funcionamento; ao rodar o projeto, o banco `.db` é criado e usado localmente.

* **Prevenção de Over-fetching:** A anotação `[JsonIgnore]` foi utilizada nos *Models* do Back-end. Isso impede que o Swagger e os Endpoints enviem objetos inteiros e aninhados desnecessariamente, exigindo apenas os IDs nas requisições POST. Isso melhora a performance e os testes via Swagger.

* **Cálculos em Memória:** O SQLite tem limitações com cálculos de agregação, como o `Sum` em campos decimais. A lógica foi aprimorada usando `.ToListAsync()` para trazer os dados para a memória da aplicação e permitir que o C# processe a matemática complexa de maneira segura e rápida.

* **UX/UI:** O Front-end foi projetado para oferecer uma boa experiência ao usuário. Ele bloqueia limites de caracteres nativamente via `maxLength`, filtra opções dinamicamente e usa a formatação  `Intl.NumberFormat` para transformar os valores em Reais (R$).

## Tecnologias Utilizadas

**Back-end:**
* C# / .NET 8 
* Entity Framework Core
* Banco de Dados: SQLite
* Swagger 

**Front-end:**
* React 
* TypeScript
* Axios 

## Funcionalidades Implementadas

* **Pessoas:** Cadastro, listagem e exclusão, com Exclusão em Cascata direta pelo Banco de Dados, apagando transações vinculadas automaticamente.

* **Categorias:** Cadastro e listagem, definindo a finalidade (0 - Despesa, 1 - Receita, 2 - Ambas).

* **Transações:**
  * Lançamento de despesas e receitas.
  * *Regra de Negócio:* Menores de 18 anos só podem registrar despesas.
  * *Regra de Negócio:* Restrição na exibição e lançamento de categorias que não combinam com o tipo de transação selecionado.

* **Dashboard / Resumos:**
  * Totais por pessoa (Receita, Despesa e Saldo Líquido).
  * **(Opcional)** Totais por categoria.
  * Linha de totalizador geral da aplicação.



## Como executar o projeto na sua máquina

Para testar a aplicação, você precisará ter o [Node.js](https://nodejs.org/) e o [.NET SDK](https://dotnet.microsoft.com/download) instalados em sua máquina.

### 1. Executando o Back-end 

Abra um terminal, navegue até a pasta `backend` e execute os comandos:

```bash
# Entre na pasta do backend
cd backend

# Restaure as dependências
dotnet restore

# Execute o projeto
dotnet run
```

A API iniciará na porta [5285](http://localhost:5285).
Você pode acessar o Swagger adicionando /swagger ao final do link exibido no terminal para testar a API de forma interativa.

### 2. Executando o Front-end 

Abra um novo terminal, mantenha o do back-end rodando, navegue até a pasta frontend e execute: 

```bash
# Entre na pasta do frontend
cd frontend

# Instale os pacotes necessários
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O painel do Vite fornecerá um link local [Vite](http://localhost:5173). Abra este link no seu navegador para utilizar o sistema.


---
<br>
<br>

**Desenvolvido com dedicação por Paulo Alexandre Medeiro - [LinkedIn](https://www.linkedin.com/in/pauloamedeiro/)**