import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptStateManagement = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.stateManagement && argv.stateManagement !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "stateManagement",
      type: "list",
      default: "none",
      message: chalk.white("What state management library do you want to use?"),
      choices: CONSTANTS.STATE_MANAGEMENT_CHOICES,
    },
  ]);

  argv.stateManagement = answers.stateManagement;

  if (argv.stateManagement === "none") {
    console.log(chalk.yellow("Ok, no state management"));
  }
};
