<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
        });
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('value');
            $table->string('category');
        });
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
        });
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->decimal('oldPrice');
            $table->decimal('newPrice');
            $table->boolean('showAsDiscount');
            $table->text('description');
        });
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->string('place');
            
            $table->unsignedBigInteger('productId');

            $table->foreign('productId')->references('id')->on('products');
        });
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('status');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email');
            $table->string('phoneNumber');
            $table->string('address');
            $table->string('province');
            $table->text('notes');
        });
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('productId');
            $table->float('quantity');
            $table->text('notes');
            
            $table->foreign('productId')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('users');    
    }
};