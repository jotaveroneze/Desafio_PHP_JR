# Desafio PHP Júnior - Cadastro de Pacientes

Aplicação web desenvolvida em Laravel para cadastro, consulta, edição e exclusão de pacientes vinculados a unidades de saúde.

## Tecnologias

- PHP
- Laravel
- MySQL
- HTML
- CSS
- JavaScript
- Fetch API
- Git
- GitHub

## O que o sistema faz

O sistema permite gerenciar pacientes vinculados a unidades de saúde.

As principais funções disponíveis são:

- Cadastrar pacientes
- Listar pacientes cadastrados
- Buscar pacientes pelo nome
- Visualizar os dados completos de um paciente
- Editar pacientes
- Excluir pacientes com confirmação
- Vincular pacientes a unidades de saúde
- Carregar unidades de saúde diretamente da API
- Validar CPF com 11 dígitos
- Impedir cadastro de CPF duplicado
- Impedir data de nascimento futura
- Validar a existência da unidade de saúde
- Exibir mensagens de sucesso e erro no frontend

## O que está funcionando

- Cadastro de pacientes
- Listagem de pacientes em ordem alfabética pelo nome
- Busca parcial por nome
- Visualização dos detalhes do paciente
- Edição de pacientes
- Exclusão de pacientes com confirmação
- Paginação da listagem de pacientes
- Integração do frontend com a API Laravel utilizando Fetch API
- Carregamento das unidades pela rota `/api/health-units`
- Validações de dados no backend
- Mensagens de validação em português
- Relacionamento entre pacientes e unidades de saúde
- Migrations do banco de dados
- Seeder das unidades de saúde
- Consultas SQL obrigatórias em `sql/consultas.sql`
- Modal padronizado para mensagens de sucesso e erro
- Máscara visual de CPF
- Máscara visual de telefone

## Funcionalidades adicionais

Além dos requisitos obrigatórios, o projeto também possui:

- Máscara visual de CPF
- Máscara visual de telefone
- Paginação da listagem de pacientes
- Interface organizada para cadastro, edição e visualização de pacientes
- JavaScript separado por responsabilidade
- Commits organizados por etapa de desenvolvimento
- Teste automatizado básico da API

## Testes

O projeto possui um teste automatizado básico da API de pacientes.

Para executar todos os testes:

```bash
php artisan test