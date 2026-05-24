const { Worker } = require('worker_threads');

class WorkerManager {
    constructor() {
        this.workers = new Map();
    }

    start(bot) {
        const worker = new Worker('./workers/botWorker.js', {
            workerData: {
                id: bot.id,
                name: bot.name,
                brain: bot.brain,
                mouth: bot.mouth
            }
        });

        worker.on('message', (msg) => {
            console.log(`[WORKER ${bot.name}]`, msg);
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