import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptNavigation = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.navigation && argv.navigation !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "navigation",
      type: "list",
      default: "none",
      message: chalk.white("What navigation library do you want to use?"),
      choices: CONSTANTS.NAVIGATION_CHOICES,
    },
  ]);

  argv.navigation = answers.navigation;

  if (argv.navigation === "none") {
    console.log(chalk.yellow("Ok, no navigations"));
  } else if (argv.navigation === "react-navigation") {
    const answers = await inquirer.prompt([
      {
        name: "rootNavigator",
        type: "list",
        default: "stack",
        message: chalk.white("What root navigator do you want to use?"),
        choices: CONSTANTS.REACT_NAVIGATION_CHOICES,
      },
    ]);

    argv.rootNavigator = answers.rootNavigator;
  }
};
