import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptBackend = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.backend && argv.backend !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "backend",
      type: "list",
      default: "none",
      message: chalk.white("What backend library do you want to use?"),
      choices: CONSTANTS.BACKEND_CHOICES,
    },
  ]);

  argv.backend = answers.backend;

  if (argv.backend === "none") {
    console.log(chalk.yellow("Ok, no backend service"));
  }
};
