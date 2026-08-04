import React, { useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";
import CameroonBirthCertificateDocument from "../../Components/CameroonBirthCertificateDocument";
import DeleteBirthCertificateModal from "../../Components/shared/modals/DeleteBirthCertificateModal";
import {
    Baby,
    PlusCircle,
    Search,
    Eye,
    X,
    FileSpreadsheet,
    Download,
    Pencil,
    Trash2,
} from "lucide-react";
import { BirthCertificate, PaginatedData, PageProps } from "../../types";

interface BirthCertificateIndexProps {
    actes?: PaginatedData<BirthCertificate> | BirthCertificate[];
    filters?: {
        search?: string;
    };
}

export default function BirthCertificateIndex({
    actes,
    filters = {},
}: BirthCertificateIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedActe, setSelectedActe] = useState<BirthCertificate | null>(null);
    const [acteToDelete, setActeToDelete] = useState<BirthCertificate | null>(null);

    // Normalize list vs paginated data
    const isPaginated = actes && !Array.isArray(actes);
    const acteList: BirthCertificate[] = isPaginated
        ? actes.data
        : Array.isArray(actes)
        ? actes
        : [];
    const totalCount = isPaginated ? actes.total : acteList.length;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            "/actes/naissance",
            { search: searchTerm },
            { preserveState: true, replace: true }
        );
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchTerm(val);
        if (val === "") {
            router.get(
                "/actes/naissance",
                {},
                { preserveState: true, replace: true }
            );
        }
    };

    const handleDelete = () => {
        if (acteToDelete?.id) {
            router.delete(`/actes/naissance/${acteToDelete.id}`, {
                onSuccess: () => setActeToDelete(null),
            });
        }
    };

    return (
        <AppLayout
            title="Actes de Naissance"
            subtitle="Registre municipal et consultation des actes d'état civil (Modèle Officiel Camerounais)"
        >
            <Head title="Actes de Naissance - Création des actes SWN" />

            <div className="space-y-6">
                {/* Top Action Header & Filters */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Bar Form */}
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Rechercher par nom, prénom, N° d'acte..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                        />
                    </form>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        <span className="text-xs text-slate-500 font-medium">
                            {totalCount} acte(s) au total en BD
                        </span>

                        <Link
                            href="/actes/naissance/creer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Rédiger un Acte de Naissance</span>
                        </Link>
                    </div>
                </div>

                {/* Table of Birth Certificates */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                                    <th className="py-4 px-5">N° Acte & Centre</th>
                                    <th className="py-4 px-5">Enfant (Nom & Prénoms)</th>
                                    <th className="py-4 px-5">Sexe</th>
                                    <th className="py-4 px-5">Lieu & Date Naissance</th>
                                    <th className="py-4 px-5">Parents</th>
                                    <th className="py-4 px-5">Officier / Secrétaire</th>
                                    <th className="py-4 px-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                                {acteList.length > 0 ? (
                                    acteList.map((acte) => (
                                        <tr
                                            key={acte.id || acte.numero_acte}
                                            className="hover:bg-slate-50/70 transition-colors"
                                        >
                                            <td className="py-4 px-5">
                                                <div className="font-mono font-bold text-teal-700 text-sm">
                                                    {acte.numero_acte}
                                                </div>
                                                <div className="text-[11px] text-slate-400">
                                                    {acte.centre_etat_civil}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="font-bold text-slate-900 text-sm">
                                                    {acte.nom_enfant}
                                                </div>
                                                <div className="text-slate-600 font-medium">
                                                    {acte.prenoms_enfant}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span
                                                    className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                                        acte.sexe === "M"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-pink-100 text-pink-800"
                                                    }`}
                                                >
                                                    {acte.sexe === "M"
                                                        ? "Masculin"
                                                        : "Féminin"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="font-semibold text-slate-800">
                                                    {acte.date_naissance}{" "}
                                                    {acte.heure_naissance
                                                        ? `à ${acte.heure_naissance}`
                                                        : ""}
                                                </div>
                                                <div className="text-[11px] text-slate-500">
                                                    {acte.lieu_naissance}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="text-slate-600">
                                                    Père:{" "}
                                                    <span className="font-semibold text-slate-800">
                                                        {acte.nom_pere || "---"}
                                                    </span>
                                                </div>
                                                <div className="text-slate-600">
                                                    Mère:{" "}
                                                    <span className="font-semibold text-slate-800">
                                                        {acte.nom_mere || "---"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5">
                                                <div className="font-medium text-slate-800">
                                                    {acte.nom_officier}
                                                </div>
                                                <div className="text-[11px] text-slate-400">
                                                    Sec: {acte.nom_secretaire || "---"}
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <div className="inline-flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setSelectedActe(acte)}
                                                        title="Aperçu & Télécharger"
                                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold text-xs transition-colors"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                        <span className="hidden sm:inline">
                                                            Aperçu
                                                        </span>
                                                    </button>
                                                    {acte.id && (
                                                        <>
                                                            <Link
                                                                href={`/actes/naissance/${acte.id}/editer`}
                                                                title="Modifier l'acte"
                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-xs transition-colors"
                                                            >
                                                                <Pencil className="w-3.5 h-3.5" />
                                                                <span className="hidden sm:inline">Éditer</span>
                                                            </Link>
                                                            <button
                                                                onClick={() => setActeToDelete(acte)}
                                                                title="Supprimer l'acte"
                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                                <span className="hidden sm:inline">Supprimer</span>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-12 text-center text-slate-400 space-y-2"
                                        >
                                            <FileSpreadsheet className="w-10 h-10 mx-auto text-slate-300" />
                                            <p className="font-medium">
                                                Aucun acte de naissance trouvé dans la base de données.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links Bar */}
                    {isPaginated && actes.links.length > 3 && (
                        <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                            <div>
                                Affichage de <span className="font-semibold text-slate-900">{actes.from ?? 0}</span> à <span className="font-semibold text-slate-900">{actes.to ?? 0}</span> sur <span className="font-semibold text-slate-900">{actes.total}</span> acte(s)
                            </div>
                            <div className="flex items-center gap-1 flex-wrap justify-center">
                                {actes.links.map((link, idx) => {
                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                className="px-3 py-1.5 rounded-lg text-slate-400 border border-slate-200 opacity-50 cursor-not-allowed text-xs"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            preserveState
                                            preserveScroll
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                                link.active
                                                    ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal preview / consultation of Official Cameroonian Birth Certificate */}
            {selectedActe && (
                <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-slate-100 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-300">
                        {/* Modal Header */}
                        <div className="p-5 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center font-bold">
                                    <Baby className="w-6 h-6 text-slate-950" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base sm:text-lg text-white">
                                        Copie d'Acte de Naissance N° {selectedActe.numero_acte}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        République du Cameroun - Format Officiel Bilingue
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {selectedActe.id && (
                                    <a
                                        href={`/actes/naissance/${selectedActe.id}/pdf`}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Télécharger l'Acte PDF</span>
                                    </a>
                                )}
                                <button
                                    onClick={() => setSelectedActe(null)}
                                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Document Content - Cameroonian Official Layout */}
                        <div className="p-6 sm:p-10">
                            <CameroonBirthCertificateDocument acte={selectedActe} />
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Confirmation de Suppression */}
            <DeleteBirthCertificateModal
                acte={acteToDelete}
                onClose={() => setActeToDelete(null)}
                onConfirm={handleDelete}
            />
        </AppLayout>
    );
}
