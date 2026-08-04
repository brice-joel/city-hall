import React from 'react';
import { Link } from '@inertiajs/react';
import { Building2 } from 'lucide-react';

export default function AuthContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-white">
                            Création des actes <span className="text-teal-400 font-light">SWN</span>
                        </span>
                    </Link>
                    <p className="text-xs text-slate-400">Authentification & Accès Sécurisé Mairie</p>
                </div>

                <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100">
                    {children}
                </div>

                <div className="text-center text-xs text-slate-500">
                    <Link href="/" className="hover:text-teal-400 transition-colors">
                        ← Retourner à la page d'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
