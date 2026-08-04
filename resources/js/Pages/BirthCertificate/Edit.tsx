import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import CameroonBirthCertificateDocument from '../../Components/CameroonBirthCertificateDocument';
import { 
    Baby, 
    Save, 
    ArrowLeft, 
    User, 
    Users, 
    Sparkles,
    Building2,
    Pencil
} from 'lucide-react';
import { BirthCertificate } from '../../types';

interface EditProps {
    acte: BirthCertificate;
}

const NAME_FIELDS = [
    "nom_enfant",
    "prenoms_enfant",
    "nom_pere",
    "nom_mere",
    "nom_declarant",
    "nom_officier",
    "nom_secretaire",
];

const validateNameField = (value: string | undefined | null): string | null => {
    if (!value) return null;
    const trimmed = value.trim();
    if (!trimmed) return null;

    if (/^\d/.test(trimmed)) {
        return "Le nom/prénom ne peut pas commencer par un chiffre ni contenir uniquement des chiffres.";
    }
    return null;
};

export default function BirthCertificateEdit({ acte }: EditProps) {
    const [frontendErrors, setFrontendErrors] = useState<Record<string, string>>({});

    const { data, setData, put, processing, errors } = useForm<BirthCertificate>({
        id: acte.id,
        province: acte.province || 'CENTRE',
        departement: acte.departement || 'MFOUNDI',
        arrondissement: acte.arrondissement || 'YAOUNDÉ 1er',
        centre_etat_civil: acte.centre_etat_civil || 'CENTRE D\'ÉTAT CIVIL DE YAOUNDÉ 1er',
        numero_acte: acte.numero_acte || '',

        nom_enfant: acte.nom_enfant || '',
        prenoms_enfant: acte.prenoms_enfant || '',
        date_naissance: acte.date_naissance || '',
        heure_naissance: acte.heure_naissance || '',
        lieu_naissance: acte.lieu_naissance || '',
        sexe: acte.sexe || 'M',

        nom_pere: acte.nom_pere || '',
        lieu_naissance_pere: acte.lieu_naissance_pere || '',
        domicile_pere: acte.domicile_pere || '',
        profession_pere: acte.profession_pere || '',

        nom_mere: acte.nom_mere || '',
        lieu_naissance_mere: acte.lieu_naissance_mere || '',
        date_naissance_mere: acte.date_naissance_mere || '',
        domicile_mere: acte.domicile_mere || '',
        profession_mere: acte.profession_mere || '',

        date_dressage: acte.date_dressage || '',
        nom_declarant: acte.nom_declarant || '',
        qualite_declarant: acte.qualite_declarant || '',
        nom_officier: acte.nom_officier || '',
        qualite_officier: acte.qualite_officier || '',
        nom_secretaire: acte.nom_secretaire || '',
        mentions_marginales: acte.mentions_marginales || 'Néant',
        statut: acte.statut || 'Validé'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof BirthCertificate, value);

        if (NAME_FIELDS.includes(name)) {
            const error = validateNameField(value);
            setFrontendErrors((prev) => {
                const next = { ...prev };
                if (error) {
                    next[name] = error;
                } else {
                    delete next[name];
                }
                return next;
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};
        NAME_FIELDS.forEach((field) => {
            const fieldValue = data[field as keyof BirthCertificate] as string | undefined;
            const error = validateNameField(fieldValue);
            if (error) {
                newErrors[field] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setFrontendErrors(newErrors);
            return;
        }

        put(`/actes/naissance/${acte.id}`);
    };

    return (
        <AppLayout
            title={`Modifier l'Acte N° ${acte.numero_acte}`}
            subtitle="Modification d'un acte de naissance dans le registre municipal"
        >
            <Head title={`Édition Acte N° ${acte.numero_acte} - Création des actes SWN`} />

            <div className="space-y-6">
                {/* Back button */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/actes/naissance"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour au registre des actes</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Form Column */}
                    <div className="lg:col-span-7 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Section 1: En-tête Administratif Camerounais */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-bold text-sm">
                                    <Building2 className="w-4 h-4 text-teal-600" />
                                    <span>1. Structure Administrative Camerounaise</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Province / Région</label>
                                        <input
                                            type="text"
                                            name="province"
                                            value={data.province || ''}
                                            onChange={handleChange}
                                            placeholder="ex: CENTRE"
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Département</label>
                                        <input
                                            type="text"
                                            name="departement"
                                            value={data.departement || ''}
                                            onChange={handleChange}
                                            placeholder="ex: MFOUNDI"
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Arrondissement</label>
                                        <input
                                            type="text"
                                            name="arrondissement"
                                            value={data.arrondissement || ''}
                                            onChange={handleChange}
                                            placeholder="ex: YAOUNDÉ 1er"
                                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Centre d'État Civil *</label>
                                        <input
                                            type="text"
                                            name="centre_etat_civil"
                                            value={data.centre_etat_civil}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 font-semibold"
                                        />
                                        {errors.centre_etat_civil && <p className="text-[11px] text-red-500 mt-0.5">{errors.centre_etat_civil}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">N° Acte de Naissance *</label>
                                        <input
                                            type="text"
                                            name="numero_acte"
                                            value={data.numero_acte}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono font-bold text-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        />
                                        {errors.numero_acte && <p className="text-[11px] text-red-500 mt-0.5">{errors.numero_acte}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Enfant */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-bold text-sm">
                                    <Baby className="w-4 h-4 text-teal-600" />
                                    <span>2. État Civil du Nouveau-né (Child)</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de l'enfant *</label>
                                        <input
                                            type="text"
                                            name="nom_enfant"
                                            value={data.nom_enfant}
                                            onChange={handleChange}
                                            placeholder="ex: KOUAM"
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 uppercase focus:outline-none focus:ring-1 focus:ring-teal-500 font-bold"
                                        />
                                        {(frontendErrors.nom_enfant || errors.nom_enfant) && (
                                            <p className="text-[11px] text-red-500 mt-0.5">
                                                {frontendErrors.nom_enfant || errors.nom_enfant}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Prénoms de l'enfant</label>
                                        <input
                                            type="text"
                                            name="prenoms_enfant"
                                            value={data.prenoms_enfant || ''}
                                            onChange={handleChange}
                                            placeholder="ex: Paul Emmanuel"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        />
                                        {(frontendErrors.prenoms_enfant || errors.prenoms_enfant) && (
                                            <p className="text-[11px] text-red-500 mt-0.5">
                                                {frontendErrors.prenoms_enfant || errors.prenoms_enfant}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Sexe (Sex)</label>
                                        <select
                                            name="sexe"
                                            value={data.sexe}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white font-semibold"
                                        >
                                            <option value="">-- Sélectionner le sexe --</option>
                                            <option value="M">Masculin / Male</option>
                                            <option value="F">Féminin / Female</option>
                                        </select>
                                        {errors.sexe && <p className="text-[11px] text-red-500 mt-0.5">{errors.sexe}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Le (On the) - Date *</label>
                                        <input
                                            type="date"
                                            name="date_naissance"
                                            value={data.date_naissance}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 font-semibold"
                                        />
                                        {errors.date_naissance && <p className="text-[11px] text-red-500 mt-0.5">{errors.date_naissance}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Heure de Naissance</label>
                                        <input
                                            type="text"
                                            name="heure_naissance"
                                            value={data.heure_naissance || ''}
                                            onChange={handleChange}
                                            placeholder="ex: 08 heures 30 min"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                        />
                                        {errors.heure_naissance && <p className="text-[11px] text-red-500 mt-0.5">{errors.heure_naissance}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Est né à (Was born at) *</label>
                                    <input
                                        type="text"
                                        name="lieu_naissance"
                                        value={data.lieu_naissance}
                                        onChange={handleChange}
                                        placeholder="ex: Maternité Centrale de Yaoundé"
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium"
                                    />
                                    {errors.lieu_naissance && <p className="text-[11px] text-red-500 mt-0.5">{errors.lieu_naissance}</p>}
                                </div>
                            </div>

                            {/* Section 3: Père & Mère */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-bold text-sm">
                                    <Users className="w-4 h-4 text-teal-600" />
                                    <span>3. Filiation (Father & Mother)</span>
                                </div>

                                {/* Father */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                                    <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">De / Of (Père)</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Nom et Prénom du père</label>
                                            <input
                                                type="text"
                                                name="nom_pere"
                                                value={data.nom_pere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: KOUAM Alain"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                                            />
                                            {(frontendErrors.nom_pere || errors.nom_pere) && (
                                                <p className="text-[11px] text-red-500 mt-0.5">
                                                    {frontendErrors.nom_pere || errors.nom_pere}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Né à (Born at)</label>
                                            <input
                                                type="text"
                                                name="lieu_naissance_pere"
                                                value={data.lieu_naissance_pere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: Douala"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Domicilié à (Resident at)</label>
                                            <input
                                                type="text"
                                                name="domicile_pere"
                                                value={data.domicile_pere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: Yaoundé 1er"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Profession (Occupation)</label>
                                            <input
                                                type="text"
                                                name="profession_pere"
                                                value={data.profession_pere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: Enseignant"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mother */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-3">
                                    <p className="text-xs font-bold text-teal-800 uppercase tracking-wider">Et de / And of (Mère)</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Nom et Prénom de la mère</label>
                                            <input
                                                type="text"
                                                name="nom_mere"
                                                value={data.nom_mere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: MBALLA Chantal"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                                            />
                                            {(frontendErrors.nom_mere || errors.nom_mere) && (
                                                <p className="text-[11px] text-red-500 mt-0.5">
                                                    {frontendErrors.nom_mere || errors.nom_mere}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Née à (Born at)</label>
                                            <input
                                                type="text"
                                                name="lieu_naissance_mere"
                                                value={data.lieu_naissance_mere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: Bafoussam"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Le (On the) - Date de naissance</label>
                                            <input
                                                type="text"
                                                name="date_naissance_mere"
                                                value={data.date_naissance_mere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: 15/04/1995"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Domiciliée à (Resident at)</label>
                                            <input
                                                type="text"
                                                name="domicile_mere"
                                                value={data.domicile_mere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: Yaoundé"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] text-slate-600 font-medium mb-0.5">Profession (Occupation)</label>
                                            <input
                                                type="text"
                                                name="profession_mere"
                                                value={data.profession_mere || ''}
                                                onChange={handleChange}
                                                placeholder="ex: Commerçante"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Déclaration & Signataires */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-slate-900 font-bold text-sm">
                                    <User className="w-4 h-4 text-teal-600" />
                                    <span>4. Déclaration & Signataires (Declaration & Officials)</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Dressé le (Drawn up on) *</label>
                                        <input
                                            type="date"
                                            name="date_dressage"
                                            value={data.date_dressage}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                                        />
                                        {errors.date_dressage && <p className="text-[11px] text-red-500 mt-0.5">{errors.date_dressage}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Sur la déclaration de</label>
                                        <input
                                            type="text"
                                            name="nom_declarant"
                                            value={data.nom_declarant || ''}
                                            onChange={handleChange}
                                            placeholder="ex: KOUAM Alain"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium"
                                        />
                                        {(frontendErrors.nom_declarant || errors.nom_declarant) && (
                                            <p className="text-[11px] text-red-500 mt-0.5">
                                                {frontendErrors.nom_declarant || errors.nom_declarant}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Qualité du déclarant</label>
                                        <input
                                            type="text"
                                            name="qualite_declarant"
                                            value={data.qualite_declarant || ''}
                                            onChange={handleChange}
                                            placeholder="ex: Père de l'enfant"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Officier d'État Civil (By us) *</label>
                                        <input
                                            type="text"
                                            name="nom_officier"
                                            value={data.nom_officier}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold"
                                        />
                                        {(frontendErrors.nom_officier || errors.nom_officier) && (
                                            <p className="text-[11px] text-red-500 mt-0.5">
                                                {frontendErrors.nom_officier || errors.nom_officier}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Assisté de (Secrétaire)</label>
                                        <input
                                            type="text"
                                            name="nom_secretaire"
                                            value={data.nom_secretaire || ''}
                                            onChange={handleChange}
                                            placeholder="ex: Secrétaire d'État Civil"
                                            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                                        />
                                        {(frontendErrors.nom_secretaire || errors.nom_secretaire) && (
                                            <p className="text-[11px] text-red-500 mt-0.5">
                                                {frontendErrors.nom_secretaire || errors.nom_secretaire}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Controls */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <Link
                                    href="/actes/naissance"
                                    className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
                                >
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-600/25 transition-all hover:scale-[1.01]"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{processing ? 'Mise à jour...' : 'Mettre à jour l\'Acte'}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Live Cameroonian Official Document Preview Column */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="sticky top-20 bg-slate-100 rounded-3xl p-4 border border-slate-300 shadow-xl space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                                    <Sparkles className="w-4 h-4 text-teal-600" />
                                    <span>Aperçu du Modèle Modifié</span>
                                </div>
                                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
                                    Format Bilingue (FR / EN)
                                </span>
                            </div>

                            {/* Live Rendering of Cameroonian Document */}
                            <div className="transform scale-95 origin-top">
                                <CameroonBirthCertificateDocument acte={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
