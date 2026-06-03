# Démonstration
## Récupérer le code

Si vous avez une clé SSH d'installée:
```shell
git clone git@github.com:Chlaubry/Cacophonie_Groupe3.git
```

Si vous travaillez avec un client https:
```shell
git clone https://github.com/Chlaubry/Cacophonie_Groupe3.git
```

Si vous ne voulez pas de gestion de version, vous pouvez télécharger une archive zip en suivant ce lien: [https://github.com/Chlaubry/Cacophonie_Groupe3/archive/refs/heads/main.zip](https://github.com/Chlaubry/Cacophonie_Groupe3/archive/refs/heads/main.zip)


## Démarrer le projet

Installer les librairies:
```shell
npm install
```

Lancer le projet:
```shell
npm start
```

Vous pouvez ensuite accéder à la documentation OpenAPI/**Swagger** via le lien suivant: [http://localhost:3000/docs/](http://localhost:3000/docs/)

Vous pouvez aussi accéder au dashboard via le lien suivant: [http://localhost:3000/](http://localhost:3000/)


## Trace des requêtes ``curl`` de la démonstration

### POST ``/bots`` Créer un nouveau bot
```shell
curl -X 'POST' \
  'http://localhost:3000/bots' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Nouveau Bot",
  "brain": "english"
}'
```

### GET ``/bots`` Lister tous les bots
```shell
curl -X 'GET' \
  'http://localhost:3000/bots' \
  -H 'accept: application/json'
```

### PATCH ``/bots/{id}`` Changer un attribut d'un bot
```shell
curl -X 'PATCH' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Nom du bot changé",
  "status": true,
  "mouth": "2526_INFO2_Caco_group3_bot1"
}'
```
Nous passons le status à true et nous changons le nom du bot.

### PATCH ``/bots/{id}`` Changer un attribut d'un bot
```shell
curl -X 'PATCH' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Nom du bot changé",
  "status": false,
  "mouth": "2526_INFO2_Caco_group3_bot1"
}'
```
Nous passons le status à false.

### PATCH ``/bots/{id}`` Changer un attribut d'un bot
```shell
curl -X 'PATCH' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Nom du bot changé",
  "status": false,
  "mouth": "2526_INFO2_Caco_group3_bot3"
}'
```
Nous changons la bouche du bot et nous changons le status à false.

### PUT ``/bots/{id}/brain`` Modifier le brain (moteur conversationnel)
```shell
curl -X 'PUT' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b/brain' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "brain": "clients"
}'
```
On change le cerveau du bot

### PATCH ``/bots/{id}`` Changer un attribut d'un bot
```shell
curl -X 'PATCH' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Nom du bot changé",
  "status": true,
  "mouth": "2526_INFO2_Caco_group3_bot3"
}'
```
Nous passons le status à true.

### GET ``/users/{idUser}/conv`` Lister toutes les conversations d'un utilisateur.
```shell
curl -X 'GET' \
  'http://localhost:3000/users/565183985052024842/conversations' \
  -H 'accept: application/json'
```

### GET ``/bots/{id}/conv`` Récupérer toutes les conversations d'un bot.
```shell
curl -X 'GET' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b/conversations' \
  -H 'accept: application/json'
```

### GET ``/bots/{idBot}/{idUser}/conv`` Récupérer toutes les conversations d'un bot avec un utilisateur donnés.
```shell
curl -X 'GET' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b/565183985052024842/conversations' \
  -H 'accept: application/json'
```

### DELETE ``/bots/{id}/conv`` Supprimer toutes les conversations d'un bot
```shell
curl -X 'DELETE' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b/conversations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "idUser": "565183985052024842"
}'
```

```shell
curl -X 'DELETE' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b/conversations' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json'
```

### GET ``/bots/{idBot}/{idUser}/conv`` Récupérer toutes les conversations d'un bot avec un utilisateur donnés.
```shell
curl -X 'GET' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b/565183985052024842/conversations' \
  -H 'accept: application/json'
```

### DELETE ``/bots/{id}`` Supprimer un bot
```shell
curl -X 'DELETE' \
  'http://localhost:3000/bots/4fe97138-be7c-45a8-9992-8c3042eab17b' \
  -H 'accept: */*'
```