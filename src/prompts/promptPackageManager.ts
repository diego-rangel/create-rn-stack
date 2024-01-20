import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptPackageManager = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.packageManager && argv.packageManager !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "packageManager",
      type: "list",
      default: "yarn",
      message: chalk.white("What package manager do you want to use?"),
      choices: CONSTANTS.PACKAGE_MANAGER_CHOICES,
    },
  ]);

  argv.packageManager = answers.packageManager;
};
