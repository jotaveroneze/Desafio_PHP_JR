const btnNovoPaciente = document.getElementById('btnNovoPaciente');
const tabelaPacientesModal = document.getElementById('patientsTable');

const addPatientModal = document.getElementById('addPatientModal');
const editPatientModal = document.getElementById('editPatientModal');
const detailsPatientModal = document.getElementById('detailsPatientModal');
const messageModal = document.getElementById('messageModal');

const addPatientForm = document.getElementById('addPatientForm');
const editPatientForm = document.getElementById('editPatientForm');

const addHealthUnit = document.getElementById('addHealthUnit');
const editHealthUnit = document.getElementById('editHealthUnit');

const messageTitle = document.getElementById('messageTitle');
const modalMessage = document.getElementById('modalMessage');
const messageBox = document.getElementById('messageBox');

const addPhone = document.getElementById('addPhone');
const editPhone = document.getElementById('editPhone');
const addCpf = document.getElementById('addCpf');
const editCpf = document.getElementById('editCpf');


window.abrirModal = function (modal) {
    if (!modal) {
        return;
    }

    modal.classList.add('show');
};


window.fecharModal = function (modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('show');
};


window.mostrarMensagemModal = function (
    mensagem,
    tipo = 'sucesso'
) {
    if (!messageModal || !modalMessage || !messageTitle || !messageBox) {
        return;
    }

    modalMessage.textContent = mensagem;

    messageBox.classList.remove(
        'message-success-modal',
        'message-error-modal'
    );

    if (tipo === 'erro') {
        messageTitle.textContent = 'Erro';

        messageBox.classList.add(
            'message-error-modal'
        );
    } else {
        messageTitle.textContent = 'Sucesso';

        messageBox.classList.add(
            'message-success-modal'
        );
    }

    abrirModal(messageModal);
};


window.mostrarErros = function (data) {
    let mensagem = 'Ocorreu um erro.';

    if (data?.errors) {
        mensagem = Object.values(data.errors)
            .flat()
            .join(' ');
    } else if (data?.message) {
        mensagem = data.message;
    }

    mostrarMensagemModal(
        mensagem,
        'erro'
    );
};


if (btnNovoPaciente) {
    btnNovoPaciente.addEventListener('click', () => {
        abrirModal(addPatientModal);
    });
}


document.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
        const modalId = button.dataset.close;
        const modal = document.getElementById(modalId);

        fecharModal(modal);
    });
});


if (messageModal) {
    messageModal.addEventListener('click', (event) => {
        if (event.target === messageModal) {
            fecharModal(messageModal);
        }
    });
}



async function carregarUnidades() {
    try {
        const response = await fetch('/api/health-units');

        if (!response.ok) {
            throw new Error(
                'Erro ao carregar unidades de saúde.'
            );
        }

        const healthUnits = await response.json();

        if (addHealthUnit) {
            addHealthUnit.innerHTML = `
                <option value="">
                    Selecione uma unidade
                </option>
            `;
        }

        if (editHealthUnit) {
            editHealthUnit.innerHTML = `
                <option value="">
                    Selecione uma unidade
                </option>
            `;
        }

        healthUnits.forEach((unit) => {
            const optionAdd = document.createElement('option');

            optionAdd.value = unit.id;
            optionAdd.textContent = `${unit.name} - ${unit.city}`;

            const optionEdit = optionAdd.cloneNode(true);

            if (addHealthUnit) {
                addHealthUnit.appendChild(optionAdd);
            }

            if (editHealthUnit) {
                editHealthUnit.appendChild(optionEdit);
            }
        });

    } catch (error) {
        console.error(error);

        mostrarMensagemModal(
            'Não foi possível carregar as unidades de saúde.',
            'erro'
        );
    }
}


