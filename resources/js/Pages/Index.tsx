import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import {
    Baby,
    Heart,
    Cross,
    Archive,
    ArrowRight,
    PlusCircle,
    Building,
    ShieldCheck,
    Calendar,
    Sparkles,
    CheckCircle2,
    Clock,
    FolderOpen,
    FileSpreadsheet,
} from "lucide-react";
import { BirthCertificate } from "../types";

interface IndexProps {
    recentActes?: BirthCertificate[];
    totalActes?: number;
}

export default function Index({
    recentActes = [],
    totalActes = 0,
}: IndexProps) {
    const modules = [
        {
            id: "naissance",
            title: "Actes de Naissance",
            subtitle: "Module Actif (Modèle Camerounais)",
            description:
                "Création, enregistrement en BD et édition d'actes de naissance selon le modèle officiel camerounais (bilingue fr/en).",
            icon: Baby,
            href: "/actes/naissance",
            actionText: "Accéder aux actes de naissance",
            secondaryActionText: "Créer un acte",
            secondaryHref: "/actes/naissance/creer",
            status: "active",
            badge: "Disponible maintenant",
            color: "teal",
            stats: `${totalActes} acte(s) en base de données`,
        },
        {
            id: "mariage",
            title: "Actes de Mariage",
            subtitle: "Module Étape 2",
            description:
                "Gestion des bancs, publication des mariages civils et contrats d'union.",
            icon: Heart,
            href: "#",
            actionText: "Module en préparation",
            status: "coming_soon",
            badge: "Prochainement",
            color: "slate",
            stats: "Régime matrimonial & déclarations",
        },
        {
            id: "deces",
            title: "Actes de Décès",
            subtitle: "Module Étape 3",
            description:
                "Déclarations de décès, autorisations d'inhumation et tenue des registres mortuaires.",
            icon: Cross,
            href: "#",
            actionText: "Module en préparation",
            status: "coming_soon",
            badge: "Prochainement",
            color: "slate",
            stats: "Transcriptions & registres",
        },
        {
            id: "ged",
            title: "GED & Archiving",
            subtitle: "Gestion Documentaire",
            description:
                "Numérisation, classement automatique et archivage à valeur probante des dossiers.",
            icon: Archive,
            href: "#",
            actionText: "Module en préparation",
            status: "coming_soon",
            badge: "Prochainement",
            color: "slate",
            stats: "Coffre-fort numérique",
        },
    ];

    return (
        <AppLayout
            title="Tableau de Bord Municipal"
            subtitle="Plateforme de gestion électronique des actes d'état civil de la mairie"
        >
            <Head title="Accueil - Création des actes SWN" />

            <div className="space-y-8 pb-12">
                {/* Hero Banner Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-8 md:p-10 text-white shadow-xl">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 max-w-3xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-sm">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>
                                Modèle Officiel Camerounais (Bilingue FR / EN)
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                            Bienvenue sur{" "}
                            <span className="text-teal-400">
                                Création des actes SWN
                            </span>
                        </h2>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            Logiciel municipal pour la gestion de la paperasse
                            et des actes de naissance. Toutes les données sont
                            désormais stockées en base de données et les actes
                            sont générés selon le modèle officiel camerounais
                            bilingue.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Link
                                href="/actes/naissance/creer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02]"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Créer un Acte de Naissance</span>
                            </Link>

                            <Link
                                href="/actes/naissance"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm transition-colors"
                            >
                                <FolderOpen className="w-4 h-4 text-teal-400" />
                                <span>
                                    Consulter le Registre ({totalActes})
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Key Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                            <Baby className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Actes en BD
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                                {totalActes} Enregistré(s)
                            </h3>
                            <p className="text-[11px] text-teal-600 font-medium mt-0.5">
                                Données réelles active
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Modèle Conforme
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                                Cameroun FR/EN
                            </h3>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                Bilingue officiel
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Statut BD
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                                Base Connectée
                            </h3>
                            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                                Persistence active
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                            <Building className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Centre d'État Civil
                            </p>
                            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                                Mairie / Centre
                            </h3>
                            <p className="text-[11px] text-blue-600 font-medium mt-0.5">
                                Guichet unique
                            </p>
                        </div>
                    </div>
                </div>

                {/* Modules Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                Modules de l'Application
                            </h3>
                            <p className="text-xs text-slate-500">
                                Sélectionnez le service municipal auquel vous
                                souhaitez accéder
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {modules.map((mod) => {
                            const IconComp = mod.icon;
                            const isActive = mod.status === "active";

                            return (
                                <div
                                    key={mod.id}
                                    className={`
                                        rounded-2xl p-6 transition-all border
                                        ${
                                            isActive
                                                ? "bg-white border-teal-500/40 shadow-md shadow-teal-900/5 hover:border-teal-500 ring-2 ring-teal-500/10"
                                                : "bg-white/60 border-slate-200/80 shadow-xs opacity-85"
                                        }
                                    `}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div
                                            className={`
                                            w-12 h-12 rounded-2xl flex items-center justify-center
                                            ${
                                                isActive
                                                    ? "bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-600/30"
                                                    : "bg-slate-100 text-slate-400"
                                            }
                                        `}
                                        >
                                            <IconComp className="w-6 h-6" />
                                        </div>

                                        <span
                                            className={`
                                            text-xs font-semibold px-3 py-1 rounded-full border
                                            ${
                                                isActive
                                                    ? "bg-teal-100 text-teal-800 border-teal-300"
                                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                            }
                                        `}
                                        >
                                            {mod.badge}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <span>{mod.title}</span>
                                            {isActive && (
                                                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                            )}
                                        </h4>
                                        <p className="text-xs font-semibold text-teal-700">
                                            {mod.subtitle}
                                        </p>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {mod.description}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                                        <span className="text-[11px] font-medium text-slate-400">
                                            {mod.stats}
                                        </span>

                                        {isActive ? (
                                            <div className="flex items-center gap-2">
                                                {mod.secondaryHref && (
                                                    <Link
                                                        href={mod.secondaryHref}
                                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-semibold transition-colors"
                                                    >
                                                        <PlusCircle className="w-3.5 h-3.5" />
                                                        <span>
                                                            {
                                                                mod.secondaryActionText
                                                            }
                                                        </span>
                                                    </Link>
                                                )}
                                                <Link
                                                    href={mod.href}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-all"
                                                >
                                                    <span>
                                                        {mod.actionText}
                                                    </span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        ) : (
                                            <button
                                                disabled
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed border border-slate-200"
                                            >
                                                <span>{mod.actionText}</span>
                                                <Clock className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Actes Section */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Baby className="w-5 h-5 text-teal-600" />
                                <h3 className="text-base font-bold text-slate-900">
                                    Derniers Actes d'État Civil Enregistrés en
                                    Base de Données
                                </h3>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Registre en direct extrait de la base de
                                données.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link
                                href="/actes/naissance"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                            >
                                <span>
                                    Voir tout le registre ({totalActes})
                                </span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>

                            <Link
                                href="/actes/naissance/creer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors shadow-xs"
                            >
                                <PlusCircle className="w-3.5 h-3.5" />
                                <span>Nouveau</span>
                            </Link>
                        </div>
                    </div>

                    {recentActes.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                                        <th className="py-3.5 px-5">N° Acte</th>
                                        <th className="py-3.5 px-5">
                                            Nom & Prénoms de l'Enfant
                                        </th>
                                        <th className="py-3.5 px-5">Sexe</th>
                                        <th className="py-3.5 px-5">
                                            Date de Naissance
                                        </th>
                                        <th className="py-3.5 px-5">Parents</th>
                                        <th className="py-3.5 px-5">
                                            Officier / Centre
                                        </th>
                                        <th className="py-3.5 px-5 text-right">
                                            Statut
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                                    {recentActes.map((acte) => (
                                        <tr
                                            key={acte.id || acte.numero_acte}
                                            className="hover:bg-slate-50/60 transition-colors"
                                        >
                                            <td className="py-3.5 px-5 font-mono font-bold text-teal-700">
                                                {acte.numero_acte}
                                            </td>
                                            <td className="py-3.5 px-5 font-medium text-slate-900">
                                                <div className="font-bold text-slate-900">
                                                    {acte.nom_enfant}
                                                </div>
                                                <div className="text-slate-500">
                                                    {acte.prenoms_enfant}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-5">
                                                <span
                                                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${acte.sexe === "M" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800"}`}
                                                >
                                                    {acte.sexe === "M"
                                                        ? "Masculin"
                                                        : "Féminin"}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-5 font-medium text-slate-800">
                                                {acte.date_naissance}{" "}
                                                {acte.heure_naissance
                                                    ? `à ${acte.heure_naissance}`
                                                    : ""}
                                            </td>
                                            <td className="py-3.5 px-5 text-slate-600">
                                                <div>
                                                    Père:{" "}
                                                    <span className="font-medium text-slate-800">
                                                        {acte.nom_pere || "---"}
                                                    </span>
                                                </div>
                                                <div>
                                                    Mère:{" "}
                                                    <span className="font-medium text-slate-800">
                                                        {acte.nom_mere || "---"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-5 text-slate-600">
                                                <div className="font-medium text-slate-800">
                                                    {acte.nom_officier}
                                                </div>
                                                <div className="text-[11px] text-slate-400">
                                                    {acte.centre_etat_civil}
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-5 text-right">
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                                    <span>
                                                        {acte.statut ||
                                                            "Validé"}
                                                    </span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center space-y-3">
                            <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto" />
                            <h4 className="text-sm font-bold text-slate-700">
                                Aucun acte de naissance enregistré dans la base
                                de données
                            </h4>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                Vous pouvez commencer par créer le premier acte
                                de naissance en cliquant sur le bouton
                                ci-dessous.
                            </p>
                            <Link
                                href="/actes/naissance/creer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs transition-colors hover:bg-teal-700"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Créer le Premier Acte</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
