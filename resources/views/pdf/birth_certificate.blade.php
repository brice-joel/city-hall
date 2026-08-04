<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Acte de Naissance N° {{ $acte->numero_acte }}</title>
    <style>
        @page {
            margin: 12px 16px;
        }

        body {
            font-family: 'DejaVu Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 10px;
            color: #0f172a;
            line-height: 1.35;
        }

        /* Header Layout */
        .header-table {
            width: 100%;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 6px;
            margin-bottom: 10px;
        }

        .header-left {
            width: 50%;
            vertical-align: top;
            font-size: 9px;
        }

        .header-right {
            width: 50%;
            vertical-align: top;
            text-align: right;
            font-size: 9px;
        }

        .bold {
            font-weight: bold;
        }

        .uppercase {
            text-transform: uppercase;
        }

        .italic {
            font-style: italic;
            color: #475569;
        }

        /* Title Area */
        .title-area {
            text-align: center;
            margin-bottom: 10px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 6px;
        }

        .main-title {
            font-size: 18px;
            font-weight: 900;
            letter-spacing: 1.5px;
            margin: 0;
            color: #0f172a;
        }

        .centre-title {
            font-size: 11px;
            font-weight: bold;
            margin: 2px 0 1px 0;
        }

        .acte-title {
            font-size: 13px;
            font-weight: bold;
            margin-top: 6px;
            border-bottom: 2px solid #0f172a;
            display: inline-block;
            padding-bottom: 1px;
        }

        .numero-acte {
            font-size: 12px;
            font-weight: bold;
            color: #0f766e;
            margin-top: 3px;
        }

        /* Dotted Field Lines */
        .field-row {
            margin-bottom: 5px;
            border-bottom: 1px dotted #94a3b8;
            padding-bottom: 1px;
            font-size: 10px;
        }

        .field-label {
            font-weight: bold;
            color: #0f172a;
        }

        .field-value {
            font-weight: bold;
            color: #0f172a;
            font-size: 11px;
            padding-left: 4px;
        }

        .field-value-text {
            font-weight: bold;
            color: #0f172a;
            padding-left: 4px;
        }

        .section-formula {
            text-align: center;
            margin: 10px 0 8px 0;
            font-size: 9px;
        }

        /* Signatures Table */
        .signatures-table {
            width: 100%;
            margin-top: 25px;
            text-align: center;
        }

        .signature-box {
            width: 50%;
            vertical-align: top;
            height: 75px;
        }

        .signature-title {
            font-weight: bold;
            font-size: 10px;
            text-transform: uppercase;
        }

        .signature-sub {
            font-style: italic;
            font-size: 8px;
            color: #64748b;
        }

        .signature-name {
            margin-top: 35px;
            font-weight: bold;
            font-size: 10px;
        }
    </style>
