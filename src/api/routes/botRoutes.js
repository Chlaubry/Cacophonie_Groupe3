const express = require('express');
const router = express.Router();

const botController = require('../controllers/botController');

/**
 * @openapi
 * tags:
 *   name: Bots
 *   description: Gestion du cycle de vie des bots (Cacophonie)
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
 *                 example: "Bot humour"
 *               brain:
 *                 type: string
 *                 description: Nom du fichier RiveScript (sans .rive) dans brains/rivescript
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
 *     summary: Supprimer un bot
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
 *     summary: Changer un attribut d'un bot
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
 *                 example: "Bot humour"
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
 *     summary: Modifier le brain (moteur conversationnel)
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
 * /bots/{id}:
 *   get:
 *     tags: [Bots]
 *     summary: Récupérer un bot par ID
 *     description: Retourne les informations d'un bot spécifique.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du bot
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bot trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 brain:
 *                   type: string
 *                 mouth:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: running
 *       404:
 *         description: Bot introuvable
 */
router.get('/:id/get', botController.getBot);

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
 *                       name:
 *                         type: string
 *                       brain:
 *                         type: string
 *                       mouth:
 *                         type: string
 *                       status:
 *                         type: string
 *                         example: running
 */
router.get('/', botController.listBots);

/**
 * @openapi
 * /bots/{id}/conversations:
 *   get:
 *     tags: [Bots]
 *     summary: Lister toutes les conversations du bot en fonction si on le souhaite de l'id de l'utilisateur, de la date, etc.
 *     description: Retourne la liste de toutes les conversations enregistrées en mémoire du bot donné.
 *     responses:
 *       200:
 *         description: Liste des conversations
 *         parameters:
 *              - in: query
 *                name: user 
 *                schema:
 *                  type: string
 *              description: Le pseudo de l'utilisateur
 *              - in: query
 *                name: datae 
 *                schema:
 *                  type: string
 *              description: La date 
 *        
 *          content:
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
 *                       idBot:
 *                         type: string
 *                       mouthBot:
 *                         type: string
 */

/**
 * @openapi
 * /bots/{id}/conversations:
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

/**
 * @openapi
 * /bots/{idBot}/{idUser}/conversations:
 *   get:
 *     tags: [Bots]
 *     summary: Récupérer toutes les conversations d'un bot avec un utilisateur donnés.
 *     description: Retourne les conversations d'un bot avec un utilisateur spécifiques.
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

/**
 * @openapi
 * /bots/{id}/conversations:
 *   delete:
 *     tags: [Bots]
 *     summary: Supprimer toutes les conversations d'un bot, éventuellement uniquement avec un utilisateur donné
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUser:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bot supprimé
 *       404:
 *         description: Bot introuvable
 */


router.post('/', botController.createBot);
router.get('/list', botController.listBots);
router.delete('/:id', botController.deleteBot);
// router.patch('/:id/', botController.patchBot);
router.get('/:id/', botController.getBot);
router.put('/:id/brain', botController.updateBrain);

//route pour les logs
router.get('/:id/conversations', botController.getAllConv);
router.delete('/:id/conversations', botController.deleteAllConv);
router.get('/:idBot/:idUser/conversations', botController.getAllConvByUser);

module.exports = router;
