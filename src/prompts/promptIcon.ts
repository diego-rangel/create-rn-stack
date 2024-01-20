import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptIcon = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.icon && argv.icon !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "icon",
      type: "list",
      default: "none",
      message: chalk.white("What icon do you want to use?"),
      choices: CONSTANTS.ICON_CHOICES,
    },
  ]);

  argv.icon = answers.icon;

  if (argv.icon === "none") {
    console.log(chalk.yellow("Ok, no icon"));
  }
};
