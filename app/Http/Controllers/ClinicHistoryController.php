<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\ClinicHistory;
use App\Models\Patient;

class ClinicHistoryController extends Controller
{
    //
    public function index() 
    {
        $clinicHistories = ClinicHistory::all();
        
        if (request()->wantsJson()) {
            return response()->json($clinicHistories);
        }

        return response()->view('apifront', compact('clinicHistories'));
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
        try {
            $clinicHistory = ClinicHistory::create($request->all());
            return response()->json(['message' => 'Clinic History Created Successfully!', 'clinicHistory' => $clinicHistory], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating clinic history', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }   

}
