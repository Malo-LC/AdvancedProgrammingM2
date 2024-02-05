# AdvancedProgramming

## Installation du projet en local :

1. Cloner le projet

```bash
git clone https://github.com/Malo-LC/AdvancedProgrammingM2.git
```

2. lancer le docker-compose

```bash
docker-compose up -d
```

3. Lancer les migrations

```bash
cd api
mvn clean flyway:migrate
```

3. Lancer le serveur

```bash
mvn spring-boot:run
```

5. Lancer le frontend

```bash
cd app
npm install
npm run dev
```

6. Aller sur `http://localhost:5173`

### Routes :

Go to : http://localhost:8080/swagger-ui/index.html#/

### Things we did not have time to do :

Send an emails to the user to notify him the validation of documents or the creation of his account for example.
A search engine for the documents using keywords.
Restrict the confidentiality of the documents depending on the validation status
