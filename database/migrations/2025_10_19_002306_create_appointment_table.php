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
        Schema::create('appointment', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date');
            $table->string('reason');
            $table->string('current_illness');
            $table->string('diagnosis');
            $table->date('discharge_date');
            $table->string('discharge_summary');
            $table->string('discharge_reason', 45);
            $table->unsignedBigInteger('clinic_history_id');
            $table->string('users_id', 20);

            $table->index(["clinic_history_id"], 'fk_appointment_clinic_history1_idx');

            $table->index(["users_id"], 'fk_appointment_users1_idx');


            $table->foreign('clinic_history_id')
                ->references('id')->on('clinic_history')
                ->onDelete('no action')
                ->onUpdate('no action');

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
        Schema::dropIfExists('appointment');
    }
};
