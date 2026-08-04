import AppLayout from '../Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { Baby, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <AppLayout
            title="Espace Agent"
            subtitle="Accès rapide aux services d'état civil et registres administratifs"
        >
            <Head title="Tableau de bord - Création des actes SWN" />

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-900">Bienvenue dans l'espace municipal</h3>
                        <p className="text-xs text-slate-500">Session de travail active pour la gestion des registres d'état civil.</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <Link
                        href="/actes/naissance"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs"
                    >
                        <Baby className="w-4 h-4" />
                        <span>Accéder aux Actes de Naissance</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
