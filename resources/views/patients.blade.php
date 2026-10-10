<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Pacientes</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link
    rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>

<body>

    <main class="container">

        <header class="header">
            <div>
                <h1>Pacientes</h1>
                <p>Gerencie os pacientes cadastrados nas unidades de saúde.</p>
            </div>

            <button
                type="button"
                class="btn btn-primary"
                id="btnNovoPaciente"
            >
                <i class="bi bi-plus-lg"></i>
                Novo paciente
            </button>
        </header>

        <section class="card">

            <div class="search-area">
                <input
                    type="text"
                    id="search"
                    placeholder="Pesquisar paciente pelo nome..."
                >

                <button
                    type="button"
                    class="btn btn-secondary"
                    id="btnBuscar"
                >
                    <i class="bi bi-search"></i>
                </button>
            </div>

            <div id="message"></div>

            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Unidade de saúde</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody id="patientsTable"></tbody>
                </table>
            </div>

            <div
                class="pagination"
                id="pagination"
            ></div>

        </section>

    </main>

    @include('modais.adicionarPaciente')
    @include('modais.editarPaciente')
    @include('modais.verMais')
    @include('modais.mensagem')

<script src="{{ asset('js/utils.js') }}"></script>
<script src="{{ asset('js/modais/modais.js') }}"></script>
<script src="{{ asset('js/patients.js') }}"></script>

</body>
</html>