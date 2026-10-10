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
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $patients = $query
            ->orderBy('name')
            ->get();

        return response()->json($patients);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'cpf' => ['required', 'digits:11', 'unique:patients,cpf'],
            'birth_date' => ['required', 'date', 'before_or_equal:today'],
            'phone' => ['nullable', 'string', 'max:20'],
            'health_unit_id' => ['required', 'exists:health_units,id'],
        ]);

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

        $validated = $request->validate([
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
        ]);

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