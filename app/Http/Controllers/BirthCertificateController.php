<?php

namespace App\Http\Controllers;

use App\Models\BirthCertificate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BirthCertificateController extends Controller
{
    /**
     * Display homepage with real DB statistics and recent birth certificates.
     */
    public function index()
    {
        $recentActes = BirthCertificate::latest()->take(5)->get();
        $totalActes = BirthCertificate::count();

        return Inertia::render('Index', [
            'recentActes' => $recentActes,
            'totalActes' => $totalActes,
        ]);
    }

    /**
     * Display the full list of birth certificates from DB with pagination and search.
     */
    public function list(Request $request)
    {
        $query = BirthCertificate::latest();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('nom_enfant', 'like', "%{$search}%")
                  ->orWhere('prenoms_enfant', 'like', "%{$search}%")
                  ->orWhere('numero_acte', 'like', "%{$search}%")
                  ->orWhere('nom_pere', 'like', "%{$search}%")
                  ->orWhere('nom_mere', 'like', "%{$search}%");
            });
        }

        $actes = $query->paginate(10)->withQueryString();

        return Inertia::render('BirthCertificate/Index', [
            'actes' => $actes,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Display the creation form for a Cameroonian birth certificate.
     */
    public function create()
    {
        // Generate a default suggested acte number based on current year & count
        $nextNumber = BirthCertificate::count() + 1;
        $suggestedNumber = sprintf('%04d/N/%s', $nextNumber, date('Y'));

        return Inertia::render('BirthCertificate/Create', [
            'suggestedNumber' => $suggestedNumber,
        ]);
    }

    /**
     * Store a newly created birth certificate in database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'province' => 'nullable|string|max:255',
            'departement' => 'nullable|string|max:255',
            'arrondissement' => 'nullable|string|max:255',
            'centre_etat_civil' => 'required|string|max:255',
            'numero_acte' => 'required|string|max:255|unique:birth_certificates,numero_acte',

            'nom_enfant' => 'required|string|max:255',
            'prenoms_enfant' => 'nullable|string|max:255',
            'date_naissance' => 'required|date',
            'heure_naissance' => 'nullable|string|max:50',
            'lieu_naissance' => 'required|string|max:255',
            'sexe' => 'required|in:M,F',

            'nom_pere' => 'nullable|string|max:255',
            'lieu_naissance_pere' => 'nullable|string|max:255',
            'domicile_pere' => 'nullable|string|max:255',
            'profession_pere' => 'nullable|string|max:255',

            'nom_mere' => 'nullable|string|max:255',
            'lieu_naissance_mere' => 'nullable|string|max:255',
            'date_naissance_mere' => 'nullable|string|max:255',
            'domicile_mere' => 'nullable|string|max:255',
            'profession_mere' => 'nullable|string|max:255',

            'date_dressage' => 'required|date',
            'nom_declarant' => 'nullable|string|max:255',
            'qualite_declarant' => 'nullable|string|max:255',
            'nom_officier' => 'required|string|max:255',
            'qualite_officier' => 'nullable|string|max:255',
            'nom_secretaire' => 'nullable|string|max:255',
            'mentions_marginales' => 'nullable|string',
            'statut' => 'nullable|string|max:100',
        ], $this->validationMessages());

        $acte = BirthCertificate::create($validated);

        return redirect()->route('actes.naissance.index')->with('success', "L'acte de naissance N° {$acte->numero_acte} a été créé avec succès.");
    }

    /**
     * Display the form for editing an existing birth certificate.
     */
    public function edit($id)
    {
        $acte = BirthCertificate::findOrFail($id);

        return Inertia::render('BirthCertificate/Edit', [
            'acte' => $acte,
        ]);
    }

    /**
     * Update the specified birth certificate in database.
     */
    public function update(Request $request, $id)
    {
        $acte = BirthCertificate::findOrFail($id);

        $validated = $request->validate([
            'province' => 'nullable|string|max:255',
            'departement' => 'nullable|string|max:255',
            'arrondissement' => 'nullable|string|max:255',
            'centre_etat_civil' => 'required|string|max:255',
            'numero_acte' => 'required|string|max:255|unique:birth_certificates,numero_acte,' . $id,

            'nom_enfant' => 'required|string|max:255',
            'prenoms_enfant' => 'nullable|string|max:255',
            'date_naissance' => 'required|date',
            'heure_naissance' => 'nullable|string|max:50',
            'lieu_naissance' => 'required|string|max:255',
            'sexe' => 'required|in:M,F',

            'nom_pere' => 'nullable|string|max:255',
            'lieu_naissance_pere' => 'nullable|string|max:255',
            'domicile_pere' => 'nullable|string|max:255',
            'profession_pere' => 'nullable|string|max:255',

            'nom_mere' => 'nullable|string|max:255',
            'lieu_naissance_mere' => 'nullable|string|max:255',
            'date_naissance_mere' => 'nullable|string|max:255',
            'domicile_mere' => 'nullable|string|max:255',
            'profession_mere' => 'nullable|string|max:255',

            'date_dressage' => 'required|date',
            'nom_declarant' => 'nullable|string|max:255',
            'qualite_declarant' => 'nullable|string|max:255',
            'nom_officier' => 'required|string|max:255',
            'qualite_officier' => 'nullable|string|max:255',
            'nom_secretaire' => 'nullable|string|max:255',
            'mentions_marginales' => 'nullable|string',
            'statut' => 'nullable|string|max:100',
        ], $this->validationMessages());

        $acte->update($validated);

        return redirect()->route('actes.naissance.index')->with('success', "L'acte de naissance N° {$acte->numero_acte} a été mis à jour avec succès.");
    }

    /**
     * Remove the specified birth certificate from database.
     */
    public function destroy($id)
    {
        $acte = BirthCertificate::findOrFail($id);
        $numero = $acte->numero_acte;
        $acte->delete();

        return redirect()->route('actes.naissance.index')->with('success', "L'acte de naissance N° {$numero} a été supprimé avec succès.");
    }

    /**
     * Get custom validation messages in French.
     */
    protected function validationMessages()
    {
        return [
            'centre_etat_civil.required' => 'Le centre d\'état civil est obligatoire.',
            'numero_acte.required' => 'Le numéro d\'acte est obligatoire.',
            'numero_acte.unique' => 'Ce numéro d\'acte existe déjà dans le registre.',
            'nom_enfant.required' => 'Le nom de l\'enfant est obligatoire.',
            'date_naissance.required' => 'La date de naissance est obligatoire.',
            'date_naissance.date' => 'La date de naissance doit être une date valide.',
            'lieu_naissance.required' => 'Le lieu de naissance est obligatoire.',
            'sexe.required' => 'Veuillez sélectionner le sexe de l\'enfant.',
            'sexe.in' => 'Veuillez choisir un sexe valide (Masculin ou Féminin).',
            'date_dressage.required' => 'La date d\'établissement de l\'acte est obligatoire.',
            'date_dressage.date' => 'La date d\'établissement doit être une date valide.',
            'nom_officier.required' => 'Le nom de l\'officier d\'état civil est obligatoire.',
        ];
    }

    /**
     * Generate and force-download the official Cameroonian Birth Certificate PDF document.
     * Uses custom vertical registry paper dimensions matching the Cameroonian official model:
     * Width: 140mm (396.85 pt), Height: 297mm (841.89 pt)
     */
    public function downloadPdf(Request $request, $id)
    {
        $acte = BirthCertificate::findOrFail($id);

        $pdf = Pdf::loadView('pdf.birth_certificate', compact('acte'));
        
        // Custom vertical paper size matching the official registry format (140mm x 297mm)
        $cameroonPaperFormat = [0, 0, 396.85, 841.89];
        $pdf->setPaper($cameroonPaperFormat, 'portrait');

        $safeNumero = str_replace(['/', '\\'], '_', $acte->numero_acte);
        $filename = "acte_naissance_{$safeNumero}.pdf";

        // Force download of the PDF file
        return $pdf->download($filename);
    }
}
