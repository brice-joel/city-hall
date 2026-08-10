import React from 'react';
import { BirthCertificate } from '../types';

interface CameroonBirthCertificateDocumentProps {
    acte: BirthCertificate;
    isPrintOnly?: boolean;
}

export default function CameroonBirthCertificateDocument({ acte, isPrintOnly = false }: CameroonBirthCertificateDocumentProps) {
    return (
        <div className={`bg-white text-slate-900 font-serif p-6 sm:p-8 border border-slate-300 rounded-none shadow-md max-w-md mx-auto space-y-5 ${isPrintOnly ? 'print:p-0 print:border-none print:shadow-none' : ''}`}>
            
            {/* Header Section: Province/Department (Left) & Republic (Right) */}
            <div className="grid grid-cols-2 gap-4 items-start border-b-2 border-slate-900 pb-3 text-xs font-serif leading-tight">
                {/* Left Header */}
                <div className="space-y-1">
                    <div>
                        <span className="font-bold uppercase tracking-wider block text-[10px]">PROVINCE / REGION</span>
                        <span className="font-sans font-semibold text-slate-800 uppercase text-xs">{acte.province || 'CENTRE'}</span>
                    </div>
                    <div>
                        <span className="font-bold uppercase tracking-wider block text-[10px]">DEPARTEMENT / DIVISION</span>
                        <span className="font-sans font-semibold text-slate-800 uppercase text-xs">{acte.departement || 'MFOUNDI'}</span>
                    </div>
                    <div>
                        <span className="font-bold uppercase tracking-wider block text-[10px]">ARRONDISSEMENT / SUBDIVISION</span>
                        <span className="font-sans font-semibold text-slate-800 uppercase text-xs">{acte.arrondissement || 'YAOUNDÉ 1er'}</span>
                    </div>
                </div>

                {/* Right Header */}
                <div className="text-right space-y-0.5">
                    <p className="font-bold text-xs uppercase tracking-wide">REPUBLIQUE DU CAMEROUN</p>
                    <p className="italic text-[10px] text-slate-600">Paix - Travail - Patrie</p>
                    <p className="font-bold text-xs uppercase tracking-wide pt-1">REPUBLIC OF CAMEROON</p>
                    <p className="italic text-[10px] text-slate-600">Peace - Work - Fatherland</p>
                </div>
            </div>

            {/* Central Title */}
            <div className="text-center space-y-1.5 py-1 border-b border-slate-300">
                <div className="space-y-0.5">
                    <p className="font-bold text-xs uppercase">CENTRE D'ETAT CIVIL</p>
                    <p className="italic text-[11px] text-slate-600">CIVIL STATUS REGISTRATION CENTRE</p>
                    <p className="font-sans font-bold text-slate-800 text-xs">
                        de - of : <span className="underline decoration-slate-400 decoration-dotted uppercase">{acte.centre_etat_civil || 'CENTRE D\'ÉTAT CIVIL DE YAOUNDÉ 1er'}</span>
                    </p>
                </div>

                <div className="pt-1.5">
                    <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wide inline-block border-b-2 border-slate-900 pb-0.5">
                        ACTE DE NAISSANCE <span className="text-xs font-normal font-sans text-slate-600 font-serif">/ BIRTH CERTIFICATE</span>
                    </h3>
                    <p className="font-mono font-bold text-xs sm:text-sm text-teal-900 mt-1">
                        N° : <span className="underline decoration-slate-900">{acte.numero_acte || '0000/N/2026'}</span>
                    </p>
                </div>
            </div>

            {/* Main Body - Bilingual Field Lines */}
            <div className="space-y-3 text-xs leading-relaxed pt-1">
                {/* Child Name */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Nom de l'enfant</span> <span className="italic text-slate-500 font-normal">/ Name of the child</span> :
                    <span className="font-sans font-black text-sm text-slate-900 uppercase pl-1">{acte.nom_enfant} {acte.prenoms_enfant}</span>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Le</span> <span className="italic text-slate-500 font-normal">/ On the</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.date_naissance} {acte.heure_naissance ? `à ${acte.heure_naissance}` : ''}</span>
                </div>

                {/* Place of Birth */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Est né à</span> <span className="italic text-slate-500 font-normal">/ Was born at</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.lieu_naissance}</span>
                </div>

                {/* Sex */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">De sexe</span> <span className="italic text-slate-500 font-normal">/ Sex</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.sexe === 'M' ? 'Masculin / Male' : 'Féminin / Female'}</span>
                </div>

                {/* Father Info */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">De</span> <span className="italic text-slate-500 font-normal">/ Of</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.nom_pere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Né à</span> <span className="italic text-slate-500 font-normal">/ Born at</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.lieu_naissance_pere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Domicilié à</span> <span className="italic text-slate-500 font-normal">/ Resident at</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.domicile_pere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Profession</span> <span className="italic text-slate-500 font-normal">/ Occupation</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.profession_pere || '---'}</span>
                </div>

                {/* Mother Info */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1 pt-0.5">
                    <span className="font-bold">Et de</span> <span className="italic text-slate-500 font-normal">/ And of</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.nom_mere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Née à</span> <span className="italic text-slate-500 font-normal">/ Born at</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.lieu_naissance_mere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Le</span> <span className="italic text-slate-500 font-normal">/ On the</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.date_naissance_mere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Domiciliée à</span> <span className="italic text-slate-500 font-normal">/ Resident at</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.domicile_mere || '---'}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Profession</span> <span className="italic text-slate-500 font-normal">/ Occupation</span> :
                    <span className="font-sans font-semibold text-slate-800 pl-1">{acte.profession_mere || '---'}</span>
                </div>

                {/* Declaration & Officer */}
                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1 pt-0.5">
                    <span className="font-bold">Dressé le</span> <span className="italic text-slate-500 font-normal">/ Drawn up on the</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.date_dressage}</span>
                </div>

                <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                    <span className="font-bold">Sur la déclaration de</span> <span className="italic text-slate-500 font-normal">/ In accordance with declaration of</span> :
                    <span className="font-sans font-bold text-slate-900 pl-1">{acte.nom_declarant || '---'} ({acte.qualite_declarant || 'Déclarant'})</span>
                </div>

                {/* Attestation Formula */}
                <div className="pt-1.5 text-center text-[11px] space-y-0.5">
                    <p className="font-bold text-slate-900">
                        Lesquels ont certifié la sincérité de la présente déclaration.
                    </p>
                    <p className="italic text-slate-600 text-[10px]">
                        Who attested to truth of this declaration.
                    </p>
                </div>

                {/* Officer Formula */}
                <div className="pt-1 text-[11px] space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between border-b border-dotted border-slate-400 pb-1">
                        <div>
                            <span className="font-bold">Par nous</span> <span className="italic text-slate-500">/ By us</span> : <span className="font-sans font-bold text-slate-900 underline pl-1">{acte.nom_officier}</span>
                        </div>
                        <div className="font-bold uppercase tracking-wider text-slate-900">
                            Officier / Officer
                        </div>
                    </div>

                    <div className="flex flex-wrap items-baseline justify-between border-b border-dotted border-slate-400 pb-1">
                        <div>
                            <span className="font-bold">de l'état civil du centre de</span> <span className="italic text-slate-500">/ Civil Status Registrar for</span> : <span className="font-sans font-bold text-slate-900 pl-1">{acte.centre_etat_civil}</span>
                        </div>
                        <div className="font-bold uppercase tracking-wider text-slate-900">
                            Centre
                        </div>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                        <span className="font-bold">Assisté de</span> <span className="italic text-slate-500">/ In the presence of</span> :
                        <span className="font-sans font-semibold text-slate-900 pl-1">{acte.nom_secretaire || '---'}</span>
                    </div>
                </div>
            </div>

            {/* Footer Signatures Area */}
            <div className="pt-6 grid grid-cols-2 gap-6 text-[11px] font-serif text-center">
                <div className="space-y-8">
                    <div>
                        <p className="font-bold uppercase tracking-wider">Secrétaire d'Etat Civil</p>
                        <p className="italic text-[10px] text-slate-500">Civil Status Registrar</p>
                    </div>
                    <div className="font-sans font-semibold text-slate-800 italic">
                        {acte.nom_secretaire ? `( ${acte.nom_secretaire} )` : '( Signature & Sceau )'}
                    </div>
                </div>

                <div className="space-y-8">
                    <div>
                        <p className="font-bold uppercase tracking-wider">Signature de l'Officier d'Etat Civil</p>
                        <p className="italic text-[10px] text-slate-500">Signature of Civil Status Registrar</p>
                    </div>
                    <div className="font-sans font-bold text-slate-900 uppercase">
                        {acte.nom_officier ? `( ${acte.nom_officier} )` : '( Signature & Sceau )'}
                    </div>
                </div>
            </div>
        </div>
    );
}
