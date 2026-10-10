<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::with('healthUnit');

        if ($request->filled('search')) {
            $query->where(
                'name',
                'like',
                '%' . $request->search . '%'
            );
        }

        $patients = $query
            ->orderBy('name')
            ->paginate(5);

        return response()->json($patients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => ['required', 'string', 'max:255'],
                'cpf' => ['required', 'digits:11', 'unique:patients,cpf'],
                'birth_date' => ['required', 'date', 'before_or_equal:today'],
                'phone' => ['nullable', 'string', 'max:20'],
                'health_unit_id' => ['required', 'exists:health_units,id'],
            ],
            [
                'name.required' => 'O nome é obrigatório.',
                'name.string' => 'O nome informado é inválido.',
                'name.max' => 'O nome deve ter no máximo 255 caracteres.',

                'cpf.required' => 'O CPF é obrigatório.',
                'cpf.digits' => 'O CPF deve conter exatamente 11 números.',
                'cpf.unique' => 'Este CPF já está cadastrado.',

                'birth_date.required' => 'A data de nascimento é obrigatória.',
                'birth_date.date' => 'A data de nascimento é inválida.',
                'birth_date.before_or_equal' => 'A data de nascimento não pode ser futura.',

                'phone.string' => 'O telefone informado é inválido.',
                'phone.max' => 'O telefone deve ter no máximo 20 caracteres.',

                'health_unit_id.required' => 'A unidade de saúde é obrigatória.',
                'health_unit_id.exists' => 'A unidade de saúde selecionada não existe.',
            ]
        );

        $patient = Patient::create($validated);

        $patient->load('healthUnit');

        return response()->json($patient, 201);
    }

    public function show(string $id)
    {
        $patient = Patient::with('healthUnit')->find($id);

        if (!$patient) {
            return response()->json([
                'message' => 'Paciente não encontrado.'
            ], 404);
        }

        return response()->json($patient);
    }

    public function update(Request $request, string $id)
{
    $patient = Patient::find($id);

    if (!$patient) {
        return response()->json([
            'message' => 'Paciente não encontrado.'
        ], 404);
    }

    $validated = $request->validate(
        [
            'name' => ['required', 'string', 'max:255'],

            'cpf' => [
                'required',
                'digits:11',
                Rule::unique('patients', 'cpf')->ignore($patient->id),
            ],

            'birth_date' => [
                'required',
                'date',
                'before_or_equal:today',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20',
            ],

            'health_unit_id' => [
                'required',
                'exists:health_units,id',
            ],
        ],
        [
            'name.required' => 'O nome é obrigatório.',
            'name.string' => 'O nome informado é inválido.',
            'name.max' => 'O nome deve ter no máximo 255 caracteres.',

            'cpf.required' => 'O CPF é obrigatório.',
            'cpf.digits' => 'O CPF deve conter exatamente 11 números.',
            'cpf.unique' => 'Este CPF já está cadastrado.',

            'birth_date.required' => 'A data de nascimento é obrigatória.',
            'birth_date.date' => 'A data de nascimento é inválida.',
            'birth_date.before_or_equal' => 'A data de nascimento não pode ser futura.',

            'phone.string' => 'O telefone informado é inválido.',
            'phone.max' => 'O telefone deve ter no máximo 20 caracteres.',

            'health_unit_id.required' => 'A unidade de saúde é obrigatória.',
            'health_unit_id.exists' => 'A unidade de saúde selecionada não existe.',
        ]
    );

    $patient->update($validated);

    $patient->load('healthUnit');

    return response()->json($patient);

}

    public function destroy(string $id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json([
                'message' => 'Paciente não encontrado.'
            ], 404);
        }

        $patient->delete();

        return response()->json([
            'message' => 'Paciente excluído com sucesso.'
        ]);
    }
}