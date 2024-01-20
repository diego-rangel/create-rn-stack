import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptSplash = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.splash && argv.splash !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "splash",
      type: "list",
      default: "none",
      message: chalk.white("What splash screen do you want to use?"),
      choices: CONSTANTS.SPLASH_CHOICES,
    },
  ]);

  argv.splash = answers.splash;

  if (argv.splash === "none") {
    console.log(chalk.yellow("Ok, no splash screen"));
  }
};
