<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class OrderItem extends Model
{
    use HasFactory;
    
    protected $table = 'order_items';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'productId',
        'quantity',
        'salePrice',
        'amount',
        'orderId',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'orderId');
    }
 
    public function product()
    {
        return $this->belongsTo(Product::class, 'productId');
    }
}