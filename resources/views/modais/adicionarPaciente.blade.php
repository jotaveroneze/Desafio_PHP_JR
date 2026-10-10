<div class="modal" id="addPatientModal">
    <div class="modal-content">

        <div class="modal-header">
            <h2>Novo paciente</h2>

            <button
                type="button"
                class="btn-close"
                data-close="addPatientModal"
            >
                ×
            </button>
        </div>

        <form id="addPatientForm">

            <div class="form-group">
                <label for="addName">Nome</label>

                <input
                    type="text"
                    id="addName"
                    required
                >
            </div>

            <div class="form-group">
                <label for="addCpf">CPF</label>

                <input
                    type="text"
                    id="addCpf"
                    maxlength="14"
                    required
                >
            </div>

            <div class="form-group">
                <label for="addBirthDate">
                    Data de nascimento
                </label>

                <input
                    type="date"
                    id="addBirthDate"
                    required
                >
            </div>

            <div class="form-group">
                <label for="addPhone">
                    Telefone
                </label>

                <input
                    type="text"
                    id="addPhone"
                >
            </div>

            <div class="form-group">
                <label for="addHealthUnit">
                    Unidade de saúde
                </label>

                <select
                    id="addHealthUnit"
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
                    data-close="addPatientModal"
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    class="btn-primary"
                >
                    Salvar
                </button>
            </div>

        </form>

    </div>
</div>