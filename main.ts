import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  type Interaction,
  Partials,
} from "npm:discord.js";
import {
  botToken,
  delayToRoll,
  guildId,
  presences,
} from "./src/Constants/Environment.ts";
import CommandRegistry from "./src/CommandRegistry.ts";
import ArrayHelper from "./src/Helper/ArrayHelper.ts";
import AudioHelper from "./src/Helper/AudioHelper.ts";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.GuildMember],
});

const commands = await CommandRegistry.getAllCommands();

const updatePresence = () =>
  client.user?.setPresence({
    activities: [
      {
        name: ArrayHelper.getRandomElement(presences),
        type: ActivityType.Custom,
      },
    ],
    status: "online",
  });

client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
  updatePresence();
  setInterval(updatePresence, 60 * 1000);

  const guild = client.guilds.cache.get(guildId);
  if (guild === undefined) {
    throw new Error("Guild not found");
  }
  AudioHelper.playSoundToRandomChannel(guild);
  setInterval(
    () => AudioHelper.playSoundToRandomChannel(guild),
    delayToRoll * 1000,
  );

  console.log("Startup done");
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (
    !interaction.isChatInputCommand()
  ) {
    return;
  }

  for (const command of commands) {
    if (command.name === interaction.commandName) {
      await command.run(interaction);
      return;
    }
  }

  await interaction.reply("no, f u 🖕");
});

client.login(botToken);
