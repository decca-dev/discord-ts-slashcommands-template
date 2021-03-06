import { Event } from "../Structures/Event.js";
import { CommandInteraction } from "discord.js";
import { Logger } from "../Utils/Logger.js";
import { client } from "../index.js";

const logger = new Logger("ready");

export default new Event({
  name: "interactionCreate",
  run: async (interaction: CommandInteraction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (command.ownerOnly && interaction.user.id !== process.env.OWNER_ID)
      return await interaction.reply({
        content: "This command can only be triggered by the bot owner!",
        ephemeral: true,
      });

    try {
      await command.run(interaction);
    } catch (error: any) {
      logger.error(error);
      await interaction.reply({
        content: `**An error occured**:\n\`\`\`${error?.message}\`\`\``,
      });
    }
  },
});
