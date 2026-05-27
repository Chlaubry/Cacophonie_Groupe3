
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

function startBot(req, res) {

    const botManager = req.app.locals.botManager;
    const workerManager = req.app.locals.workerManager;

    const bot = botManager.startBot(req.params.id, workerManager);

    if (!bot) {
        return res.status(404).json({ error: "Bot introuvable" });
    }

    res.json(bot);
}

function stopBot(req, res) {

    const botManager = req.app.locals.botManager;
    const workerManager = req.app.locals.workerManager;

    const bot = botManager.stopBot(req.params.id, workerManager);

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

function getAllConv(req, res) {
  const { id } = req.params;
  const logManager = req.app.locals.logManager;   // ← utiliser logManager
  const logs = logManager.getAll(id);
  res.json({ count: logs.length, conversations: logs });
}

function getAllConvByUser(req, res) {
  const { idBot, idUser } = req.params;
  const logManager = req.app.locals.logManager;
  const logs = logManager.getByUser(idBot, idUser);
  res.json({ count: logs.length, conversations: logs });
}

function deleteAllConv(req, res) {
  const { id } = req.params;
  const botManager = req.app.locals.botManager;
  if (!botManager.getBot(id)) return res.status(404).json({ error: "Bot introuvable" });
  const logManager = req.app.locals.logManager;
  logManager.deleteAll(id);
  res.json({ message: "Conversations supprimées" });
}

function deleteAllConvByUser(req, res) {
  const { idBot, idUser } = req.params;
  const botManager = req.app.locals.botManager;
  if (!botManager.getBot(idBot)) return res.status(404).json({ error: "Bot introuvable" });
  const logManager = req.app.locals.logManager;
  logManager.deleteByUser(idBot, idUser);
  res.json({ message: "Conversations supprimées pour l'utilisateur" });
}

module.exports = {
    createBot,
    deleteBot,
    startBot,
    stopBot,
    updateBrain,
    getBot,
    listBots,
    getAllConv,
    getAllConvByUser,
    deleteAllConv,
    deleteAllConvByUser
};