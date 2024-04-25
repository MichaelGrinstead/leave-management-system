<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
use App\Models\LeaveRequest;
use Carbon\Carbon;

class LeaveRequestController extends Controller
{
    public function store(Request $request)
    {
        log::info("Leave request store");
        log::info($request);
        $isAdmin = $request->user()->role === 'admin';

        $rules = [
            'type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'reason' => 'required|string',
        ];

        if ($isAdmin) {
            $rules['user_id'] = ['required', 'integer', Rule::exists('users', 'id')];
        }


        try{
            log::info("Leave request store try block");
            $validatedData = $request->validate($rules);

            $formattedStartDate = Carbon::parse($validatedData['start_date']);
            $formattedEndDate = Carbon::parse($validatedData['end_date']);

           

        }catch (ValidationException $ve) {
            Log::error("Validation error: " . $ve->getMessage());
            return response()->json(['error' => 'Validation error'], 400);
        }

        $userId = $isAdmin ? $validatedData['user_id'] : $request->user()->id;

        try {
            $leaveRequest = LeaveRequest::create([
                'user_id' => $userId,
                'start_date' => $formattedStartDate,
                'end_date' => $formattedEndDate,
                'type' => $validatedData['type'],
                'reason' => $validatedData['reason'],
                'status' => 'pending',
            ]);

            if (!$leaveRequest) {
                log::error("Failed to create leave request");
                return response()->json(['error' => 'Failed to create leave request'], 500);
            }
                log::info(response()->json($leaveRequest, 201));
            return response()->json($leaveRequest, 201);
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
            $leaveRequest = LeaveRequest::findOrFail($id);
            return response()->json($leaveRequest, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Leave request not found'], 404);
        } catch (Exception $e) {
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function indexUser($user_id)
    {
        try{
            $leaveRequests = LeaveRequest::where('user_id', $user_id)->get();
            return response()->json($leaveRequests, 200);
        } catch (Exception $e) {
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function indexAll(Request $request)
    {
        try{
            $leaveRequests = LeaveRequest::all();
            return response()->json($leaveRequests, 200);
        } catch (Exception $e) {
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
