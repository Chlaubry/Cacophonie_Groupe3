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
 *                 example: "rivescript"
 *               mouth:
 *                 type: string
 *                 example: "discord"
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
 *                 example: "rivescript"
 *     responses:
 *       200:
 *         description: Brain mis à jour
 *       404:
 *         description: Bot introuvable
 */

const express = require('express');
const router = express.Router();

const botController = require('../controllers/botController');

router.post('/', botController.createBot);
router.delete('/:id', botController.deleteBot);
router.post('/:id/start', botController.startBot);
router.post('/:id/stop', botController.stopBot);
router.put('/:id/brain', botController.updateBrain);

module.exports = router;