<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    use HasFactory;

    // table name as defined in migration
    protected $table = 'patient';

    protected $fillable = [
        'id',
        'fullname',
        'email',
        'email_verified_at',
        'phone',
        'age',
        'gender',
        'birthdate',
        'birthplace',
        'address',
        'users_id',
    ];

    protected $casts = [
        'id' => 'string',
        'email_verified_at' => 'datetime',
        'birthdate' => 'date',
        'age' => 'integer',
    ];

    /**
     * Patient belongs to a user (owner/creator)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    /**
     * Each patient has one clinic history (migration sets unique patient_id)
     */
    public function clinicHistory()
    {
        return $this->hasOne(ClinicHistory::class, 'patient_id');
    }

    /**
     * Appointments through clinic history.
     */
    public function appointments()
    {
        return $this->hasManyThrough(
            Appointment::class,
            ClinicHistory::class,
            'patient_id', // Foreign key on ClinicHistory table...
            'clinic_history_id', // Foreign key on Appointment table...
            'id', // Local key on Patient
            'id'  // Local key on ClinicHistory
        );
    }
}