</head>
<body>

    <!-- Header Section -->
    <table class="header-table">
        <tr>
            <td class="header-left">
                <div class="bold uppercase">PROVINCE / REGION</div>
                <div class="uppercase bold" style="color: #334155;">{{ $acte->province ?? 'CENTRE' }}</div>

                <div class="bold uppercase" style="margin-top: 3px;">DEPARTEMENT / DIVISION</div>
                <div class="uppercase bold" style="color: #334155;">{{ $acte->departement ?? 'MFOUNDI' }}</div>

                <div className="bold uppercase" style="margin-top: 3px;">ARRONDISSEMENT / SUBDIVISION</div>
                <div class="uppercase bold" style="color: #334155;">{{ $acte->arrondissement ?? 'YAOUNDÉ 1er' }}</div>
            </td>
            <td class="header-right">
                <div class="bold uppercase">REPUBLIQUE DU CAMEROUN</div>
                <div class="italic">Paix - Travail - Patrie</div>

                <div class="bold uppercase" style="margin-top: 4px;">REPUBLIC OF CAMEROON</div>
                <div class="italic">Peace - Work - Fatherland</div>
            </td>
        </tr>
    </table>

    <!-- Central Title Area -->
    <div class="title-area">
        <h1 class="main-title">COPIE - COPY</h1>
        <div class="centre-title">CENTRE D'ETAT CIVIL / CIVIL STATUS REGISTRATION CENTRE</div>
        <div class="italic">de - of : <strong>{{ $acte->centre_etat_civil }}</strong></div>

        <div class="acte-title">
            ACTE DE NAISSANCE / BIRTH CERTIFICATE
        </div>
        <div class="numero-acte">
            N° : <u>{{ $acte->numero_acte }}</u>
        </div>
    </div>

    <!-- Main Content Lines -->
    <div class="field-row">
        <span class="field-label">Nom de l'enfant</span> <span class="italic">/ Name of the child</span> :
        <span class="field-value uppercase">{{ $acte->nom_enfant }} {{ $acte->prenoms_enfant }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Le</span> <span class="italic">/ On the</span> :
        <span class="field-value-text">{{ $acte->date_naissance }} {{ $acte->heure_naissance ? 'à '.$acte->heure_naissance : '' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Est né à</span> <span class="italic">/ Was born at</span> :
        <span class="field-value-text">{{ $acte->lieu_naissance }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">De sexe</span> <span class="italic">/ Sex</span> :
        <span class="field-value-text">{{ $acte->sexe === 'M' ? 'Masculin / Male' : 'Féminin / Female' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">De</span> <span class="italic">/ Of</span> :
        <span class="field-value-text">{{ $acte->nom_pere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Né à</span> <span class="italic">/ Born at</span> :
        <span class="field-value-text">{{ $acte->lieu_naissance_pere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Domicilié à</span> <span class="italic">/ Resident at</span> :
        <span class="field-value-text">{{ $acte->domicile_pere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Profession</span> <span class="italic">/ Occupation</span> :
        <span class="field-value-text">{{ $acte->profession_pere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Et de</span> <span className="italic">/ And of</span> :
        <span class="field-value-text">{{ $acte->nom_mere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Née à</span> <span class="italic">/ Born at</span> :
        <span class="field-value-text">{{ $acte->lieu_naissance_mere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Le</span> <span class="italic">/ On the</span> :
        <span class="field-value-text">{{ $acte->date_naissance_mere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Domiciliée à</span> <span class="italic">/ Resident at</span> :
        <span class="field-value-text">{{ $acte->domicile_mere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Profession</span> <span class="italic">/ Occupation</span> :
        <span class="field-value-text">{{ $acte->profession_mere ?? '---' }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Dressé le</span> <span class="italic">/ Drawn up on the</span> :
        <span class="field-value-text">{{ $acte->date_dressage }}</span>
    </div>

    <div class="field-row">
        <span class="field-label">Sur la déclaration de</span> <span class="italic">/ In accordance with declaration of</span> :
        <span class="field-value-text">{{ $acte->nom_declarant ?? '---' }} ({{ $acte->qualite_declarant ?? 'Déclarant' }})</span>
    </div>

    <div class="section-formula">
        <div class="bold">Lesquels ont certifié la sincérité de la présente déclaration.</div>
        <div class="italic">Who attested to truth of this declaration.</div>
    </div>

    <div class="field-row">
        <span class="field-label">Par nous</span> <span class="italic">/ By us</span> :
        <span class="field-value-text">{{ $acte->nom_officier }}</span>
        <span class="bold uppercase" style="float: right;">Officier / Officer</span>
    </div>

    <div class="field-row">
        <span class="field-label">de l'état civil du centre de</span> <span class="italic">/ Civil Status Registrar for</span> :
        <span class="field-value-text">{{ $acte->centre_etat_civil }}</span>
        <span class="bold uppercase" style="float: right;">Centre</span>
    </div>

    <div class="field-row">
        <span class="field-label">Assisté de</span> <span class="italic">/ In the presence of</span> :
        <span class="field-value-text">{{ $acte->nom_secretaire ?? '---' }}</span>
    </div>

    <!-- Signatures Section -->
    <table class="signatures-table">
        <tr>
            <td class="signature-box">
                <div class="signature-title">Secrétaire d'Etat Civil</div>
                <div class="signature-sub">Civil Status Registrar</div>
                <div class="signature-name">
                    {{ $acte->nom_secretaire ? '( '.$acte->nom_secretaire.' )' : '( Signature & Sceau )' }}
                </div>
            </td>
            <td class="signature-box">
                <div class="signature-title">Signature de l'Officier d'Etat Civil</div>
                <div class="signature-sub">Signature of Civil Status Registrar</div>
                <div class="signature-name">
                    {{ $acte->nom_officier ? '( '.$acte->nom_officier.' )' : '( Signature & Sceau )' }}
                </div>
            </td>
        </tr>
    </table>

</body>
</html>
