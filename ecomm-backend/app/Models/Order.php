<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;
    
    protected $table = 'orders';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'status',
        'fullname',
        'phoneNumber',
        'city',
        'address',
        'province',
        'total',
        'deliveryDestination',
        'deliveryCost',
        'sinfo',
        'date',
        'notes'
    ];

    public function items(): HasMany 
    {
        return $this->hasMany(OrderItem::class, "orderId");
    }
}