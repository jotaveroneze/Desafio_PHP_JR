<?php

namespace Database\Seeders;

use App\Models\HealthUnit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HealthUnitSeeder extends Seeder
{
    public function run(): void
    {
        HealthUnit::firstOrCreate(
            [
                'name' => 'UBS Centro',
                'city' => 'Piracicaba',
            ],
            [
                'uuid' => Str::uuid(),
            ]
        );

        HealthUnit::firstOrCreate(
            [
                'name' => 'UBS Vila Rezende',
                'city' => 'Piracicaba',
            ],
            [
                'uuid' => Str::uuid(),
            ]
        );

        HealthUnit::firstOrCreate(
            [
                'name' => 'UBS Paulista',
                'city' => 'Piracicaba',
            ],
            [
                'uuid' => Str::uuid(),
            ]
        );
    }
}