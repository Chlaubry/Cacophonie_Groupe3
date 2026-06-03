const dotenv = require('dotenv');
const path   = require('path');


// Charge en priorité un .env à la racine, puis complète avec src/.env si prése
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env'), override: false });

const app = require('./api/app');

const BotManager    = require('./services/BotManager');
const WorkerManager = require('./services/WorkerManager');
const MouthManager  = require('./services/MouthManager');
const LogManager    = require('./services/LogManager');

const botManager    = new BotManager();
const mouthManager  = new MouthManager();
const logManager    = new LogManager(); 
const workerManager = new WorkerManager(botManager, mouthManager, logManager);


app.locals.botManager    = botManager;
app.locals.workerManager = workerManager;
app.locals.mouthManager  = mouthManager;
app.locals.logManager    = logManager;

// Démarrage API REST
app.listen(3000, () => {
    console.log("API Cacophonie running on port 3000");
});


mouthManager.startAll({
    "2526_INFO2_Caco_group3_bot1": process.env.BOT_TOKEN1,
    "2526_INFO2_Caco_group3_bot2": process.env.BOT_TOKEN2,
    "2526_INFO2_Caco_group3_bot3": process.env.BOT_TOKEN3

}, (mouthId, message) => {

    console.log("\n=== MESSAGE DISCORD REÇU ===");
    console.log("mouthId:", mouthId);
    console.log("author:",  message.author.username);
    console.log("userId:",  message.author.id);
    console.log("content:", message.content);
    console.log("channel:", message.channel.id);

    const candidates = botManager.listBots()
        .filter(b =>
            b.mouth === mouthId &&
            b.status === true &&
            b.channelId === message.channel.id
        );

    if (candidates.length === 0) return;
    // choix bot
    const bot = candidates[0];
    if (!bot) return;

    // Nettoyage message
    const mentionRegex = /<@[!&]?\d+>/g;
    const cleaned = message.content.replace(mentionRegex, '').trim();

    if (!cleaned) return;

    // Démarre le worker si besoin
    if (!bot.worker) {
        botManager.startBot(bot.id, workerManager);
    }

    const worker = workerManager.get(bot.id);  
    if (!worker) {
        console.log("Pas de worker trouvé pour", bot.id);
        return;
    }

    const lastConv = logManager.getLastConversationDate(
    bot.id,
    message.author.id
);

    worker.postMessage({
        botId: bot.id,
        text: cleaned,
        userId: message.author.id,
        lastConversationDate: lastConv
    });
});

