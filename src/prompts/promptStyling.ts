import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";
import { CONSTANTS } from "../@types/constants";

export const promptStyling = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.styling && argv.styling !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "styling",
      type: "list",
      default: "none",
      message: chalk.white("What styling library do you want to use?"),
      choices: CONSTANTS.STYLING_CHOICES,
    },
  ]);

  argv.styling = answers.styling;

  if (argv.styling === "none") {
    console.log(chalk.yellow("Ok, no styling"));
  }
};
