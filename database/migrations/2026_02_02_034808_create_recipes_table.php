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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('cooking_time')->nullable(); // in minutes
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('easy');
            $table->json('ingredients'); // List of ingredients with quantities
            $table->json('instructions'); // Step-by-step guide
            $table->json('nutrition')->nullable(); // Optional calories, protein, etc.
            $table->boolean('is_favorite')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
