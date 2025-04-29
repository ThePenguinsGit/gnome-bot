import CommandInterface from "./Commands/Command.ts";

export default class CommandRegistry {
  static async getAllCommands(): Promise<CommandInterface[]> {
    return [
      (await import("./Commands/SummonCommand.ts")).default,
    ];
  }
}
