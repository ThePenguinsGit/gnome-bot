import * as path from "jsr:@std/path";
import {
  AudioPlayerStatus,
  AudioResource,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
  StreamType,
  VoiceConnection,
} from "npm:@discordjs/voice";
import { Guild, VoiceBasedChannel, VoiceChannel } from "discord.js";
import ArrayHelper from "./ArrayHelper.ts";
import { createReadStream } from "node:fs";
import {
  publicVoiceChance,
  staffVoiceChance,
  staffVoiceChannelId,
} from "../Constants/Environment.ts";
import MathHelper from "./MathHelper.ts";

export default class AudioHelper {
  static #SONGS_DIRECTORY: string = path.join(".", "assets", "audio");

  static playSoundToRandomChannel(guild: Guild): void {
    const randomDraw = MathHelper.getRandomInteger(1, publicVoiceChance);
    const staffCutoff = publicVoiceChance / staffVoiceChance;
    if (randomDraw <= staffCutoff) {
      const staffVoice = guild.channels.cache.get(staffVoiceChannelId) as VoiceBasedChannel
      if (staffVoice.members.filter((member) => !member.user.bot).size === 0) return
      this.playRandomSoundToChannel(
          staffVoice,
      );
      return;
    }
    if (randomDraw !== publicVoiceChance) return;
    const voiceChannels = guild.channels.cache
      .filter((channel): channel is VoiceChannel => channel.isVoiceBased())
      .filter((channel) => channel.id !== staffVoiceChannelId)
      .filter((channel) => channel.members.filter((member) => !member.user.bot).size > 0);
    if (voiceChannels.size === 0) return;
    const voiceChannel = ArrayHelper.getRandomElement([
      ...voiceChannels.values(),
    ]);
    this.playRandomSoundToChannel(voiceChannel);
  }

  static playRandomSoundToChannel(channel: VoiceBasedChannel): void {
    if (getVoiceConnection(channel.guild.id) !== undefined) return;

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      debug: true,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    this.#addAudioPlayer(connection);
  }

  static #addAudioPlayer(connection: VoiceConnection): void {
    const songs: string[] = [];
    for (const file of Deno.readDirSync(AudioHelper.#SONGS_DIRECTORY)) {
      songs.push(path.join(AudioHelper.#SONGS_DIRECTORY, file.name));
    }
    const player = createAudioPlayer();

    connection.subscribe(player);

    player.play(this.#getRandomElementAsAudioResource(songs));
    player.on(AudioPlayerStatus.Idle, () => {
      player.stop();
      connection.disconnect();
      connection.destroy();
    });
  }

  static #getRandomElementAsAudioResource(songs: string[]): AudioResource {
    const song = ArrayHelper.getRandomElement<string>(songs);
    return createAudioResource(createReadStream(song), {
      inputType: StreamType.OggOpus,
    });
  }
}
