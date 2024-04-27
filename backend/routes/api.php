<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\DateCheckController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show'])->middleware('auth:sanctum');
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('/user/leave-requests/{user_id}', [UserController::class, 'leaveRequests'])-> middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/leave-requests', [LeaveRequestController::class, 'store'])-> middleware('auth:sanctum');
Route::get('/leave-requests/{id}', [LeaveRequestController::class, 'show'])-> middleware('auth:sanctum');
Route::put('/leave-requests/{id}', [LeaveRequestController::class, 'update'])-> middleware('auth:sanctum');
Route::delete('/leave-requests/{id}', [LeaveRequestController::class, 'destroy'])-> middleware('auth:sanctum');
Route::get('/leave-requests', [LeaveRequestController::class, 'indexAll'])-> middleware('auth:sanctum');

Route::get('/search', [LeaveRequestController::class, 'search'])-> middleware('auth:sanctum');


Route::put('/status/{id}', [LeaveRequestController::class, 'updateStatus'])-> middleware('auth:sanctum');

Route::get('/check-date-overlap', [DateCheckController::class, 'checkDateOverlap']);

Route::middleware('auth:sanctum', 'api')->get('/user', function (Request $request) {
    return $request->user();
});
