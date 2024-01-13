# AdvancedProgramming

## Installation du projet en local :

1. Cloner le projet

```bash
git clone https://github.com/Malo-LC/AdvancedProgrammingM2.git
```

2. Avoir une base de données MySQL (port 3306) avec un utilisateur root et un mot de passe `password`
3. Lancer le backend

```bash
cd api
mvn spring-boot:run
```

4. Lancer les migrations

```bash
mvn clean flyway:migrate
```

5. Lancer le frontend

```bash
cd app
npm install
npm run dev
```

6. Aller sur `http://localhost:5173`

### Routes :

- GET /file/all -> tout les fichiers
- GET /file/{id} -> fichier par id
- POST /file/upload -> upload un fichier (body file)

- GET /user/me -> retourne l'utilisateur connecté
- GET /user/all -> retourne tt les utilisateurs
