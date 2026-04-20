# JO Basket-ball 🏀

Site web sur le basket-ball des Jeux Olympiques, développé avec HTML, CSS et TypeScript. Ce site est disponible en français et en anglais.

[![Build & Deploy](https://img.shields.io/github/actions/workflow/status/MathieuROCANCOURT/JO-basket-ball/test-build.yml?branch=main&label=Build)](https://github.com/MathieuROCANCOURT/JO-basket-ball/actions/workflows/test-build.yml)
[![HTML Validation](https://img.shields.io/github/actions/workflow/status/MathieuROCANCOURT/JO-basket-ball/validate-html.yml?branch=main&label=HTML)](https://github.com/MathieuROCANCOURT/JO-basket-ball/actions/workflows/validate-html.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

## 🛠️ Installation

```bash
# Cloner le dépôt
git clone https://github.com/MathieuROCANCOURT/JO-basket-ball.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Requis : Node.js 20+ et npm 9+

## Vérification des fichiers HTML

```bash
npm run validate
```

La validation HTML s'exécute automatiquement dans le workflow CI à chaque commit.

## 📦 Gestion des versions

### Générer CHANGELOG.md + commit + tag sémantique

```bash
npm run release

### Pousser vers le dépôt distant
git push --follow-tags
```

⚠️ Le push n'est pas automatique — exécutez-le manuellement après le release.

## 🖼️ Aperçu

### Page d'accueil

- Ballon avec animation de rebond vertical
- Arrière-plan aux 5 couleurs des anneaux olympiques
- Design responsive (mobile, tablette, desktop)


<img width="980" height="1034" alt="Page d&#39;accueil - Une discipline Olympique le Basket-ball" src="https://github.com/user-attachments/assets/77fac035-7e6e-4666-aa64-5122af0271cf">

## 📊 Sources des données

| Genre |                                                   Source                                                    |
| :---: | :---------------------------------------------------------------------------------------------------------: |
| Homme |   [Men's Olympics History](https://www.basketball-reference.com/international/mens-olympics-history.html)   |
| Femme | [Women's Olympics History](https://www.basketball-reference.com/international/womens-olympics-history.html) |

© Données fournies par Sports Reference LLC. Utilisation conforme aux conditions d'utilisation du site.

## 🔧 Outils techniques

|     Outil     |                           Description                           |
| :-----------: | :-------------------------------------------------------------: |
| HTML Validate | [html-validate](https://github.com/html-validate/html-validate) |
|  TypeScript   |             Typage statique pour la maintenabilité              |
