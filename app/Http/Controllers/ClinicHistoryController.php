<?php

namespace App\Http\Controllers;

use App\Models\ClinicHistory;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClinicHistoryController extends Controller
{
    public function index()
    {
        $clinicHistories = ClinicHistory::all();

        if (request()->wantsJson()) {
            return response()->json($clinicHistories);
        }

        return Inertia::render('histories/dashboard', [
            'clinicHistories' => $clinicHistories,
        ]);
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

        $hasHistory = ClinicHistory::where('patient_id', $patient->id)->exists();

        return response()->json([
            'exists' => true,
            'has_history' => $hasHistory,
            'patient' => $patient,
            'message' => $hasHistory
                ? 'Patient already has a clinic history.'
                : 'Patient is valid for history creation.',
        ], Response::HTTP_OK);
    }

    public function showById($id)
    {
        try {
            $clinicHistory = ClinicHistory::findOrFail($id);
            return response()->json($clinicHistory, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Clinic History not found', 'error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function showByPatientId($patient_id)
    {
        try {
            $patient = Patient::findOrFail($patient_id);
            $clinicHistory = ClinicHistory::where('patient_id', $patient_id)->first();

            $orqHistoryByPatient = [
                'patient' => $patient,
                'clinic_history' => $clinicHistory,
            ];

            return response()->json($orqHistoryByPatient, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Clinic Histories not found for the given patient ID', 'error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mother_history' => ['required', 'string', 'max:250'],
            'father_history' => ['required', 'string', 'max:250'],
            'brothers_history' => ['required', 'string', 'max:250'],
            'sons_history' => ['required', 'string', 'max:250'],
            'alergies' => ['required', 'string', 'max:250'],
            'psychobiological_history' => ['required', 'string', 'max:250'],
            'functional_test' => ['required', 'string', 'max:250'],
            'physic_test' => ['required', 'string', 'max:250'],
            'patient_id' => ['required', 'string', 'exists:patient,id', 'unique:clinic_history,patient_id'],
        ]);

        $validated['users_id'] = (string) Auth::id();

        try {
            $clinicHistory = ClinicHistory::create($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Clinic History Created Successfully!',
                    'clinicHistory' => $clinicHistory,
                ], Response::HTTP_CREATED);
            }

            return redirect()
                ->route('histories')
                ->with('success', 'Clinic history created successfully.');
        } catch (\Exception $e) {
            if (! $request->wantsJson()) {
                return back()
                    ->withInput()
                    ->withErrors(['clinicHistory' => 'Error creating clinic history.']);
            }

            return response()->json(['message' => 'Error creating clinic history', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