if (addPatientForm) {
    addPatientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const cpf = document
            .getElementById('addCpf')
            .value
            .replace(/\D/g, '');

        if (cpf.length !== 11) {
            mostrarMensagemModal(
                'O CPF deve conter exatamente 11 números.',
                'erro'
            );

            return;
        }

        const patient = {
            name: document
                .getElementById('addName')
                .value
                .trim(),

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

            mostrarMensagemModal(
                'Paciente cadastrado com sucesso.'
            );

        } catch (error) {
            console.error(error);

            mostrarMensagemModal(
                'Não foi possível cadastrar o paciente.',
                'erro'
            );
        }
    });
}


if (tabelaPacientesModal) {
    tabelaPacientesModal.addEventListener('click', async (event) => {
        const editButton = event.target.closest('.btn-edit');

        if (!editButton) {
            return;
        }

        const patientId = editButton.dataset.patientId;

        try {
            const response = await fetch(
                `/api/patients/${patientId}`
            );

            const data = await response.json();

            if (!response.ok) {
                mostrarErros(data);
                return;
            }

            document.getElementById('editPatientId').value =
                data.id;

            document.getElementById('editName').value =
                data.name;

            document.getElementById('editCpf').value =
                aplicarMascaraCpf(data.cpf);

            document.getElementById('editBirthDate').value =
                data.birth_date.substring(0, 10);

            document.getElementById('editPhone').value =
                data.phone
                    ? aplicarMascaraTelefone(data.phone)
                    : '';

            document.getElementById('editHealthUnit').value =
                data.health_unit_id;

            abrirModal(editPatientModal);

        } catch (error) {
            console.error(error);

            mostrarMensagemModal(
                'Não foi possível carregar os dados do paciente.',
                'erro'
            );
        }
    });
}


if (editPatientForm) {
    editPatientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const patientId =
            document.getElementById('editPatientId').value;

        const cpf = document
            .getElementById('editCpf')
            .value
            .replace(/\D/g, '');

        if (cpf.length !== 11) {
            mostrarMensagemModal(
                'O CPF deve conter exatamente 11 números.',
                'erro'
            );

            return;
        }

        const patient = {
            name: document
                .getElementById('editName')
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

            mostrarMensagemModal(
                'Paciente atualizado com sucesso.'
            );

        } catch (error) {
            console.error(error);

            mostrarMensagemModal(
                'Não foi possível atualizar o paciente.',
                'erro'
            );
        }
    });
}


if (tabelaPacientesModal) {
    tabelaPacientesModal.addEventListener('click', async (event) => {
        const patientLink =
            event.target.closest('.patient-link');

        if (!patientLink) {
            return;
        }

        const patientId =
            patientLink.dataset.patientId;

        try {
            const response = await fetch(
                `/api/patients/${patientId}`
            );

            const data = await response.json();

            if (!response.ok) {
                mostrarErros(data);
                return;
            }

            document.getElementById('detailName').textContent =
                data.name;

            document.getElementById('detailCpf').textContent =
                formatarCpf(data.cpf);

            document.getElementById('detailBirthDate').textContent =
                formatarData(data.birth_date);

            document.getElementById('detailPhone').textContent =
                data.phone
                    ? aplicarMascaraTelefone(data.phone)
                    : 'Não informado';

            document.getElementById('detailHealthUnit').textContent =
                data.health_unit?.name || 'Não informado';

            abrirModal(detailsPatientModal);

        } catch (error) {
            console.error(error);

            mostrarMensagemModal(
                'Não foi possível carregar os dados do paciente.',
                'erro'
            );
        }
    });
}

if (addPhone) {
    addPhone.addEventListener('input', () => {
        addPhone.value = aplicarMascaraTelefone(
            addPhone.value
        );
    });
}

if (editPhone) {
    editPhone.addEventListener('input', () => {
        editPhone.value = aplicarMascaraTelefone(
            editPhone.value
        );
    });
}

if (addCpf) {
    addCpf.addEventListener('input', () => {
        addCpf.value = aplicarMascaraCpf(addCpf.value);
    });
}

if (editCpf) {
    editCpf.addEventListener('input', () => {
        editCpf.value = aplicarMascaraCpf(editCpf.value);
    });
}


carregarUnidades();