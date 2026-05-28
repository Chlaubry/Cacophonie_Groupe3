
function createBot(req, res) {
    const { name, brain } = req.body;

    const botManager = req.app.locals.botManager;

    const bot = botManager.createBot({
        name,
        brain
    });

    res.status(201).json(bot);
}

function deleteBot(req, res) {

    const botManager = req.app.locals.botManager;

    const ok = botManager.deleteBot(req.params.id);

    if (!ok) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json({ message: "Bot supprimé" });
}

function updateBot(req, res) {
    const id = req.params.id;
    const { name, status } = req.body;

    console.log("Updating bot", id, name, status);

    const botManager = req.app.locals.botManager;
    const workerManager = req.app.locals.workerManager;

    const bot = botManager.updateBot(id, workerManager, name, status);

    if (!bot) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json(bot);
}

function updateBrain(req, res) {

    const { brain } = req.body;

    const botManager = req.app.locals.botManager;
    const workerManager = req.app.locals.workerManager;

    const existing = botManager.getBot(req.params.id);
    const wasRunning = !!existing && existing.status === "running";

    const bot = botManager.updateBrain(req.params.id, brain);

    if (!bot) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    if (wasRunning) {
        botManager.startBot(bot.id, workerManager);
    }

    res.json(bot);
}


function getBot(req, res) {

    const { id } = req.params;

    const botManager = req.app.locals.botManager;

    const bot = botManager.getBot(id);

    if (!bot) {
        return res.status(404).json({
            error: "Bot introuvable"
        });
    }

    res.json(bot);
}

function listBots(req, res) {

    const botManager = req.app.locals.botManager;

    const bots = botManager.listBots();

    res.json(bots);
}


module.exports = {
    createBot,
    deleteBot,
    updateBot,
    updateBrain,
    getBot,
    listBots
};
