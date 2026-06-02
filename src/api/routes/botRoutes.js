const express = require('express');
const router = express.Router();

const botController = require('../controllers/botController');

/**
 * @openapi
 * tags:
 *   name: Bots
 *   description: Gestion du cycle de vie des bots
 */

/**
 * @openapi
 * /bots:
 *   post:
 *     tags: [Bots]
 *     summary: Créer un nouveau bot
 *     description: Instancie un bot avec un brain et une mouth par défaut ou fournis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouveau Bot"
 *               brain:
 *                 type: string
 *                 description: Nom du fichier RiveScript (sans .rive) dans brains/rivescript qui correspond au cerveau associé au bot. 
 *                 example: "english"
 *     responses:
 *       201:
 *         description: Bot créé avec succès
 */
router.post('/', botController.createBot);

/**
 * @openapi
 * /bots/{id}:
 *   delete:
 *     tags: [Bots]
 *     summary: Supprimer un bot selon son id 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bot supprimé
 *       404:
 *         description: Bot introuvable
 */
router.delete('/:id', botController.deleteBot);

/**
 * @openapi
 * /bots/{id}:
 *   patch:
 *     tags: [Bots]
 *     summary: Changer un attribut (son status ou son nom) d'un bot selon son id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nom du bot changé"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Bot modifié
 *       404:
 *         description: Bot introuvable
 */
router.patch('/:id', botController.updateBot);

/**
 * @openapi
 * /bots/{id}/brain:
 *   put:
 *     tags: [Bots]
 *     summary: Modifier le brain du bot selon son id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brain
 *             properties:
 *               brain:
 *                 type: string
 *                 description: Nom du fichier RiveScript (sans .rive) dans brains/rivescript
 *                 example: "clients"
 *     responses:
 *       200:
 *         description: Brain mis à jour
 *       404:
 *         description: Bot introuvable
 */
router.put('/:id/brain', botController.updateBrain);

/**
 * @openapi
 * /bots:
 *   get:
 *     tags: [Bots]
 *     summary: Lister tous les bots
 *     description: Retourne la liste de tous les bots enregistrés en mémoire.
 *     responses:
 *       200:
 *         description: Liste des bots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 bots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: ee4e37f4-eeb6-4725-8128-d5b960d338ef
 *                       name:
 *                         type: string
 *                         example: NomduBot
 *                       brain:
 *                         type: string
 *                         example: english
 *                       mouth:
 *                         type: string
 *                         example: 2526_INFO2_Caco_group3_bot1
 *                       channelId:
 *                         type: string
 *                         example: 1505842191740964865
 *                       status:
 *                         type: boolean
 *                         example: false
 */

router.get('/', botController.listBots);


/**
 * @openapi
 * /bots/{id}/conv:
 *   get:
 *     tags: [Bots]
 *     summary: Récupérer toutes les conversations d'un bot.
 *     description: Retourne les conversations d'un bot spécifique.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du bot
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des conversations du bot donné
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 conversations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       mouthId:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       userMessage:
 *                         type: string
 *                       notResponse:
 *                         type: string
 *       404:
 *         description: Conversations du bot introuvables
 */
router.get('/:id/conv', botController.getAllConv);

/**
 * @openapi
 * /bots/{id}/conv:
 *   delete:
 *     tags: [Bots]
 *     summary: Supprimer toutes les conversations d'un bot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversations du bot supprimés
 *       404:
 *         description: Bot introuvable
 */
router.delete('/:id/conv', botController.deleteAllConv);

/**
 * @openapi
 * /bots/{idBot}/{idUser}/conv:
 *   get:
 *     tags: [Bots]
 *     summary: Récupérer toutes les conversations d'un bot avec un utilisateur donné.
 *     description: Retourne les conversations d'un bot avec un utilisateur spécifique.
 *     parameters:
 *       - in: path
 *         name: idBot
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des conversations entre le bot et l'utilisateur donnés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 conversations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                       mouthId:
 *                         type: string
 *                       userMessage:
 *                         type: string
 *                       notResponse:
 *                         type: string
 *       404:
 *         description: Conversations du bot introuvables
 */
router.get('/:idBot/:idUser/conv', botController.getAllConvByUser);

/**
 * @openapi
 * /bots/{idBot}/{idUser}/conv:
 *   delete:
 *     tags: [Bots]
 *     summary: Supprimer toutes les conversations d'un bot avec un utilisateur donné.
 *     parameters:
 *       - in: path
 *         name: idBot
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversations supprimées du bot et de l'utilisateur choisis
 *       404:
 *         description: Bot introuvable
 */
router.delete('/:idBot/:idUser/conv', botController.deleteAllConvByUser);

module.exports = router;
