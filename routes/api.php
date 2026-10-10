<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\HealthUnitController;

Route::get('/patients', [PatientController::class, 'index']);
Route::post('/patients', [PatientController::class, 'store']);
Route::get('/patients/{id}', [PatientController::class, 'show']);
Route::put('/patients/{id}', [PatientController::class, 'update']);
Route::patch('/patients/{id}', [PatientController::class, 'update']);
Route::delete('/patients/{id}', [PatientController::class, 'destroy']);

Route::get('/health-units', [HealthUnitController::class, 'index']);