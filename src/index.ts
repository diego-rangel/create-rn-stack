import yargs, { CommandModule } from "yargs";
import { hideBin } from "yargs/helpers";

import { createCommand, iconCommand, splashCommand } from "./commands";
import { welcomeMiddleware } from "./middlewares";

const yargsInstance = yargs(hideBin(process.argv));

const middlewares = [welcomeMiddleware];

const commands = [createCommand, splashCommand, iconCommand].map(
  (x) => x as CommandModule<{}, any>
);

yargsInstance
  .command(commands)
  // .middleware(middlewares)
  .demandCommand(1, "You need at least one command before moving on")
  .strict()
  .help("h", "Show help")
  .scriptName("")
  .parse();
