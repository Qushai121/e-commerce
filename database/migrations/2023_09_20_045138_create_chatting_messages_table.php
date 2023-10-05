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
        Schema::create('chatting_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chatting_room_id')->nullable()->references('id')->on('chatting_rooms')->cascadeOnDelete();
            $table->foreignId('message_from_id')->nullable()->references('id')->on('users')->cascadeOnDelete();
            $table->longText('message');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatting_messages');
    }
};
