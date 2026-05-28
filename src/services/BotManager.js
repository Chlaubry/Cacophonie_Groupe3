require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

class BotManager {
    constructor() {
        // stockage en mémoire des bots
        this.bots = new Map();
    }

    createBot({ name, brain, channelId }) {
        const id = uuidv4();

        const availableMouth = this.getAvailableMouth();

        const bot = {
            id,
            name,
            brain: brain || "english",
            mouth: availableMouth,
            channelId: channelId || process.env.CHANNEL_ID,
            status: false
        };

        this.bots.set(id, bot);
        return bot;
    }   

    getAvailableMouth() {
        const mouths = ["2526_INFO2_Caco_group3_bot1", "2526_INFO2_Caco_group3_bot2", "2526_INFO2_Caco_group1_bot3"];

        const index = this.bots.size % mouths.length;

        return mouths[index];
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

        if (bot.worker) {
            bot.worker.terminate();
            bot.worker = null;
        }

        // Si le bot tournait, il n'a plus de worker actif.
        if (bot.status) {
            bot.status = false;
        }

        return bot;
    }

    updateMouth(id, mouth) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        bot.mouth = mouth;

        if (bot.worker) {
            bot.worker.terminate();
            bot.worker = null;
        }

        if (bot.status) {
            bot.status = false;
        }

        return bot;
    }

    updateBot(id, workerManager, name, status) {
        const bot = this.bots.get(id);

        console.log("Updating bot", { id, name, status });

        if (status && status !== bot.status) {
            if (status) {
                this.startBot(id, workerManager);
            } else {
                this.stopBot(id, workerManager);
            }
        }
        if (name) {
            bot.name = name;
        }
        return bot;
    }

    startBot(id, workerManager) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        if (bot.status && bot.worker) return bot;

        bot.status = true;

        // création worker
        bot.worker = workerManager.start(bot);

        return bot;
    }
    
    stopBot(id, workerManager) {
        const bot = this.bots.get(id);
        if (!bot) return null;

        if (workerManager) {
            workerManager.stop(id);
        } else if (bot.worker) {
            bot.worker.terminate();
        }
        bot.worker = null;
        bot.status = false;

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
