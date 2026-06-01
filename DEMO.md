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

## Trace des requêtes ``curl``

### Users

#### GET ``/users/{idUser}/conv`` Lister toutes les conversations d'un utilisateur.
```shell

```

### Bots

#### POST ``/bots`` Créer un nouveau bot
```shell
curl -X 'POST' \
  'http://localhost:3000/bots' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Bot humour",
  "brain": "english"
}'
```

#### GET ``/bots`` Lister tous les bots
```shell
curl -X 'GET' \
  'http://localhost:3000/bots' \
  -H 'accept: application/json'
```

#### DELETE ``/bots/{id}`` Supprimer un bot
```shell
curl -X 'DELETE' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7' \
  -H 'accept: */*'
```

#### PATCH ``/bots/{id}`` Changer un attribut d'un bot
```shell
curl -X 'PATCH' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Bot humour",
  "status": true
}'
```

#### GET ``/bots/{id}`` Récupérer un bot par ID
```shell
curl -X 'GET' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7' \
  -H 'accept: application/json'
```

#### PUT ``/bots/{id}/brain`` Modifier le brain (moteur conversationnel)
```shell
curl -X 'PUT' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7/brain' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "brain": "clients"
}'
```

#### GET ``/bots/{id}/conv`` Récupérer toutes les conversations d'un bot.
```shell
curl -X 'GET' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7/conv' \
  -H 'accept: application/json'
```

#### DELETE ``/bots/{id}/conv`` Supprimer toutes les conversations d'un bot
```shell
curl -X 'DELETE' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7/conv' \
  -H 'accept: */*'
```

#### GET ``/bots/{idBot}/{idUser}/conv`` Récupérer toutes les conversations d'un bot avec un utilisateur donnés.
```shell
curl -X 'GET' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7/1505842191740964865/conv' \
  -H 'accept: application/json'
```

#### DELETE ``/bots/{idBot}/{idUser}/conv`` Supprimer toutes les conversations d'un bot pour un utilisateur donné.
```shell
curl -X 'DELETE' \
  'http://localhost:3000/bots/37e94971-c2cd-4e06-92b5-ba096e44ffc7/1505842191740964865/conv' \
  -H 'accept: */*'
```