<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::all();

        if (request()->wantsJson()) {
            return response()->json($patients);
        }

        return Inertia::render('patients/dashboard', [
            'patients' => $patients,
        ]);
    }

    public function create()
    {
        return Inertia::render('patients/create');
    }

    public function showById($id)
    {
        try {
            $patient = Patient::findOrFail($id);
            return response()->json($patient, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Patient not found', 'error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'string', 'max:20', 'unique:patient,id'],
            'fullname' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:100', 'unique:patient,email'],
            'phone' => ['required', 'string', 'max:15'],
            'age' => ['required', 'integer', 'min:0', 'max:150'],
            'gender' => ['required', 'string', 'max:45'],
            'birthdate' => ['required', 'date'],
            'birthplace' => ['required', 'string', 'max:250'],
            'address' => ['required', 'string', 'max:250'],
        ]);

        $validated['users_id'] = (string) Auth::id();

        try {
            $patient = Patient::create($validated);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Patient Created Successfully!',
                    'patient' => $patient,
                ], Response::HTTP_CREATED);
            }

            return redirect()
                ->route('patients')
                ->with('success', 'Patient created successfully.');
        } catch (\Exception $e) {
            if (! $request->wantsJson()) {
                return back()
                    ->withInput()
                    ->withErrors(['patient' => 'Error creating patient.']);
            }

            return response()->json(['message' => 'Error creating patient', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
