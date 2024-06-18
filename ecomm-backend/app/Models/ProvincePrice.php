<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProvincePrice extends Model
{
    use HasFactory;

    protected $table = 'provinces_prices';
    protected $primaryKey = 'code';
    public $timestamps = false;

    protected $fillable = [
        'code',
        'name',
        'officeDeliveryPrice',
        'homeDeliveryPrice'
    ];
}