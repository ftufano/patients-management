<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClinicHistory extends Model
{
    use HasFactory;

    protected $table = 'clinic_history';

    protected $fillable = [
        'mother_history',
        'father_history',
        'brothers_history',
        'sons_history',
        'alergies',
        'psychobiological_history',
        'functional_test',
        'physic_test',
        'users_id',
        'patient_id',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'clinic_history_id');
    }
}
