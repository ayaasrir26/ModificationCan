# 🤝 Guide de Collaboration - CAN 2025

Ce guide explique comment configurer le projet pour travailler à plusieurs.

## 1. Accès au Code (GitHub)
- L'administrateur doit vous ajouter comme **Collaborator** sur GitHub.
- Une fois l'invitation acceptée, clonez le projet :
  ```bash
  git clone [URL_DU_REPO]
  cd can-connect-main
  ```

## 2. Configuration Locale
- Installez les dépendances :
  ```bash
  npm install
  ```
- Créez un fichier `.env` à la racine (demandez les clés à l'administrateur) :
  ```env
  VITE_SUPABASE_URL=votre_url_supabase
  VITE_SUPABASE_ANON_KEY=votre_cle_anon
  ```

## 3. Accès Base de Données (Supabase)
- Demandez une invitation sur le dashboard Supabase (**Settings > Members**).
- Cela vous permettra de voir les données et de tester en temps réel.

## 4. Workflow de Travail
- **Ne travaillez pas directement sur `main`**.
- Créez une branche pour chaque tâche :
  ```bash
  git checkout -b feature/nom-de-ma-tache
  ```
- Une fois terminé, poussez votre branche et créez une **Pull Request** sur GitHub.

---
🚀 Bonne chance pour le développement !
