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

/**
 * @openapi
 * /bots/{id}/start:
 *   post:
 *     tags: [Bots]
 *     summary: Démarrer un bot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bot démarré
 *       404:
 *         description: Bot introuvable
 */

/**
 * @openapi
 * /bots/{id}/stop:
 *   post:
 *     tags: [Bots]
 *     summary: Arrêter un bot
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bot arrêté
 *       404:
 *         description: Bot introuvable
 */

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
/**
 * @openapi
 * /bots/{id}/get:
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

/**
 * @openapi
 * /bots/list:
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

const express = require('express');
const router = express.Router();

const botController = require('../controllers/botController');

router.post('/', botController.createBot);
router.delete('/:id', botController.deleteBot);
router.post('/:id/start', botController.startBot);
router.post('/:id/stop', botController.stopBot);
router.put('/:id/brain', botController.updateBrain);
router.get('/:id/get', botController.getBot);
router.get('/list', botController.listBots);

module.exports = router;
