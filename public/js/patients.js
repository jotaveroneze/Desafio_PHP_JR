const btnNovoPaciente = document.getElementById('btnNovoPaciente');

const addPatientModal = document.getElementById('addPatientModal');
const editPatientModal = document.getElementById('editPatientModal');
const detailsPatientModal = document.getElementById('detailsPatientModal');

function abrirModal(modal) {
    modal.classList.add('show');
}

function fecharModal(modal) {
    modal.classList.remove('show');
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

document.querySelectorAll('.btn-edit').forEach((button) => {
    button.addEventListener('click', () => {
        abrirModal(editPatientModal);
    });
});

document.querySelectorAll('.patient-link').forEach((button) => {
    button.addEventListener('click', () => {
        document.getElementById('detailName').textContent =
            button.dataset.name;

        document.getElementById('detailCpf').textContent =
            button.dataset.cpf;

        document.getElementById('detailBirthDate').textContent =
            button.dataset.birthDate;

        document.getElementById('detailPhone').textContent =
            button.dataset.phone || 'Não informado';

        document.getElementById('detailHealthUnit').textContent =
            button.dataset.healthUnit;

        abrirModal(detailsPatientModal);
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