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
        Schema::create('clinic_history', function (Blueprint $table) {
            $table->id();
            $table->string('mother_history', 250);
            $table->string('father_history', 250);
            $table->string('brothers_history', 250);
            $table->string('sons_history', 250);
            $table->string('alergies', 250);
            $table->string('psychobiological_history', 250);
            $table->string('functional_test', 250);
            $table->string('physic_test', 250);
            $table->string('patient_id', 20);
            $table->string('users_id', 20);

            $table->unique(["patient_id"], 'patient_id_UNIQUE');

            $table->index(["patient_id"], 'fk_clinic_history_patient1_idx');

            $table->index(["users_id"], 'fk_clinic_history_users1_idx');


            $table->foreign('patient_id')
                ->references('id')->on('patient')
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
        Schema::dropIfExists('clinic_history');
    }
};
