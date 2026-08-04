import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { BirthCertificate } from '../../../types';

interface DeleteBirthCertificateModalProps {
    acte: BirthCertificate | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteBirthCertificateModal({
    acte,
    onClose,
    onConfirm,
}: DeleteBirthCertificateModalProps) {
    if (!acte) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-base">Confirmer la suppression</h3>
                        <p className="text-xs text-slate-500">Cette action est irréversible dans la BD.</p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <p>
                        <strong>N° Acte :</strong>{' '}
                        <span className="font-mono text-teal-700">{acte.numero_acte}</span>
                    </p>
                    <p>
                        <strong>Enfant :</strong> {acte.nom_enfant} {acte.prenoms_enfant}
                    </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer définitivement</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
