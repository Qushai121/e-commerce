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
        Schema::create('special_accesss', function (Blueprint $table) {
            $table->id();
            $table->string('special_access');
            $table->string('permission');
            $table->bigInteger('price')->nullable();
            $table->date('duration')->nullable();
            $table->bigInteger('stock');
            $table->longText('description');
            $table->longText('image');
            $table->timestamps();
        });

        Schema::table('roles',function (Blueprint $table) {
            $table->foreignId('special_access_id')->nullable()->references('id')->on('special_accesss')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('special_access');
    }
};
