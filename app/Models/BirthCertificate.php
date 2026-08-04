<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BirthCertificate extends Model
{
    use HasFactory;

    protected $table = 'birth_certificates';

    protected $fillable = [
        'province',
        'departement',
        'arrondissement',
        'centre_etat_civil',
        'numero_acte',
        'nom_enfant',
        'prenoms_enfant',
        'date_naissance',
        'heure_naissance',
        'lieu_naissance',
        'sexe',
        'nom_pere',
        'lieu_naissance_pere',
        'domicile_pere',
        'profession_pere',
        'nom_mere',
        'lieu_naissance_mere',
        'date_naissance_mere',
        'domicile_mere',
        'profession_mere',
        'date_dressage',
        'nom_declarant',
        'qualite_declarant',
        'nom_officier',
        'qualite_officier',
        'nom_secretaire',
        'mentions_marginales',
        'statut',
    ];

    protected $casts = [
        'date_naissance' => 'date:Y-m-d',
        'date_dressage' => 'date:Y-m-d',
    ];
}
