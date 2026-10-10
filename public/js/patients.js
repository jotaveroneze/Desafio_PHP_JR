const btnNovoPaciente = document.getElementById('btnNovoPaciente');

const addPatientModal = document.getElementById('addPatientModal');
const editPatientModal = document.getElementById('editPatientModal');
const detailsPatientModal = document.getElementById('detailsPatientModal');

const patientsTable = document.getElementById('patientsTable');

const addPatientForm = document.getElementById('addPatientForm');
const editPatientForm = document.getElementById('editPatientForm');

const searchInput = document.getElementById('search');
const btnBuscar = document.getElementById('btnBuscar');


function abrirModal(modal) {
    modal.classList.add('show');
}


function fecharModal(modal) {
    modal.classList.remove('show');
}


function formatarCpf(cpf) {
    return cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
    );
}

btnBuscar.addEventListener('click', () => {
    const search = searchInput.value.trim();

    carregarPacientes(search);
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const search = searchInput.value.trim();

        carregarPacientes(search);
    }
});

searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() === '') {
        carregarPacientes();
    }
});


function mostrarMensagem(texto, erro = false) {
    const message = document.getElementById('message');

    message.textContent = texto;

    message.className = erro
        ? 'message-error'
        : 'message-success';

    setTimeout(() => {
        message.textContent = '';
        message.className = '';
    }, 4000);
}


function mostrarErros(data) {
    if (!data.errors) {
        mostrarMensagem(
            data.message || 'Ocorreu um erro.',
            true
        );

        return;
    }

    const mensagens = Object.values(data.errors)
        .flat()
        .join(' ');

    mostrarMensagem(mensagens, true);
}

function formatarData(data) {
    const dataFormatada = data.substring(0, 10);

    const [ano, mes, dia] = dataFormatada.split('-');

    return `${dia}/${mes}/${ano}`;
}


async function carregarPacientes(search = '') {
    try {
        let url = '/api/patients';

        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao carregar pacientes.');
        }

        const patients = await response.json();

        patientsTable.innerHTML = '';

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
                        class="btn-edit"
                        data-patient-id="${patient.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="btn-delete"
                        data-patient-id="${patient.id}"
                    >
                        Excluir
                    </button>
                </td>
            `;

            patientsTable.appendChild(row);
        });

    } catch (error) {
        console.error(error);

        mostrarMensagem(
            'Não foi possível carregar os pacientes.',
            true
        );
    }
}

btnNovoPaciente.addEventListener('click', () => {
    abrirModal(addPatientModal);
});


document.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
        const modalId = button.dataset.close;
        const modal = document.getElementById(modalId);

        fecharModal(modal);
    });
});


document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal(modal);
        }
    });
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach((modal) => {
            fecharModal(modal);
        });
    }
});


addPatientForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cpf = document
        .getElementById('addCpf')
        .value
        .replace(/\D/g, '');

    if (cpf.length !== 11) {
        mostrarMensagem(
            'O CPF deve conter exatamente 11 números.',
            true
        );

        return;
    }

    const patient = {
        name: document.getElementById('addName').value.trim(),

        cpf: cpf,

        birth_date:
            document.getElementById('addBirthDate').value,

        phone:
            document
                .getElementById('addPhone')
                .value
                .replace(/\D/g, '') || null,

        health_unit_id:
            document.getElementById('addHealthUnit').value
    };

    try {
        const response = await fetch('/api/patients', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(patient)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarErros(data);
            return;
        }

        addPatientForm.reset();

        fecharModal(addPatientModal);

        await carregarPacientes();

        mostrarMensagem(
            'Paciente cadastrado com sucesso.'
        );

    } catch (error) {
        console.error(error);

        mostrarMensagem(
            'Não foi possível cadastrar o paciente.',
            true
        );
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
            mostrarMensagem(
                data.message || 'Erro ao excluir paciente.',
                true
            );

            return;
        }

        await carregarPacientes();

        mostrarMensagem(
            'Paciente excluído com sucesso.'
        );

    } catch (error) {
        console.error(error);

        mostrarMensagem(
            'Não foi possível excluir o paciente.',
            true
        );
    }
});


patientsTable.addEventListener('click', async (event) => {
    const editButton = event.target.closest('.btn-edit');

    if (!editButton) {
        return;
    }

    const patientId = editButton.dataset.patientId;

    try {
        const response = await fetch(
            `/api/patients/${patientId}`
        );

        if (!response.ok) {
            throw new Error(
                'Paciente não encontrado.'
            );
        }

        const patient = await response.json();

        document.getElementById('editPatientId').value =
            patient.id;

        document.getElementById('editName').value =
            patient.name;

        document.getElementById('editCpf').value =
            patient.cpf;

        document.getElementById('editBirthDate').value =
            patient.birth_date.substring(0, 10);

        document.getElementById('editPhone').value =
            patient.phone || '';

        document.getElementById('editHealthUnit').value =
            patient.health_unit_id;

        abrirModal(editPatientModal);

    } catch (error) {
        console.error(error);

        mostrarMensagem(
            'Não foi possível carregar os dados do paciente.',
            true
        );
    }
});


editPatientForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const patientId =
        document.getElementById('editPatientId').value;

    const cpf = document
        .getElementById('editCpf')
        .value
        .replace(/\D/g, '');

    if (cpf.length !== 11) {
        mostrarMensagem(
            'O CPF deve conter exatamente 11 números.',
            true
        );

        return;
    }

    const patient = {
        name:
            document.getElementById('editName')
                .value
                .trim(),

        cpf: cpf,

        birth_date:
            document.getElementById('editBirthDate').value,

        phone:
            document
                .getElementById('editPhone')
                .value
                .replace(/\D/g, '') || null,

        health_unit_id:
            document.getElementById('editHealthUnit').value
    };

    try {
        const response = await fetch(
            `/api/patients/${patientId}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                body: JSON.stringify(patient)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            mostrarErros(data);
            return;
        }

        editPatientForm.reset();

        fecharModal(editPatientModal);

        await carregarPacientes();

        mostrarMensagem(
            'Paciente atualizado com sucesso.'
        );

    } catch (error) {
        console.error(error);

        mostrarMensagem(
            'Não foi possível atualizar o paciente.',
            true
        );
    }
});

patientsTable.addEventListener('click', async (event) => {
    const patientLink = event.target.closest('.patient-link');

    if (!patientLink) {
        return;
    }

    const patientId = patientLink.dataset.patientId;

    try {
        const response = await fetch(
            `/api/patients/${patientId}`
        );

        if (!response.ok) {
            throw new Error(
                'Paciente não encontrado.'
            );
        }

        const patient = await response.json();

        document.getElementById('detailName').textContent =
            patient.name;

        document.getElementById('detailCpf').textContent =
            formatarCpf(patient.cpf);

        document.getElementById('detailBirthDate').textContent =
            formatarData(patient.birth_date);

        document.getElementById('detailPhone').textContent =
            patient.phone || 'Não informado';

        document.getElementById('detailHealthUnit').textContent =
            patient.health_unit?.name || 'Não informado';

        abrirModal(detailsPatientModal);

    } catch (error) {
        console.error(error);

        mostrarMensagem(
            'Não foi possível carregar os dados do paciente.',
            true
        );
    }
});

carregarPacientes();