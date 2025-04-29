import { ChatInputCommandInteraction } from "discord.js";
import Command from "./Command.ts";
import AudioHelper from "../Helper/AudioHelper.ts";

export default new Command({
  name: "summon",
  description: "Get in voice and you'll know.",
  configureOptions: () => {},
  run: async (interaction: ChatInputCommandInteraction): Promise<void> => {
    if (!interaction.inGuild()) return;
    // console.log(interaction.member.is)
    const member = await interaction.guild?.members.fetch(interaction.user.id);
    console.log(member);
    if (!member) return;
    console.log(member.voice);
    const channel = member.voice.channel;
    if (channel === null) {
      await interaction.reply({
        content: "I told you to try this while in voice (╯°□°)╯︵ ┻━┻",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: "I am coming to you 👁👄👁",
      ephemeral: true,
    });

    AudioHelper.playRandomSoundToChannel(channel);
  },
});
