<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Exception;

class UserController extends Controller
{
    public function store(Request $request)
    {
        try{

            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
            ]);
        }catch (Exception $e) {
            Log::error("Validation error: " . $e->getMessage());
            return response()->json(['error' => 'Validation error'], 400);
        }

        try {
            // Assign first user with the role of admin
            $role = User::count() === 0 ? 'admin' : 'employee';

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'role' => $role,
            ]);

            if (!$user) {
                return response()->json(['error' => 'Failed to create user'], 500);
            }

            return response()->json($user, 201);
        } catch (QueryException $e) {
            Log::error("Database error: " . $e->getMessage());
            return response()->json(['error' => 'Database error'], 500);
        } catch (Exception $e) {
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function show($id)
    {
        try{
            $user = User::findOrFail($id);
            return response()->json($user, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (Exception $e) {
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function index(Request $request)
    {
        try {
            $users = User::all();
            return response()->json($users, 200);
        } catch (Exception $e) {
            // Handle errors
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
