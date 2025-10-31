<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route to get all users
Route::get('/user', [\App\Http\Controllers\UserController::class, 'index']);

Route::get('/user/{id}', [\App\Http\Controllers\UserController::class, 'showById']);

Route::post('/user/create-user', [\App\Http\Controllers\UserController::class, 'store']);


// Route to get all patients
Route::get('/patient', [\App\Http\Controllers\PatientController::class, 'index']);

Route::get('/patient/{id}', [\App\Http\Controllers\PatientController::class, 'showById']);

Route::post('/patient/create-patient', [\App\Http\Controllers\PatientController::class, 'store']);


// Route to get all clinic histories
Route::get('/clinic-history', [\App\Http\Controllers\ClinicHistoryController::class, 'index']);

Route::get('/clinic-history/{id}', [\App\Http\Controllers\ClinicHistoryController::class, 'showById']);

Route::get('/clinic-history/patient/{patient_id}', [\App\Http\Controllers\ClinicHistoryController::class, 'showByPatientId']);

Route::post('/clinic-history/create-clinic-history', [\App\Http\Controllers\ClinicHistoryController::class, 'store']);


// Route to get all appointments
Route::get('/appointment', [\App\Http\Controllers\AppointmentController::class, 'index']);

Route::get('/appointment/{id}', [\App\Http\Controllers\AppointmentController::class, 'showById']);

Route::get('/appointment/patient/{patient_id}', [\App\Http\Controllers\AppointmentController::class, 'showByPatientId']);

Route::post('/appointment/create-appointment', [\App\Http\Controllers\AppointmentController::class, 'store']);