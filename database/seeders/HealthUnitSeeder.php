<?php

namespace Database\Seeders;

use App\Models\HealthUnit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HealthUnitSeeder extends Seeder
{
    public function run(): void
    {
        HealthUnit::create([
            'uuid' => Str::uuid(),
            'name' => 'UBS Centro',
            'city' => 'Piracicaba',
        ]);

        HealthUnit::create([
            'uuid' => Str::uuid(),
            'name' => 'UBS Vila Rezende',
            'city' => 'Piracicaba',
        ]);

        HealthUnit::create([
            'uuid' => Str::uuid(),
            'name' => 'UBS Paulista',
            'city' => 'Piracicaba',
        ]);
    }
}