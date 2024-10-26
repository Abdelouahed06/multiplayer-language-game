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
        Schema::create('players', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->primary();
            $table->string('name', 30);
            $table->enum('gender', ['male', 'female']);
            $table->string('email', 40)->unique();
            $table->string('password', 60);
            $table->string('country', 15);
            $table->unsignedBigInteger('avatar_id')->nullable();
            $table->unsignedBigInteger('nlang_id');
            $table->unsignedBigInteger('glang_id');
            $table->string('level', 2)->default('A1');
            $table->decimal('points', 6, 2)->default(0);
            $table->integer('wins')->unsigned()->default(0);
            $table->integer('losses')->unsigned()->default(0);
            $table->integer('coins')->unsigned()->default(500);
            $table->boolean('state')->default(false);
            $table->foreign('avatar_id')->references('id')->on('avatars');
            $table->foreign('nlang_id')->references('id')->on('languages')->onDelete('cascade');
            $table->foreign('glang_id')->references('id')->on('languages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
