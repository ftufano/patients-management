<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class PatientController extends Controller
{
    //
    public function index()
    {
        $patients = Patient::all();

        if (request()->wantsJson()) {
            return response()->json($patients);
        }

        return Inertia::render('patients', [
            'patients' => $patients,
        ]);
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
        try {
            $patient = Patient::create($request->all());
            return response()->json(['message' => 'Patient Created Successfully!', 'patient' => $patient], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating patient', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
