-- ══════════════════════════════════════════════════════════
-- EMVII Admin — Migration v2
-- Ajoute la colonne `details text[]` à la table services
-- Exécuter dans l'éditeur SQL de Supabase
-- ══════════════════════════════════════════════════════════

-- 1. Ajout colonne details (tableau de chaînes)
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS details text[] NOT NULL DEFAULT '{}';

-- 2. Migration des données existantes :
--    l'ancienne colonne description (texte) → tableau (split par saut de ligne)
UPDATE public.services
SET details = ARRAY(
  SELECT trim(line)
  FROM unnest(string_to_array(description, E'\n')) AS line
  WHERE trim(line) != ''
)
WHERE description IS NOT NULL AND trim(description) != '';

-- 3. Suppression de l'ancienne colonne description
ALTER TABLE public.services
  DROP COLUMN IF EXISTS description;

-- 4. Mise à jour des exemples (si toujours présents et vides)
UPDATE public.services
SET details = ARRAY['Analyse des besoins, architecture, maquettes']
WHERE titre = 'Conception & cadrage du projet'
  AND array_length(details, 1) IS NULL;

UPDATE public.services
SET details = ARRAY[
  'Gestion des dossiers clients',
  'Checklist des tâches par intervention',
  'Ajout de photos par dossier client',
  'Notifications familles en fin de prestation',
  'Compte rendu automatique par e-mail',
  'Interface aux couleurs de LYZA'
]
WHERE titre = 'Développement application mobile'
  AND array_length(details, 1) IS NULL;

UPDATE public.services
SET details = ARRAY['Mise en ligne, tests de déploiement']
WHERE titre = 'Hébergement & déploiement (1 an)'
  AND array_length(details, 1) IS NULL;

UPDATE public.services
SET details = ARRAY['Connexion API, workflows n8n / Make']
WHERE titre = 'Automatisation de processus'
  AND array_length(details, 1) IS NULL;

UPDATE public.services
SET details = ARRAY['Suivi, mises à jour, support']
WHERE titre = 'Maintenance mensuelle'
  AND array_length(details, 1) IS NULL;

UPDATE public.services
SET details = ARRAY['Analyse de l''existant, recommandations']
WHERE titre = 'Audit & conseil'
  AND array_length(details, 1) IS NULL;

-- ── Structure finale de la table services ──
-- id          uuid PK
-- titre       text          "Développement application mobile"
-- details     text[]        {"Gestion des dossiers clients","Checklist des tâches",...}
-- prix_ht     numeric(10,2) 550.00
-- actif       boolean       true
-- created_at  timestamptz
