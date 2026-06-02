const fs = require('fs');
const path = require('path');


class LogManager {
    /**
     * @param {string} [logDir] - 
     *        
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

    getByUser(botId, userId) {
        return this.getAll(botId)
            .filter(entry => entry.userId === userId);
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
    fs.writeFileSync(filePath,JSON.stringify(remaining, null, 2),'utf-8');
}


    _filePath(botId) {
        return path.join(this.logDir, `bot_${botId}.json`);
    }
}

module.exports = LogManager;
