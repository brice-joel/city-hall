export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role?: string;
}

export interface BirthCertificate {
    id?: number;
    province?: string;
    departement?: string;
    arrondissement?: string;
    centre_etat_civil: string;
    numero_acte: string;
    
    // Child info (Enfant)
    nom_enfant: string;
    prenoms_enfant?: string;
    date_naissance: string;
    heure_naissance?: string;
    lieu_naissance: string;
    sexe: 'M' | 'F' | '';

    // Father info (Père - "De / Of")
    nom_pere?: string;
    lieu_naissance_pere?: string;
    domicile_pere?: string;
    profession_pere?: string;

    // Mother info (Mère - "Et de / And of")
    nom_mere?: string;
    lieu_naissance_mere?: string;
    date_naissance_mere?: string;
    domicile_mere?: string;
    profession_mere?: string;

    // Declaration & Signatures (Déclaration & Signataires)
    date_dressage: string;
    nom_declarant?: string;
    qualite_declarant?: string;
    nom_officier: string;
    qualite_officier?: string;
    nom_secretaire?: string;
    mentions_marginales?: string;
    statut?: string;
    created_at?: string;
    updated_at?: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    prev_page_url: string | null;
    next_page_url: string | null;
}

export interface ModuleItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    status: 'active' | 'coming_soon';
    category: 'EtatCivil' | 'GED' | 'Admin';
    badgeText?: string;
    count?: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
