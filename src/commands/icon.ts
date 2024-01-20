import { CommandModule } from "yargs";

export const iconCommand: CommandModule = {
  command: ["icon"],
  describe: "🎲 Setup the app icon",
  builder: (yargs) => {
    return yargs;
  },
  handler: (argv) => {
    console.info(argv);
  },
};
