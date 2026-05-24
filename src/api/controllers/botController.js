const BotManager = require('../../services/BotManager');
const WorkerManager = require('../../services/WorkerManager');

const botManager = new BotManager();
const workerManager = new WorkerManager();

function createBot(req, res) {
    const { name, brain, mouth } = req.body;

    const bot = botManager.createBot({
        name,
        brain,
        mouth
    });

    res.status(201).json(bot);
}

function deleteBot(req, res) {
    const ok = botManager.deleteBot(req.params.id);

    if (!ok) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json({ message: "Bot supprimé" });
}

function startBot(req, res) {
    const bot = botManager.startBot(req.params.id, workerManager);

    if (!bot) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json(bot);
}

function stopBot(req, res) {
    const bot = botManager.stopBot(req.params.id);

    if (!bot) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json(bot);
}

function updateBrain(req, res) {
    const { brain } = req.body;

    const bot = botManager.updateBrain(req.params.id, brain);

    if (!bot) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json(bot);
}

module.exports = {
    createBot,
    deleteBot,
    startBot,
    stopBot,
    updateBrain
};