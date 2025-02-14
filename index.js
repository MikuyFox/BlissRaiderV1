require('dotenv').config();
const { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const ALLOWED_USERS = ['1292651844002385953', '1067182952779362422', '1280219227869155341'];

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const commands = [
    new SlashCommandBuilder()
        .setName('raid')
        .setDescription('Send a message multiple times.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to send')
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName('enclaveraid')
        .setDescription('Launch an Enclave-themed raid (restricted to certain users).'),

    new SlashCommandBuilder()
        .setName('spam')
        .setDescription('Sends a random spam message 5 times.'),

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Refreshing application (/) commands...');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'raid') {
        const userMessage = interaction.options.getString('message');

        await interaction.reply({ content: "Credit to BlissChan! https://www.youtube.com/@BlissChanChina", ephemeral: true });

        for (let i = 0; i < 5; i++) {
            await interaction.followUp(userMessage);
            await sleep(1000);
        }
    }

    if (interaction.commandName === 'enclaveraid') {
        if (!ALLOWED_USERS.includes(interaction.user.id)) {
            return await interaction.reply({ content: "❌ You are not authorized to use this command.", ephemeral: true });
        }

        const enclaveMessage = `**THIS SERVER HAS BEEN OBLITERATED BY THE ENCLAVE**
            https://discord.gg/Qffur9ZXEw
https://media.discordapp.net/attachments/1315006480511926313/1318171822243577896/convert.gif?ex=67b074ac&is=67af232c&hm=d19ac05c851b6620833e5978568dad0404adc404b805dfdf9e6370fe801a3ad3&            https://youtube.com/@enclaveballeditz?si=YjrezIsgc-PEvhfL
            https://tenor.com/view/george-washington-dodge-dodge-challenger-dodge-ad-revolutionary-war-gif-25299019`;

        await interaction.reply({ content: "🚀 **Credit to BlissChan! https://www.youtube.com/@BlissChanChina**", ephemeral: true });

        for (let i = 0; i < 5; i++) {   
            await interaction.followUp(enclaveMessage);
            await sleep(1000);
        }
    }

    if (interaction.commandName === 'spam') {
        const spamMessages = [
            "👀 Why are you looking at this?",
            "💀 Bruh moment.",
            "🔥 This server is on fire! 🔥",
            "😂 LOL",
            "🚀 To the moon!"
        ];

        await interaction.reply({ content: "Spamming started!", ephemeral: true });

        for (let i = 0; i < 5; i++) { // Max 5 messages
            const randomMessage = spamMessages[Math.floor(Math.random() * spamMessages.length)];
            await interaction.followUp(randomMessage);
            await sleep(1000);
        }
    }

});

client.login(TOKEN);
