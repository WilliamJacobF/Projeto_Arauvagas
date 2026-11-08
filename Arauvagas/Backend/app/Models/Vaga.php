<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    protected $fillable = [
        'titulo',
        'empresa',
        'descricao',
        'localizacao',
        'salario'
    ];
}