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

### Bots

#### POST ``/bots`` Créer un nouveau bot

#### GET ``/bots`` Lister tous les bots

#### DELETE ``/bots/{id}```Supprimer un bot

#### PATCH ``/bots/{id}`` Changer un attribut d'un bot

#### GET ``/bots/{id}`` Récupérer un bot par ID

#### PUT ``/bots/{id}/brain`` Modifier le brain (moteur conversationnel)

#### DELETE ``/bots/{id}/conv`` Supprimer toutes les conversations d'un bot