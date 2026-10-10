<?php

namespace Tests\Feature;

use App\Models\HealthUnit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class PatientApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_paciente_pode_ser_cadastrado(): void
    {
        $healthUnit = HealthUnit::create([
            'uuid' => Str::uuid(),
            'name' => 'UBS Teste',
            'city' => 'Piracicaba',
        ]);

        $response = $this->postJson('/api/patients', [
            'name' => 'Paciente Teste',
            'cpf' => '12345678901',
            'birth_date' => '2000-01-01',
            'phone' => '19999999999',
            'health_unit_id' => $healthUnit->id,
        ]);

        $response
            ->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'Paciente Teste',
                'cpf' => '12345678901',
            ]);

        $this->assertDatabaseHas('patients', [
            'name' => 'Paciente Teste',
            'cpf' => '12345678901',
        ]);
    }
}