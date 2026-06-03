const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs 
 */

/**
 * @openapi
 * /users/{idUser}/conversations:
 *   get:
 *     tags: [Users]
 *     summary: Récupérer toutes les conversations d'un utilisateur.
 *     description: Retourne les conversations d'un utilisateur spécifique.
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des conversations d'un utilisateur donné
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
 *                       botId:
 *                         type: string
 *                       mouthId:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       userMessage:
 *                         type: string
 *                       botResponse:
 *                         type: string
 *       404:
 *         description: Conversations de l'utilisateur introuvables
 */

router.get('/:idUser/conversations', userController.getAllConv);

module.exports = router;
