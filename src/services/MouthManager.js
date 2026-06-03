const { Client, GatewayIntentBits } = require('discord.js');

class MouthManager {
    constructor() {
        this.mouths = new Map();
    }

    startAll(tokens, onMessage) {

        Object.entries(tokens).forEach(([id, token]) => {
            if (!token) {
                console.warn(`[MOUTH ${id}] token manquant, bouche ignorée`);
                return;
            }
            
            const client = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                    GatewayIntentBits.MessageContent
                ]
            });

            client.once('ready', () => {
                console.log(`[MOUTH ${id}] ready`);
            });

            client.on('messageCreate', (message) => {
                if (message.author.bot) return;

            // Ne répondre que si ce client est mentionné (ou si personne n'est mentionné)
            const isMentioned = message.mentions.users.has(client.user.id);
            if (message.mentions.users.size > 0 && !isMentioned) return;

            onMessage(id, message);
            });

            client.login(token);

            this.mouths.set(id, client);
        });
    }

    async send(mouthId, channelId, content) {
        const client = this.mouths.get(mouthId);
        if (!client) return;

        const cached = client.channels.cache.get(channelId);
        const channel = cached || await client.channels.fetch(channelId).catch(() => null);
        if (channel) await channel.send(content).catch(() => null);
    }
}

module.exports = MouthManager;
