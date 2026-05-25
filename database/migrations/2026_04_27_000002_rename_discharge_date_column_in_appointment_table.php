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
        if (Schema::hasColumn('appointment', 'discharge date') && ! Schema::hasColumn('appointment', 'discharge_date')) {
            Schema::table('appointment', function (Blueprint $table) {
                $table->renameColumn('discharge date', 'discharge_date');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('appointment', 'discharge_date') && ! Schema::hasColumn('appointment', 'discharge date')) {
            Schema::table('appointment', function (Blueprint $table) {
                $table->renameColumn('discharge_date', 'discharge date');
            });
        }
    }
};
