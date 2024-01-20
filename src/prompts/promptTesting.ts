import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptTesting = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.testing && argv.testing !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "testing",
      type: "list",
      default: "none",
      message: chalk.white("What testing library do you want to use?"),
      choices: CONSTANTS.TESTING_CHOICES,
    },
  ]);

  argv.testing = answers.testing;

  if (argv.testing === "none") {
    console.log(chalk.yellow("Ok, no testing"));
  }
};
