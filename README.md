# Desafio PHP Júnior - Cadastro de Pacientes

Aplicação web desenvolvida em Laravel para cadastro, consulta, edição e exclusão de pacientes vinculados a unidades de saúde.

## Tecnologias

- PHP
- Laravel
- MySQL
- HTML
- CSS
- JavaScript
- Bootstrap 5
- Fetch API
- Git
- GitHub

## Funcionalidades

O sistema permite:

- Cadastrar pacientes
- Listar pacientes cadastrados
- Listar pacientes em ordem alfabética
- Pesquisar pacientes pelo nome
- Visualizar os dados completos de um paciente
- Editar pacientes
- Excluir pacientes com confirmação
- Vincular pacientes a unidades de saúde
- Carregar unidades de saúde diretamente da API
- Validar CPF com 11 dígitos
- Impedir cadastro de CPF duplicado
- Impedir data de nascimento futura
- Validar a existência da unidade de saúde
- Exibir mensagens de sucesso e erro
- Paginar a listagem de pacientes

## O que está funcionando

- Cadastro de pacientes
- Listagem de pacientes
- Busca parcial por nome
- Visualização dos detalhes do paciente
- Edição de pacientes
- Exclusão de pacientes
- Integração do frontend com a API Laravel
- Carregamento das unidades de saúde pela API
- Validações no backend
- Mensagens de validação em português
- Relacionamento entre pacientes e unidades de saúde
- Migrations
- Seeder das unidades de saúde
- Consultas SQL obrigatórias
- Paginação
- Máscara de CPF
- Máscara de telefone
- Teste automatizado básico da API

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- PHP
- Composer
- MySQL
- Git

## Instalação

Clone o repositório:

```bash
git clone https://github.com/jotaveroneze/Desafio_PHP_JR.git
```

Entre na pasta do projeto:

```bash
cd Desafio_PHP_JR
```

Instale as dependências do Laravel:

```bash
composer install
```

## Configuração do ambiente

Crie o arquivo `.env` a partir do `.env.example`.

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

Gere a chave da aplicação:

```bash
php artisan key:generate
```

## Configuração do banco de dados

Acesse o MySQL:

```bash
mysql -u root -p
```

Crie o banco:

```sql
CREATE DATABASE IF NOT EXISTS desafio_saude
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

Depois configure o arquivo `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=desafio_saude
DB_USERNAME=root
DB_PASSWORD=
```

Preencha `DB_PASSWORD` com a senha configurada no seu MySQL.

Depois de alterar o `.env`, limpe o cache das configurações:

```bash
php artisan config:clear
php artisan cache:clear
```

## Criação das tabelas e unidades de saúde

Execute as migrations e o seeder:

```bash
php artisan migrate --seed
```

Esse comando:

- cria as tabelas do banco de dados;
- cria o relacionamento entre pacientes e unidades de saúde;
- cadastra as unidades de saúde iniciais.

## Executando o projeto

Inicie o servidor do Laravel:

```bash
php artisan serve
```

Após iniciar, o terminal deverá informar um endereço semelhante a:

```text
http://127.0.0.1:8000
```

Abra esse endereço no navegador.

A página principal do sistema será carregada e permitirá utilizar as funcionalidades de cadastro, consulta, edição e exclusão de pacientes.

O frontend utiliza HTML, CSS, JavaScript puro e Bootstrap 5. O Bootstrap é carregado via CDN, portanto não é necessário executar `npm install` ou realizar build do frontend.

## API

A aplicação disponibiliza os seguintes endpoints:

```text
GET    /api/patients
GET    /api/patients?search=nome
POST   /api/patients
GET    /api/patients/{id}
PUT    /api/patients/{id}
PATCH  /api/patients/{id}
DELETE /api/patients/{id}

GET    /api/health-units
```

### Listagem de pacientes

```http
GET /api/patients
```

A listagem é paginada.

### Busca por nome

```http
GET /api/patients?search=Carlos
```

A busca é parcial, permitindo localizar pacientes cujo nome contenha o termo informado.

## Validações

O backend valida os seguintes campos:

- Nome obrigatório
- CPF obrigatório
- CPF com exatamente 11 dígitos
- CPF único
- Data de nascimento obrigatória
- Data de nascimento não pode ser futura
- Unidade de saúde obrigatória
- Unidade de saúde deve existir no banco
- Telefone opcional

Os erros de validação são retornados pela API e apresentados ao usuário na interface.

## Consultas SQL

As consultas SQL obrigatórias estão no arquivo:

```text
sql/consultas.sql
```

O arquivo contém:

1. Listagem dos pacientes com o nome da respectiva unidade utilizando `JOIN`
2. Contagem de pacientes por unidade utilizando `LEFT JOIN` e `GROUP BY`
3. Busca parcial de pacientes pelo nome utilizando `LIKE`

Para executar as consultas manualmente, entre no MySQL:

```bash
mysql -u root -p
```

Selecione o banco:

```sql
USE desafio_saude;
```

Depois execute:

```sql
SOURCE C:/caminho/do/projeto/Desafio_PHP_JR/sql/consultas.sql;
```

Exemplo:

```sql
SOURCE C:/Users/usuario/Desafio_PHP_JR/sql/consultas.sql;
```

## Testes automatizados

O projeto possui um teste automatizado básico da API de pacientes.

O teste verifica o cadastro de um paciente através da API.

Para executar somente o teste de pacientes:

```bash
php artisan test --filter=PatientApiTest
```

Para executar todos os testes:

```bash
php artisan test
```

Os testes devem utilizar um banco separado do banco principal da aplicação.

Exemplo:

```text
desafio_saude_test
```

## Funcionalidades adicionais

Além dos requisitos obrigatórios, o projeto possui:

- Paginação da listagem
- Máscara visual de CPF
- Máscara visual de telefone
- Listagem em ordem alfabética
- Interface com modais
- Mensagens de sucesso e erro
- JavaScript separado por responsabilidade
- Teste automatizado da API
- Commits organizados por etapas de desenvolvimento

## Observações

O arquivo `.env` não é versionado no Git por conter configurações locais e possíveis credenciais.

As pastas `vendor` e `node_modules` também não são versionadas.

O projeto foi desenvolvido para execução local utilizando os comandos padrões do Laravel.