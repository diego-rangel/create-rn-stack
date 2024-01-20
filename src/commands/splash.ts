import { CommandModule } from "yargs";

export const splashCommand: CommandModule = {
  command: ["splash"],
  describe: "📱 Setup the app splash screen",
  builder: (yargs) => {
    return yargs;
  },
  handler: (argv) => {
    console.info(argv);
  },
};
