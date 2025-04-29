import { REST } from "npm:@discordjs/rest";
import { Routes } from "npm:discord-api-types/v10";
import { botToken, clientId, guildId } from "./src/Constants/Environment.ts";
import CommandRegistry from "./src/CommandRegistry.ts";

const commandData = [];

const commands = await CommandRegistry.getAllCommands();
for (const command of commands) {
  commandData.push(command.build());
}

const rest = new REST().setToken(botToken);
const data = await Promise.all(commandData);
rest.put(Routes.applicationGuildCommands(clientId, guildId), {
  body: data.map((command) => command.toJSON()),
});
