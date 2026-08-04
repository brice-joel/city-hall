<?php

use App\Http\Controllers\BirthCertificateController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page principale (Accueil & Présentation des modules GED Municipaux)
Route::get('/', [BirthCertificateController::class, 'index'])->name('home');

// Module Actes de Naissance (Base de données & PDF)
Route::prefix('actes/naissance')->group(function () {
    Route::get('/', [BirthCertificateController::class, 'list'])->name('actes.naissance.index');
    Route::get('/creer', [BirthCertificateController::class, 'create'])->name('actes.naissance.create');
    Route::post('/store', [BirthCertificateController::class, 'store'])->name('actes.naissance.store');
    Route::get('/{id}/editer', [BirthCertificateController::class, 'edit'])->name('actes.naissance.edit');
    Route::put('/{id}', [BirthCertificateController::class, 'update'])->name('actes.naissance.update');
    Route::delete('/{id}', [BirthCertificateController::class, 'destroy'])->name('actes.naissance.destroy');
    Route::get('/{id}/pdf', [BirthCertificateController::class, 'downloadPdf'])->name('actes.naissance.pdf');
});

// Espace authentifié (Conservé pour l'intégration future)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
