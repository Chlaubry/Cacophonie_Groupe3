const { v4: uuidv4 } = require('uuid');

class BotManager {
    constructor() {
        // stockage en mémoire des bots
        this.bots = new Map();
    }

    createBot({ name, brain = "rivescript", mouth = "discord" }) {
        const id = uuidv4();

        const bot = {
            id,
            name,
            brain,
            mouth,
            status: "stopped",
            worker: null,
            createdAt: new Date()
        };

        this.bots.set(id, bot);
        return bot;
    }

    getBot(id) {
        return this.bots.get(id);
    }

    listBots() {
        return Array.from(this.bots.values());
    }

    updateBrain(id, brain) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        bot.brain = brain;
        return bot;
    }

    updateMouth(id, mouth) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        bot.mouth = mouth;
        return bot;
    }

    startBot(id, workerManager) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        if (bot.status === "running") return bot;

        bot.status = "running";

        // création worker
        bot.worker = workerManager.start(bot);

        return bot;
    }
    stopBot(id) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        workerManager.stop(id);
        bot.worker = null;
        bot.status = "stopped";

        return bot;
    }

    deleteBot(id) {
        const bot = this.bots.get(id);
        if (!bot) return false;

        if (bot.worker) {
            bot.worker.terminate();
        }

        return this.bots.delete(id);
    }
}

module.exports = BotManager;