const { Worker } = require('worker_threads');
const path = require('path');

class WorkerManager {
    /**
     * @param {import('./BotManager')}  botManager
     * @param {import('./MouthManager')} mouthManager
     * @param {import('./LogManager')}  logManager   - optionnel ; si absent, pas de logging
     */
    constructor(botManager, mouthManager, logManager = null) {
        this.workers      = new Map();
        this.botManager   = botManager;
        this.mouthManager = mouthManager;
        this.logManager   = logManager;
    }

    start(bot) {
        const workerScript = path.resolve(__dirname, '../workers/botWorker.js');

        const worker = new Worker(workerScript, {
            workerData: {
                id:        bot.id,
                name:      bot.name,
                brain:     bot.brain,
                mouth:     bot.mouth,
                channelId: bot.channelId
            }
        });

        console.log(`[WORKER START] ${bot.name}`);
        console.log("brain:",   bot.brain);
        console.log("mouth:",   bot.mouth);
        console.log("channel:", bot.channelId);

        worker.on('message', (data) => {
            const currentBot = this.botManager.getBot(data.botId);
            if (!currentBot) return;

            console.log("\n=== RÉPONSE WORKER ===");
            console.log("mouth:",    currentBot.mouth);
            console.log("channel:",  currentBot.channelId);
            console.log("userId:",   data.userId);
            console.log("message:",  data.userMessage);
            console.log("response:", data.response);

                        // Logging JSON de l'échange
            if (this.logManager) {
                this.logManager.log({
                    botId:       data.botId,
                    mouthId:     currentBot.mouth,
                    userId:      data.userId,
                    userMessage: data.userMessage,
                    botResponse: data.response
                });
            }
            // Envoi de la réponse sur Discord
            this.mouthManager.send(
                currentBot.mouth,
                currentBot.channelId,
                data.response
            );


        });

        worker.on('error', (err) => {
            console.error(`[WORKER ERROR ${bot.name}]`, err);
        });

        worker.on('exit', (code) => {
            console.log(`[WORKER EXIT ${bot.name}] code: ${code}`);
            this.workers.delete(bot.id);
        });

        this.workers.set(bot.id, worker);

        return worker;
    }

    stop(botId) {
        const worker = this.workers.get(botId);
        if (!worker) return false;

        worker.terminate();
        this.workers.delete(botId);
        return true;
    }

    list() {
        return Array.from(this.workers.keys());
    }

    get(botId) {
        return this.workers.get(botId);
    }

    stopAll() {
        for (const worker of this.workers.values()) {
            worker.terminate();
        }
        this.workers.clear();
    }
}

module.exports = WorkerManager;
