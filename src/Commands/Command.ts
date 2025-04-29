import { SlashCommandBuilder } from "npm:@discordjs/builders";
import type { ChatInputCommandInteraction } from "npm:discord.js";

interface SubCommandInterface {
  name: string;
  description: string;
  run: (
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
  configureOptions: (
    commandBuilder: SlashCommandBuilder,
  ) => Promise<void> | void;
  permissions?: bigint;
}

export default class Command {
  public readonly name: string;
  private readonly description: string;
  public readonly run: (
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
  private readonly configureOptions: (
    commandBuilder: SlashCommandBuilder,
  ) => Promise<void> | void;
  private readonly permissions?: bigint;

  constructor(config: SubCommandInterface) {
    this.name = config.name;
    this.description = config.description;
    this.run = config.run;
    this.configureOptions = config.configureOptions;
    this.permissions = config.permissions;
  }

  async build(): Promise<SlashCommandBuilder> {
    const commandBuilder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);

    if (this.permissions) {
      commandBuilder.setDefaultMemberPermissions(this.permissions);
    }
    await this.configureOptions(commandBuilder);
    return commandBuilder;
  }
}
