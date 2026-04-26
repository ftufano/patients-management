<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\ClinicHistory;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::all();

        if (request()->wantsJson()) {
            return response()->json($appointments);
        }

        return Inertia::render('appointments', [
            'appointments' => $appointments,
        ]);
    }

    public function showById($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            return response()->json($appointment, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Appointment not found', 'error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function showByPatientId($patient_id)
    {
        try {
            $patient = Patient::findOrFail($patient_id);
            $clinicHistory = ClinicHistory::where('patient_id', $patient_id)->first();
            $appointments = Appointment::where('clinic_history_id', $clinicHistory->id)->get();

            $orqAppointmentsByPatient = [
                'patient' => $patient,
                'clinic_history' => $clinicHistory,
                'appointments' => $appointments,
            ];

            return response()->json($orqAppointmentsByPatient, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Appointments not found for the given patient ID', 'error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(Request $request)
    {
        try {

            $data = $request->all();
            $data['date'] = now();

            $appointment = Appointment::create($data);
            return response()->json(['message' => 'Appointment Created Successfully!', 'appointment' => $appointment], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating appointment', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
