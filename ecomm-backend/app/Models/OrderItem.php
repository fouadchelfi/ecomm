<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    
    protected $table = 'order_items';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'productId',
        'quantity',
        'notes',
    ];
}