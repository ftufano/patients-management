<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch all users from the database
        $users = User::all();

        // Check if the request expects JSON (API)
        if (request()->wantsJson()) {
            return response()->json($users);
        }

    // Otherwise, return the apiexample Blade view for web requests
    return response()->view('apifront', compact('users'));
    }

    public function showById($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found', 'error' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(Request $request) {
        try {
            $user = User::create($request->all());
            return response()->json(['message' => 'Usuario Creado Exitosamente!', 'user' => $user], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating user', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}