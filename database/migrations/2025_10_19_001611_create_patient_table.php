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
        Schema::create('patient', function (Blueprint $table) {
            $table->string('id', 20)->primary();
            $table->string('fullname', 100);
            $table->string('email',100)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('phone', 15);
            $table->integer('age');
            $table->string('gender', 45);
            $table->date('birthdate');
            $table->string('birthplace', 250);
            $table->string('address', 250);
            $table->string('users_id', 20);

            $table->unique(["email"], 'email_UNIQUE');

            $table->index(["users_id"], 'fk_patient_users1_idx');


            $table->foreign('users_id')
                ->references('id')->on('users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient');
    }
};
