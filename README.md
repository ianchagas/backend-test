<h1 align="center">Desafio Node.JS Meu Crediário</h1>
<p align="center">Desafio de desenvolvimento de uma API para calculo do maior saldo em aberto no histórico do cliente.</p>

Conteúdos da aplicação
=================
# Sobre

Proposta de desafio de desenvolvimento para aplicação de vaga de desenvolvedor Backend na [Meu Crediário](https://www.meucrediario.com.br)

# 💡 Feature solicitada

- ✅ Criar endpoint POST onde seja possível passar um JSON contendo os dados de histórico de contratos e parcelas de cliente exemplo e retornar o maior saldo em aberto junto com o mês
- Obs: foi criado o endpoint POST porém com o intuito de criar um registro de histórico de saldo do cliente num banco de dados que criei. Isso facilitou para realizar o calculo do maior saldo em aberto

## 💡 Features adicionais
- ✅ Criado rota PUT que roda um script SQL no banco de dados para fazer uma soma cumulativa (ver arquivo "used-querys.sql")
- ✅ Criado rota GET que chama o resultado do maior saldo em aberto junto com o mês, após soma de saldo cumulativa
- ✅ Criado rota DELETE para limpar o banco de dados e começar o fluxo novamente

<br>

# 📋 Fluxo da aplicação
- Rodar rota POST com o JSON do histórico de contratos/parcelas
- Rodar rota PUT que irá atualizar o campo "saldo" criado no banco de dados, e fazer uma soma cumulativa onde contratos soma valor e parcela subtrai valor do saldo
- Rodar rota GET irá trazer os dados solicitados do mês e maior saldo em aberto no histórico do cliente
- Caso queira recomeçar o fluxo basta rodar a rota DELETE que irá limpar a base de dados

<br>

# ❗ Pré-requisitos para rodar o projeto

- [Docker](https://www.docker.com/products/docker-desktop) e [Docker Compose](https://docs.docker.com/compose) devidamente configurado.
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com) ou [Yarn](https://yarnpkg.com)

Para os testes manuais das rotas, poderá ser utilizado a documentação local [Swagger](http://localhost:5000/api/#/) <br>
Também é uma opção utilizar o [Imsomnia](https://insomnia.rest/download) ou o [Postman](https://www.postman.com)

<br>

# 💻 Rodando o Back End

```bash
# Clone este repositório
$ git clone <https://github.com/ianchagas/backend-test>

# Acesse a pasta do projeto no terminal/cmd
$ cd backend-test

# Rode o Docker
$ docker-compose up -d

```
- A aplicação irá fazer todo o processo de criação da imagem do NestJS com base no código criado, também criará o banco de dados e rodará as migrations para criar as tabelas que fiz. Após isso basta acessar o [Swagger](http://localhost:5000/api/#/) para acessar a documentação e rodar testes locais.

<br>
  
# 📝 Testes Unitários
```bash
# Para rodar os testes unitários basta usar o comando
$ yarn test
# ou
$ npm run test
```

<br>

# ⚡ Técnologias Utilizadas
  
- TypeScript
- Node.JS
- NestJS
- Postgres
- Docker
- TypeORM
- Jest
