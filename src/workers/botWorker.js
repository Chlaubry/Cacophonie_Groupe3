const { parentPort, workerData } = require('worker_threads');
const RiveScript = require('rivescript');
const fs = require('fs');
const path = require('path');

const bot = new RiveScript();
bot.setSubstitution("bot name", workerData.name);
let isReady = false;
const pending = [];

function loadBrain(brainName) {
    const brainDir = path.resolve(__dirname, '../../bootstrapCodeForRivescriptChatBot/brain');
    const beginPath = path.join(brainDir, 'begin.rive');
    const brainPath = path.join(brainDir, `${brainName}.rive`);

    if (!fs.existsSync(brainPath)) {
        throw new Error(`Brain introuvable: ${brainName}`);
    }

    const filesToLoad = fs.existsSync(beginPath) && brainName !== 'begin'
        ? [beginPath, brainPath]
        : [brainPath];

    bot.loadFile(filesToLoad).then(() => {
        bot.sortReplies();
        isReady = true;
        console.log(`[BOT ${workerData.id}] Brain chargé: ${brainName}`);
        while (pending.length) {
            parentPort.emit('message', pending.shift());
        }
    }).catch(console.error);
}

// charger le brain du bot
loadBrain(workerData.brain);

function respond(username, message) {
    return bot.reply(username, message);
}

parentPort.on('message', async (msg) => {
    console.log("\n=== MESSAGE REÇU PAR WORKER ===");
    console.log(msg);

    if (!isReady) {
        pending.push(msg);
        return;
    }

    let text = typeof msg === 'string' ? msg : msg?.text;
    const username =
        typeof msg === 'object' && msg?.user
            ? String(msg.user)
            : "user";

    const userId =
        typeof msg === 'object' && msg?.userId
            ? String(msg.userId)
            : "unknown";

    if (!text || !text.trim()) return;

    text = text
        .replace(/<@!?&?\d+>/g, '') // users + roles
        .trim();

    if (!text) return;

    console.log("Texte nettoyé:", text);

    const response = await respond(username, text);

    console.log(" Réponse RiveScript:", response);

    parentPort.postMessage({
        botId: workerData.id,
        userId:      username,    
        userMessage: text,        
        response
    });
});