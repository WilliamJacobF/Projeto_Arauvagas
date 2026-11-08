<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;

class Vagascontroller extends Controller
{
    public function index(){
        return Vaga::all();
    }
}