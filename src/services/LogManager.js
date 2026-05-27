const fs = require('fs');
const path = require('path');

/**
 * LogManager — écrit chaque échange bot/user dans un fichier JSON dédié.
 * Chemin : logs/bot_<botId>.json  (créé automatiquement s'il n'existe pas)
 *
 * Format d'une entrée :
 * {
 *   "timestamp"   : "2026-05-27T14:32:11.045Z",   // date exacte ISO 8601
 *   "botId"       : "uuid-du-bot",
 *   "mouthId"     : "2526_INFO2_Caco_group3_bot1", // identifiant Discord bot
 *   "userId"      : "123456789012345678",           // snowflake Discord de l'utilisateur
 *   "userMessage" : "hello",                        // message envoyé par l'utilisateur
 *   "botResponse" : "Hi there! How are you?"        // réponse du bot
 * }
 */
class LogManager {
    /**
     * @param {string} [logDir] - répertoire de stockage des logs.
     *        Par défaut : <racine du projet>/logs
     */
    constructor(logDir = path.resolve(__dirname, '../../logs')) {
        this.logDir = logDir;

        // Crée le dossier s'il n'existe pas encore
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Ajoute une entrée dans le fichier log du bot concerné.
     *
     * @param {Object} params
     * @param {string} params.botId       - UUID du bot
     * @param {string} params.mouthId     - identifiant de la bouche Discord
     * @param {string} params.userId      - snowflake Discord de l'utilisateur
     * @param {string} params.userMessage - texte envoyé par l'utilisateur
     * @param {string} params.botResponse - réponse générée par le bot
     */
    log({ botId, mouthId, userId, userMessage, botResponse }) {
        const entry = {
            timestamp:   new Date().toISOString(),
            botId,
            mouthId,
            userId,
            userMessage,
            botResponse
        };

        const filePath = this._filePath(botId);

        // Lecture du fichier existant (tableau JSON) ou démarrage d'un nouveau
        let logs = [];
        if (fs.existsSync(filePath)) {
            try {
                const raw = fs.readFileSync(filePath, 'utf-8');
                logs = JSON.parse(raw);
                if (!Array.isArray(logs)) logs = [];
            } catch {
                logs = [];
            }
        }

        logs.push(entry);
        fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf-8');

        console.log(`[LOG] Échange enregistré pour bot ${botId} (user ${userId})`);
    }

    /**
     * Retourne toutes les entrées loggées pour un bot donné.
     *
     * @param {string} botId
     * @returns {Array}
     */
    getAll(botId) {
        const filePath = this._filePath(botId);
        if (!fs.existsSync(filePath)) return [];

        try {
            const raw = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    /**
     * Retourne uniquement les entrées loggées pour un bot ET un utilisateur donnés.
     *
     * @param {string} botId
     * @param {string} userId
     * @returns {Array}
     */
    getByUser(botId, userId) {
        return this.getAll(botId).filter(entry => entry.userId === userId);
    }

    /**
     * Supprime toutes les entrées d'un bot (remet le fichier à []).
     *
     * @param {string} botId
     */
    deleteAll(botId) {
        const filePath = this._filePath(botId);
        fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
    }

    /**
     * Supprime toutes les entrées d'un bot pour un utilisateur donné.
     *
     * @param {string} botId
     * @param {string} userId
     */
    deleteByUser(botId, userId) {
        const remaining = this.getAll(botId).filter(entry => entry.userId !== userId);
        const filePath = this._filePath(botId);
        fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2), 'utf-8');
    }

    // --- Utilitaire privé ---

    _filePath(botId) {
        return path.join(this.logDir, `bot_${botId}.json`);
    }
}

module.exports = LogManager;
