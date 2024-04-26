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

    public function update(Request $request, $id)
    {
      


        $rules = [
            'type' => 'string',
            'start_date' => 'date',
            'end_date' => 'date',
            'reason' => 'string'
        ];

        try{
            $validatedData = $request->validate($rules);
        }catch (ValidationException $ve) {
            Log::error("Validation error: " . $ve->getMessage());
            return response()->json(['error' => 'Validation error'], 400);
        }

        try {
            $leaveRequest = LeaveRequest::findOrFail($id);

            if (array_key_exists('type', $validatedData)) {
                $leaveRequest->type = $validatedData['type'];
            }

            if (array_key_exists('start_date', $validatedData)) {
                $leaveRequest->start_date = $validatedData['start_date'];
            }

            if (array_key_exists('end_date', $validatedData)) {
                $leaveRequest->end_date = $validatedData['end_date'];
            }

            if (array_key_exists('reason', $validatedData)) {
                $leaveRequest->reason = $validatedData['reason'];
            }


            $leaveRequest->save();

            return response()->json($leaveRequest, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Leave request not found'], 404);
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

    public function updateStatus(Request $request, $id)
    {
        $isAdmin = $request->user()->role === 'admin';

        if (!$isAdmin) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $rules = [
            'status' => ['required', 'string', Rule::in(['pending', 'accepted', 'denied'])],
        ];

        try{
            $validatedData = $request->validate($rules);
        }catch (ValidationException $ve) {
            Log::error("Validation error: " . $ve->getMessage());
            return response()->json(['error' => 'Validation error'], 400);
        }

        try {
            $leaveRequest = LeaveRequest::findOrFail($id);
            $leaveRequest->status = $validatedData['status'];
            $leaveRequest->save();

            return response()->json($leaveRequest, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Leave request not found'], 404);
        } catch (Exception $e) {
            Log::error("General error: " . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function search(Request $request)
    {
        $isAdmin = $request->user()->role === 'admin';
        
        $request->validate([
            'query' => 'required|string',
        ]);
    
        $query = $request->get('query');
    
        $leaveRequestsQuery = LeaveRequest::query();
    
        if (!$isAdmin) {
            $leaveRequestsQuery->where('user_id', $request->user()->id);
        }
    
        $leaveRequestsQuery->where(function ($q) use ($query) {
            $q->where('type', 'LIKE', "%{$query}%")
              ->orWhere('reason', 'LIKE', "%{$query}%")
              ->orWhere('status', 'LIKE', "%{$query}%");
              
            // Only add user subquery if admin
            if ($isAdmin) {
                $q->orWhereHas('user', function ($q) use ($query) {
                    $q->where('name', 'LIKE', "%{$query}%")
                      ->orWhere('email', 'LIKE', "%{$query}%")
                      ->orWhere('reason', 'LIKE', "%{$query}%")
                      ->orWhere('status', 'LIKE', "%{$query}%");
                });
            }
        });
    
        $leaveRequests = $leaveRequestsQuery->get();
    
        return response()->json($leaveRequests);
    }
    



}
