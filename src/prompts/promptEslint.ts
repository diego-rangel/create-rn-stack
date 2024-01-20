import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptEslint = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.eslint && argv.eslint !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "eslint",
      type: "list",
      default: "none",
      message: chalk.white("What eslint configuration do you want to use?"),
      choices: CONSTANTS.ESLINT_CHOICES,
    },
  ]);

  argv.eslint = answers.eslint;

  if (argv.eslint === "none") {
    console.log(chalk.yellow("Ok, no eslint"));
  }
};
