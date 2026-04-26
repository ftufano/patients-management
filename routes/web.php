<?php

use App\Http\Controllers\PatientController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ClinicHistoryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'translations' => trans('welcome'),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('patients', [PatientController::class, 'index'])->name('patients');
    Route::get('patients/create', [PatientController::class, 'create'])->name('patients.create');
    Route::post('patients', [PatientController::class, 'store'])->name('patients.store');

    Route::get('histories', [ClinicHistoryController::class, 'index'])->name('histories');
    Route::get('histories/create', fn () => Inertia::render('histories/create'))->name('histories.create');
    Route::get('histories/verify-patient', [ClinicHistoryController::class, 'verifyPatient'])->name('histories.verify-patient');
    Route::post('histories', [ClinicHistoryController::class, 'store'])->name('histories.store');

    Route::get('appointments', [AppointmentController::class, 'index'])->name('appointments');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
