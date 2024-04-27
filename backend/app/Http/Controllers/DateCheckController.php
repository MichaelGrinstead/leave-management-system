<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\LeaveRequest;
use Carbon\Carbon;

class DateCheckController extends Controller
{
    public function checkDateOverlap(Request $request)
{
    log::info("Checking for date overlap");
    log::info($request->all());
    $start_date = Carbon::parse($request->query('startDate'));
    $end_date = Carbon::parse($request->query('endDate'));

    log::info("Start date: " . $start_date);
    log::info("End date: " . $end_date);

    if ($start_date >= $end_date) {
        return response()->json(['error' => 'Start date must be before end date'], 400);
    }

    // Query to check for overlapping leave requests across all users
    $overlapExists = LeaveRequest::where(function ($query) use ($start_date, $end_date) {
            // Check if existing start or end date is within the new leave request range
            $query->where(function ($subQuery) use ($start_date, $end_date) {
                log::info("Checking if existing start or end date is within the new leave request range");
                $subQuery->whereBetween('start_date', [$start_date, $end_date])
                         ->orWhereBetween('end_date', [$start_date, $end_date]);
            })
            // Check if the new leave request spans over an existing leave request range
            ->orWhere(function ($subQuery) use ($start_date, $end_date) {
                $subQuery->where('start_date', '<', $start_date)
                         ->where('end_date', '>', $end_date);
            });
        })
        ->exists();

        log::info("Overlap exists: " . $overlapExists);
    // Return response indicating if any overlap exists
    return response()->json(['overlap' => $overlapExists]);
}

    
}