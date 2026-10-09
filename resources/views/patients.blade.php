<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Pacientes</title>

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
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
                class="btn-primary"
                id="btnNovoPaciente"
            >
                + Novo paciente
            </button>
        </header>

        <section class="card">

            <div class="search-area">
                <input
                    type="text"
                    id="search"
                    placeholder="Pesquisar paciente pelo nome..."
                >

                <button type="button" id="btnBuscar">
                    Buscar
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

                    <tbody id="patientsTable">

                        <tr>
                            <td>
                                <button
                                    type="button"
                                    class="patient-link"
                                    data-patient-id="1"
                                    data-name="Maria Silva"
                                    data-cpf="123.456.789-01"
                                    data-birth-date="1995-04-10"
                                    data-phone="(19) 99999-9999"
                                    data-health-unit="UBS Centro"
                                >
                                    Maria Silva
                                </button>
                            </td>

                            <td>123.456.789-01</td>

                            <td>UBS Centro</td>

                            <td class="actions">

                                <button
                                    type="button"
                                    class="btn-edit"
                                    data-patient-id="1"
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    class="btn-delete"
                                    data-patient-id="1"
                                >
                                    Excluir
                                </button>

                            </td>
                        </tr>

                    </tbody>
                </table>

            </div>

        </section>

    </main>

    @include('modais.adicionarPaciente')
    @include('modais.editarPaciente')
    @include('modais.verMais')

    <script src="{{ asset('js/patients.js') }}"></script>

</body>
</html>