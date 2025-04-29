import "jsr:@std/dotenv/load";

export const botToken = Deno.env.get("BOT_TOKEN") ?? "";
export const clientId = Deno.env.get("CLIENT_ID") ?? "";
export const guildId = Deno.env.get("GUILD_ID") ?? "";
export const staffVoiceChannelId = Deno.env.get("STAFF_VOICE_CHANNEL_ID") ?? "";
export const publicVoiceChance = Number(
  Deno.env.get("PUBLIC_VOICE_CHANCE") ?? "",
);
export const staffVoiceChance = Number(
  Deno.env.get("STAFF_VOICE_CHANCE") ?? "",
);
export const delayToRoll = Number(Deno.env.get("DELAY_TO_ROLL") ?? "");
export const presences = [
  "Spooking chatters",
];
