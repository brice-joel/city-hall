import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { PageProps } from "../types";
import {
    Baby,
    Heart,
    Cross,
    Archive,
    BarChart3,
    Settings,
    Search,
    Menu,
    X,
    Building2,
    ShieldCheck,
    PlusCircle,
    ChevronRight,
    Home,
    FolderKanban,
} from "lucide-react";

interface AppLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

export default function AppLayout({
    children,
    title,
    subtitle,
}: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url, props } = usePage<PageProps>();
    const flash = props.flash;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const isHomeActive = url === "/" || url === "";
    const isBirthActive = url.startsWith("/actes/naissance");

    const navigationItems = [
        {
            name: "Accueil & Plateforme",
            href: "/",
            icon: Home,
            active: isHomeActive,
            status: "active",
            badge: undefined,
        },
        {
            name: "Actes de Naissance",
            href: "/actes/naissance",
            icon: Baby,
            active: isBirthActive,
            status: "active",
            badge: "MVP Actif",
            badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
        },
        {
            name: "Actes de Mariage",
            href: "#",
            icon: Heart,
            active: false,
            status: "coming_soon",
            badge: "À venir",
            badgeColor: "bg-slate-100 text-slate-500 border-slate-200",
        },
        {
            name: "Actes de Décès",
            href: "#",
            icon: Cross,
            active: false,
            status: "coming_soon",
            badge: "À venir",
            badgeColor: "bg-slate-100 text-slate-500 border-slate-200",
        },
        {
            name: "GED & Archives",
            href: "#",
            icon: Archive,
            active: false,
            status: "coming_soon",
            badge: "À venir",
            badgeColor: "bg-slate-100 text-slate-500 border-slate-200",
        },
        {
            name: "Registres & Stats",
            href: "#",
            icon: BarChart3,
            active: false,
            status: "coming_soon",
            badge: "Bientôt",
            badgeColor: "bg-slate-100 text-slate-500 border-slate-200",
        },
    ];

    return (
        <div className="h-screen w-screen bg-slate-50/80 text-slate-800 flex flex-col font-sans overflow-hidden selection:bg-teal-500 selection:text-white">
            <Toaster position="top-right" richColors />
            {/* Top Navigation Bar - Fixed Header */}
            <header className="shrink-0 z-40 bg-slate-900 text-white shadow-sm border-b border-slate-800">
                <div className="flex items-center justify-between px-4 py-3 md:px-6">
                    {/* Left Brand & Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none lg:hidden transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-2.5 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-900/30 group-hover:scale-105 transition-transform">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg tracking-tight text-white group-hover:text-teal-300 transition-colors">
                                        Création des actes{" "}
                                        <span className="font-light text-teal-400">
                                            SWN
                                        </span>
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-teal-900/80 text-teal-300 border border-teal-700/50 hidden sm:inline-block">
                                        État Civil
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 font-normal hidden sm:block">
                                    Gestion Électronique des Actes Municipaux
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Central Global Search Input */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un acte, un citoyen, un numéro..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-800/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Right Header Utilities & Actions */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/actes/naissance/creer"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm shadow-teal-900/40 transition-colors"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Nouvel Acte</span>
                        </Link>

                        <div className="h-6 w-px bg-slate-800 hidden sm:block" />

                        {/* Municipality Status Pill */}
                        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/70 rounded-full px-3 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <div className="text-left">
                                <p className="text-xs font-medium text-slate-200 leading-none">
                                    Mairie YDE IV
                                </p>
                                <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                                    Session Active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Body Area with Independent Sidebar & Content Scrolls */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar Component - Independent Scroll Container */}
                <aside
                    className={`
                        fixed lg:static inset-y-0 left-0 z-40
                        w-64 shrink-0 bg-slate-900 text-slate-300 border-r border-slate-800
                        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
                        transition-transform duration-200 ease-in-out
                        flex flex-col justify-between h-full overflow-y-auto pt-4 lg:pt-0
                    `}
                >
                    <div className="p-4 space-y-6 overflow-y-auto flex-1">
                        {/* Section: Service Municipal */}
                        <div>
                            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                Modules d'État Civil
                            </p>
                            <nav className="space-y-1">
                                {navigationItems.map((item) => {
                                    const IconComponent = item.icon;
                                    const isDisabled =
                                        item.status === "coming_soon";

                                    if (isDisabled) {
                                        return (
                                            <div
                                                key={item.name}
                                                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-500 bg-slate-900/40 cursor-not-allowed group opacity-75"
                                                title="Ce module sera disponible prochainement."
                                            >
                                                <div className="flex items-center gap-3">
                                                    <IconComponent className="w-4 h-4 text-slate-600" />
                                                    <span>{item.name}</span>
                                                </div>
                                                {item.badge && (
                                                    <span
                                                        className={`text-[10px] px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                            className={`
                                                flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all
                                                ${
                                                    item.active
                                                        ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-sm shadow-teal-950 font-semibold"
                                                        : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IconComponent
                                                    className={`w-4 h-4 ${item.active ? "text-white" : "text-teal-400"}`}
                                                />
                                                <span>{item.name}</span>
                                            </div>
                                            {item.badge && (
                                                <span
                                                    className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${item.badgeColor}`}
                                                >
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Section: Administration & Outils */}
                        <div className="pt-4 border-t border-slate-800">
                            <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                Administration & Outils
                            </p>
                            <nav className="space-y-1">
                                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <FolderKanban className="w-4 h-4 text-slate-500" />
                                        <span>Registre Global</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500">
                                        2026
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 opacity-60 cursor-not-allowed">
                                    <div className="flex items-center gap-3">
                                        <Settings className="w-4 h-4 text-slate-500" />
                                        <span>Paramètres Mairie</span>
                                    </div>
                                </div>
                            </nav>
                        </div>

                        {/* Municipal Notice Box */}
                        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3.5 text-xs space-y-2">
                            <div className="flex items-center gap-2 text-teal-400 font-semibold">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Version MVP Cameroun</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                                Module{" "}
                                <strong className="text-slate-300">
                                    Acte de Naissance
                                </strong>{" "}
                                conforme au modèle officiel bilingue.
                            </p>
                        </div>
                    </div>

                    {/* Footer User/System info */}
                    <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-teal-900/60 border border-teal-700/50 flex items-center justify-center font-bold text-teal-300 text-xs">
                                EC
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-slate-200 text-xs">
                                    Officier d'État Civil
                                </p>
                                <p className="text-[10px] text-slate-400">
                                    Guichet Unique
                                </p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Workspace - Independent Scroll Container */}
                <main className="flex-1 flex flex-col min-w-0 bg-slate-50/70 h-full overflow-y-auto">
                    {/* Header bar / Breadcrumb area */}
                    {(title || subtitle) && (
                        <div className="bg-white border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8 shadow-xs shrink-0">
                            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
                                        <Link
                                            href="/"
                                            className="hover:text-teal-600 transition-colors"
                                        >
                                            Accueil
                                        </Link>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-slate-700 font-semibold">
                                            {title}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                        {title}
                                    </h1>
                                    {subtitle && (
                                        <p className="mt-1 text-sm text-slate-600">
                                            {subtitle}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/actes/naissance/creer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01]"
                                    >
                                        <PlusCircle className="w-4 h-4" />
                                        <span>Créer un Acte de Naissance</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Page Content */}
                    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                        {children}
                    </div>

                    {/* App Footer */}
                    <footer className="mt-auto bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 shrink-0">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                            <p>
                                © 2026 Création des actes SWN — Logiciel de Gestion
                                Électronique des Actes Municipaux
                            </p>
                            <div className="flex items-center gap-4 text-[11px] text-slate-400">
                                <span>Version MVP 1.0</span>
                                <span>•</span>
                                <span>Modèle Camerounais Conforme</span>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
