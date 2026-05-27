const fs = require('fs');

class ConfigManager {
    constructor(path) {
        this.path = path;
        this.config = this.loadConfig();
    }

    // Chargement du JSON avec les config
    loadConfig() {
        try {
            const raw = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(raw);
        } catch (err) {
            console.error("Erreur chargement config :", err);
            return {};
        }
    }

    // Lire une clé imbriquée : "app.port"
    get(key, defaultValue = null) {
        const keys = key.split('.');
        let value = this.config;

        for (const k of keys) {
            if (value && Object.prototype.hasOwnProperty.call(value, k)) {
                value = value[k];
            } else {
                return defaultValue;
            }
        }

        return value;
    }

    // Récupérer un bloc entier (app, discord, bots...)
    getSection(section) {
        return this.config[section] || {};
    }

    // Vérifier les clés obligatoires
    validateRequired(keys) {
        let ok = true;

        for (const key of keys) {
            const value = this.get(key);

            if (value === null || value === undefined) {
                console.error(`Clé manquante: ${key}`);
                ok = false;
            }
        }

        return ok;
    }

    //Affichage safe (utile debug)
    printConfig() {
        const safe = JSON.parse(JSON.stringify(this.config));

        // masquer secrets éventuels
        if (safe.discord?.token) {
            safe.discord.token = "***";
        }

        console.log(JSON.stringify(safe, null, 2));
    }
}

module.exports = ConfigManager;