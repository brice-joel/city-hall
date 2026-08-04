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
        Schema::create('birth_certificates', function (Blueprint $table) {
            $table->id();

            // Structure Administrative Camerounaise
            $table->string('province')->nullable();
            $table->string('departement')->nullable();
            $table->string('arrondissement')->nullable();
            $table->string('centre_etat_civil');
            $table->string('numero_acte')->unique();

            // Informations sur l'Enfant (Child)
            $table->string('nom_enfant');
            $table->string('prenoms_enfant')->nullable();
            $table->date('date_naissance');
            $table->string('heure_naissance')->nullable();
            $table->string('lieu_naissance');
            $table->enum('sexe', ['M', 'F'])->default('M');

            // Informations sur le Père (Father)
            $table->string('nom_pere')->nullable();
            $table->string('lieu_naissance_pere')->nullable();
            $table->string('domicile_pere')->nullable();
            $table->string('profession_pere')->nullable();

            // Informations sur la Mère (Mother)
            $table->string('nom_mere')->nullable();
            $table->string('lieu_naissance_mere')->nullable();
            $table->string('date_naissance_mere')->nullable();
            $table->string('domicile_mere')->nullable();
            $table->string('profession_mere')->nullable();

            // Déclaration et Signataires (Declaration & Officials)
            $table->date('date_dressage');
            $table->string('nom_declarant')->nullable();
            $table->string('qualite_declarant')->nullable();
            $table->string('nom_officier');
            $table->string('qualite_officier')->nullable();
            $table->string('nom_secretaire')->nullable();
            $table->text('mentions_marginales')->nullable();
            $table->string('statut')->default('Validé');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('birth_certificates');
    }
};
