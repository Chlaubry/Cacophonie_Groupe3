require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

const token = process.env.BOT_TOKEN2;
const salon_id = process.env.CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    const channel = await client.channels.fetch(salon_id);

    if (channel) {
        await channel.send('Bot is ready!');
    }
});

client.on('messageCreate', async (message) => {

    if (message.channel.id !== salon_id) return;
    if (message.author.bot) return;

    console.log("Je viens de lire un message");

    await message.channel.send(message.content);
});

client.login(token);