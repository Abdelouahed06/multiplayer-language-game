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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('group', 30)->unique();
            $table->string('msg1', 60);
            $table->string('msg2', 60);
            $table->string('msg3', 60);
            $table->string('msg4', 60);
            $table->string('msg5', 60);
            $table->string('msg6', 60);
            $table->string('msg7', 60);
            $table->string('msg8', 60);
            $table->integer('price')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
