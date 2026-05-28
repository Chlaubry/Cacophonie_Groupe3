const dotenv = require('dotenv');
const path = require('path');

// Charge en priorité un .env à la racine, puis complète avec src/.env si présent.
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env'), override: false });

const app = require('./api/app');

const BotManager = require('./services/BotManager');
const WorkerManager = require('./services/WorkerManager');
const MouthManager = require('./services/MouthManager');

const botManager = new BotManager();
const mouthManager = new MouthManager();
const workerManager = new WorkerManager(botManager, mouthManager);

app.locals.botManager = botManager;
app.locals.workerManager = workerManager;
app.locals.mouthManager = mouthManager;

// Demarrer API
app.listen(3000, () => {
    console.log("API Cacophonie running");
})
mouthManager.startAll({
    "2526_INFO2_Caco_group3_bot1": process.env.BOT_TOKEN1,
    "2526_INFO2_Caco_group3_bot2": process.env.BOT_TOKEN2,
    "2526_INFO2_Caco_group3_bot3": process.env.BOT_TOKEN3

}, (mouthId, message) => {

    console.log(`[MESSAGE ${mouthId}]`, message.content);

    console.log("\n=== MESSAGE DISCORD REÇU ===");
    console.log("mouthId:", mouthId);
    console.log("author:", message.author.username);
    console.log("content:", message.content);
    console.log("channel:", message.channel.id);

    // 1. Filtrage bots
    const candidates = botManager.listBots()
        .filter(b =>
            b.mouth === mouthId &&
            b.status === "running" &&
            b.channelId === message.channel.id
        );

    if (candidates.length === 0) return;

    // choix bot
    const bot = candidates[0];

    if (!bot) return;

    //  nettoyage message
    const mentionRegex = new RegExp(`<@!?${message.client.user.id}>`, 'g');
    const cleaned = message.content.replace(mentionRegex, '').trim();
    

    if (!cleaned) return;

    // démarrage worker si besoin
    if (!bot.worker) {
        botManager.startBot(bot.id, workerManager);
    }

    // envoi worker
    bot.worker.postMessage({
        text: cleaned,
        user: message.author.id
    });
});