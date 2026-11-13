<?php

namespace App\Http\Controllers;

use App\Models\Vaga;
use Illuminate\Http\Request;

class Vagascontroller extends Controller
{
    public function index(){
        return Vaga::all();
    }
    public function store(Request $request){
        Vaga::create($request->all());
    }
    public function show($id){
        return Vaga::findOrFail($id);
    }
    public function update(Request $request, $id){
        $tarefa = Vaga::findOrFail($id);
        $tarefa->update($request->all());
    }
    public function destroy($id){
        $tarefa = Vaga::findOrFail($id);
        $tarefa->delete();
    }
}