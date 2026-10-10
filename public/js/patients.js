const patientsTable = document.getElementById('patientsTable');

const searchInput = document.getElementById('search');
const btnBuscar = document.getElementById('btnBuscar');

const pagination =
    document.getElementById('pagination');


async function carregarPacientes(
    search = '',
    page = 1
) {
    try {
        let url = `/api/patients?page=${page}`;

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                'Erro ao carregar pacientes.'
            );
        }

        const result = await response.json();

        const patients = result.data;

        patientsTable.innerHTML = '';
        pagination.innerHTML = '';

        if (patients.length === 0) {
            patientsTable.innerHTML = `
                <tr>
                    <td colspan="4">
                        Nenhum paciente encontrado.
                    </td>
                </tr>
            `;

            return;
        }

        patients.forEach((patient) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>
                    <button
                        type="button"
                        class="patient-link"
                        data-patient-id="${patient.id}"
                    >
                        ${patient.name}
                    </button>
                </td>

                <td>
                    ${formatarCpf(patient.cpf)}
                </td>

                <td>
                    ${patient.health_unit?.name ?? 'Não informado'}
                </td>

                <td class="actions">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-primary btn-edit"
                        data-patient-id="${patient.id}"
                        title="Editar paciente"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger btn-delete"
                        data-patient-id="${patient.id}"
                        title="Excluir paciente"
                    >
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;

            patientsTable.appendChild(row);
        });

        criarPaginacao(
            result.current_page,
            result.last_page
        );

    } catch (error) {
        console.error(error);

        mostrarMensagemModal(
            'Não foi possível carregar os pacientes.',
            'erro'
        );
    }
}

function criarPaginacao(
    paginaAtual,
    ultimaPagina
) {
    pagination.innerHTML = '';

    if (ultimaPagina <= 1) {
        return;
    }

    if (paginaAtual > 1) {
        const anterior =
            document.createElement('button');

        anterior.textContent = 'Anterior';

        anterior.addEventListener('click', () => {
            carregarPacientes(
                searchInput.value.trim(),
                paginaAtual - 1
            );
        });

        pagination.appendChild(anterior);
    }

    for (
        let pagina = 1;
        pagina <= ultimaPagina;
        pagina++
    ) {
        const botao =
            document.createElement('button');

        botao.textContent = pagina;

        if (pagina === paginaAtual) {
            botao.classList.add('active');
        }

        botao.addEventListener('click', () => {
            carregarPacientes(
                searchInput.value.trim(),
                pagina
            );
        });

        pagination.appendChild(botao);
    }

    if (paginaAtual < ultimaPagina) {
        const proxima =
            document.createElement('button');

        proxima.textContent = 'Próxima';

        proxima.addEventListener('click', () => {
            carregarPacientes(
                searchInput.value.trim(),
                paginaAtual + 1
            );
        });

        pagination.appendChild(proxima);
    }
}

function buscarPacientes() {
    const search = searchInput.value.trim();

    carregarPacientes(search);
}


btnBuscar.addEventListener('click', buscarPacientes);


searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        buscarPacientes();
    }
});


searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        carregarPacientes();
    }
});


patientsTable.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.btn-delete');

    if (!deleteButton) {
        return;
    }

    const patientId = deleteButton.dataset.patientId;

    const confirmed = confirm(
        'Deseja realmente excluir este paciente?'
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(
            `/api/patients/${patientId}`,
            {
                method: 'DELETE',

                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            mostrarErros(data);
            return;
        }

        await carregarPacientes();

        mostrarMensagemModal(
            'Paciente excluído com sucesso.'
        );

    } catch (error) {
        console.error(error);

        mostrarMensagemModal(
            'Não foi possível excluir o paciente.',
            'erro'
        );
    }
});


carregarPacientes();