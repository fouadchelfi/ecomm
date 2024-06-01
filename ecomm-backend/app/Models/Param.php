<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Param extends Model
{
    use HasFactory;
    
    protected $table = 'settings';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'key',
        'value',
        'category',
    ];
}
