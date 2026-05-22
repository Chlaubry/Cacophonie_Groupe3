require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Remplacez par votre token de bot Discord
const TOKEN = process.env.BOT_TOKEN1;
//const TOKEN = 'MTUwMTUyODUyNzc0NzY3ODI3OA.GmaY4q.Nyr-D2F9N3gTO3rgP8p2ErQuGX9Nnc7tHHJON4';

// Remplacez par l'ID de votre canal Discord
const CHANNEL_ID = process.env.CHANNEL_ID;
//const CHANNEL_ID = '1501529121241567252';

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', () => {
    console.log('Bot connecté et prêt !');

    // Récupérer le canal par son ID
    const channel = client.channels.cache.get(CHANNEL_ID);

    if (channel) {
        // Envoyer le message
        channel.send('Hello, world! Ceci est un message de test.')
            .then(() => {
                console.log('Message envoyé avec succès !');
                client.destroy(); // Déconnecter le bot après l'envoi
            })
            .catch(console.error);
    } else {
        console.error('Canal non trouvé. Vérifiez l\'ID du canal.');
        client.destroy();
    }
});

client.login(TOKEN);