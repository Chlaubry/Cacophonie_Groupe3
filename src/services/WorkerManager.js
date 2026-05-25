const { Worker } = require('worker_threads');
const path = require('path');

class WorkerManager {
    constructor(botManager, mouthManager) {
        this.workers = new Map();

        this.botManager = botManager;
        this.mouthManager = mouthManager;
    }

    start(bot) {
        const workerScript = path.resolve(__dirname, '../workers/botWorker.js');

        const worker = new Worker(workerScript, {
            workerData: {
                id: bot.id,
                name: bot.name,
                brain: bot.brain,
                mouth: bot.mouth,
                channelId: bot.channelId
            }
        });

        console.log(`[WORKER START] ${bot.name}`);
        console.log("brain:", bot.brain);
        console.log("mouth:", bot.mouth);
        console.log("channel:", bot.channelId);

        worker.on('message', (data) => {
            const bot = this.botManager.getBot(data.botId);

            if (!bot) return;

            console.log("Envoi Discord...");
            console.log("mouth:", bot.mouth);
            console.log("channel:", bot.channelId);
            console.log("response:", data.response);

            this.mouthManager.send(
                bot.mouth,
                bot.channelId,
                data.response
            );
            console.log("\n=== RÉPONSE WORKER ===");
            console.log(data);
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
