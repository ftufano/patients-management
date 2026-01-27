<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// All protected routes
Route::middleware('auth:sanctum')->group(function () {
	// User routes
	Route::get('/user', [\App\Http\Controllers\UserController::class, 'index']);
	Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'showById']);
	Route::post('/user/create-user', [\App\Http\Controllers\UserController::class, 'store']);

	// Patient routes
	Route::get('/patient', [\App\Http\Controllers\PatientController::class, 'index']);
	Route::get('/patient/{id}', [\App\Http\Controllers\PatientController::class, 'showById']);
	Route::post('/patient/create-patient', [\App\Http\Controllers\PatientController::class, 'store']);

	// Clinic history routes
	Route::get('/clinic-history', [\App\Http\Controllers\ClinicHistoryController::class, 'index']);
	Route::get('/clinic-history/{id}', [\App\Http\Controllers\ClinicHistoryController::class, 'showById']);
	Route::get('/clinic-history/patient/{patient_id}', [\App\Http\Controllers\ClinicHistoryController::class, 'showByPatientId']);
	Route::post('/clinic-history/create-clinic-history', [\App\Http\Controllers\ClinicHistoryController::class, 'store']);

	// Appointment routes
	Route::get('/appointment', [\App\Http\Controllers\AppointmentController::class, 'index']);
	Route::get('/appointment/{id}', [\App\Http\Controllers\AppointmentController::class, 'showById']);
	Route::get('/appointment/patient/{patient_id}', [\App\Http\Controllers\AppointmentController::class, 'showByPatientId']);
	Route::post('/appointment/create-appointment', [\App\Http\Controllers\AppointmentController::class, 'store']);

	// Logout route
	Route::post('/logout', [\App\Http\Controllers\Auth\LogoutController::class, 'logout']);
});

// Authentication: Login API
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'login']);

// Authentication: Logout API (protected)
Route::middleware('auth:sanctum')->post('/logout', [\App\Http\Controllers\Auth\LogoutController::class, 'logout']);