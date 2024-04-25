<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveRequestController;

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
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/users', [UserController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/leave-requests', [LeaveRequestController::class, 'store'])-> middleware('auth:sanctum');
Route::get('/leave-requests/{id}', [LeaveRequestController::class, 'show'])-> middleware('auth:sanctum');
Route::get('/leave-requests/user/{user_id}', [LeaveRequestController::class, 'indexUser'])-> middleware('auth:sanctum');
Route::get('/leave-requests', [LeaveRequestController::class, 'index'])-> middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
