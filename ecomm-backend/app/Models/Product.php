<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\ProductImage;
use App\Models\Category;
use App\Models\OrderItem;

class Product extends Model
{
    use HasFactory;
    
    protected $table = 'products';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'oldPrice',
        'newPrice',
        'showAsDiscount',
        'showQuantityInStock',
        'quantityInStock',
        'image',
        'description',
        'categoryId',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categoryId');
    }

    public function images(): HasMany 
    {
        return $this->hasMany(ProductImage::class, "productId");
    }

    public function orderItems(): HasMany 
    {
        return $this->hasMany(OrderItem::class, "productId");
    }
}