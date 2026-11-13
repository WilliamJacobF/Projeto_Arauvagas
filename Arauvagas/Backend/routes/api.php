<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Vagascontroller;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/vagas',[Vagascontroller::class, 'index']);
Route::post('/vagas', [Vagascontroller::class, 'store']);
Route::get('/vagas/{vagas}', [Vagascontroller::class, 'show']);
Route::put('/vagas/{vagas}', [Vagascontroller::class, 'update']);
Route::delete('/vagas/{vagas}', [Vagascontroller::class, 'destroy']);