<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\ClinicHistory;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
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

    public function verifyPatient(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => ['required', 'string', 'max:20'],
        ]);

        $patient = Patient::query()
            ->select(['id', 'fullname'])
            ->find($validated['patient_id']);

        if (! $patient) {
            return response()->json([
                'exists' => false,
                'has_history' => false,
                'message' => 'Patient not found.',
            ], Response::HTTP_OK);
        }

        $clinicHistory = ClinicHistory::query()
            ->select(['id', 'patient_id'])
            ->where('patient_id', $patient->id)
            ->first();

        if (! $clinicHistory) {
            return response()->json([
                'exists' => true,
                'has_history' => false,
                'patient' => $patient,
                'message' => 'Patient does not have a clinic history yet.',
            ], Response::HTTP_OK);
        }

        return response()->json([
            'exists' => true,
            'has_history' => true,
            'patient' => $patient,
            'clinic_history_id' => (string) $clinicHistory->id,
            'message' => 'Patient is valid for appointment creation.',
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => ['nullable', 'string', 'exists:patient,id'],
            'date' => ['nullable', 'date'],
            'reason' => ['required', 'string', 'max:255'],
            'current_illness' => ['required', 'string', 'max:255'],
            'diagnosis' => ['required', 'string', 'max:255'],
            'discharge_date' => ['required', 'date'],
            'discharge_summary' => ['required', 'string', 'max:255'],
            'discharge_reason' => ['required', 'string', 'max:45'],
            'clinic_history_id' => ['required', 'integer', 'exists:clinic_history,id'],
        ]);

        if (! empty($validated['patient_id'])) {
            $belongsToPatient = ClinicHistory::query()
                ->where('id', $validated['clinic_history_id'])
                ->where('patient_id', $validated['patient_id'])
                ->exists();

            if (! $belongsToPatient) {
                $error = ['clinic_history_id' => 'Clinic history does not belong to the selected patient.'];

                if (! $request->wantsJson()) {
                    return back()->withInput()->withErrors($error);
                }

                return response()->json(['message' => $error['clinic_history_id']], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
        }

        $data = [
            'date' => $validated['date'] ?? now(),
            'reason' => $validated['reason'],
            'current_illness' => $validated['current_illness'],
            'diagnosis' => $validated['diagnosis'],
            'discharge date' => $validated['discharge_date'],
            'discharge_summary' => $validated['discharge_summary'],
            'discharge_reason' => $validated['discharge_reason'],
            'clinic_history_id' => $validated['clinic_history_id'],
            'users_id' => (string) Auth::id(),
        ];

        try {
            $appointment = Appointment::create($data);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Appointment Created Successfully!',
                    'appointment' => $appointment,
                ], Response::HTTP_CREATED);
            }

            return redirect()
                ->route('appointments')
                ->with('success', 'Appointment created successfully.');
        } catch (\Exception $e) {
            if (! $request->wantsJson()) {
                return back()
                    ->withInput()
                    ->withErrors(['appointment' => 'Error creating appointment.']);
            }

            return response()->json(['message' => 'Error creating appointment', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
