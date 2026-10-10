<!-- MODAL EDITAR PACIENTE -->
<div class="modal" id="editPatientModal">
    <div class="modal-content">

        <div class="modal-header">
            <h2>Editar paciente</h2>

            <button
                type="button"
                class="btn-close"
                data-close="editPatientModal"
            >
                ×
            </button>
        </div>

        <form id="editPatientForm">

            <input
                type="hidden"
                id="editPatientId"
            >

            <div class="form-group">
                <label for="editName">Nome</label>

                <input
                    type="text"
                    id="editName"
                    required
                >
            </div>

            <div class="form-group">
                <label for="editCpf">CPF</label>

                <input
                    type="text"
                    id="editCpf"
                    maxlength="14"
                    required
                >
            </div>

            <div class="form-group">
                <label for="editBirthDate">
                    Data de nascimento
                </label>

                <input
                    type="date"
                    id="editBirthDate"
                    required
                >
            </div>

            <div class="form-group">
                <label for="editPhone">
                    Telefone
                </label>

                <input
                    type="text"
                    id="editPhone"
                >
            </div>

            <div class="form-group">
                <label for="editHealthUnit">
                    Unidade de saúde
                </label>

                <select
                    id="editHealthUnit"
                    required
                >
                    <option value="">
                        Carregando unidades...
                    </option>
                </select>
            </div>

            <div class="modal-actions">
                <button
                    type="button"
                    class="btn-secondary"
                    data-close="editPatientModal"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    class="btn-primary"
                >
                    Salvar alterações
                </button>
            </div>

        </form>

    </div>
</div>