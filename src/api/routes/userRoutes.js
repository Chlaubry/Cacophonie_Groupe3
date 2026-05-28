/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs 
 */

/**
 * @openapi
 * /users/{idUser}/conv:
 *   get:
 *     tags: [Users]
 *     summary: Lister toutes les conversations d'un utilisateur.
 *     description: Retourne la liste de toutes les conversations enregistrées en mémoire d'un utilisateur donné.
 *     responses:
 *       200:
 *         description: Liste des conversations de l'utilisateur donné.
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
 *                       idBot:
 *                         type: string
 *                       mouthBot:
 *                         type: string
 */


const express = require('express');
const router = express.Router();

module.exports = router;
