<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;

    protected $table = 'appointment';

    protected $fillable = [
        'date',
        'reason',
        'current_illness',
        'diagnosis',
        'discharge date',
        'discharge_summary',
        'discharge_reason',
        'clinic_history_id',
        'users_id', // Added users_id
    ];

    protected $casts = [
        'date' => 'datetime',
    ];

    public function clinicHistory()
    {
        return $this->belongsTo(ClinicHistory::class, 'clinic_history_id');
    }

    public function user() // Added user relationship
    {
        return $this->belongsTo(User::class, 'users_id');
    }
}