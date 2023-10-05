<?php

use App\Enums\StatusProductTransaction;
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
        Schema::create('product_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable()->references('id')->on('products')->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->references('id')->on('users')->cascadeOnDelete();
            $table->bigInteger('discount')->nullable();
            $table->bigInteger('quantity');
            $table->bigInteger('total_price');
            $table->string('status')->nullable()->default(StatusProductTransaction::UNPAID->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_transactions');
    }
};
