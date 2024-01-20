import chalk from "chalk";
import inquirer from "inquirer";
import { capitalize } from "lodash";
import path from "path";
import { ArgumentsCamelCase } from "yargs";

export const promptAppTitle = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.appTitle && argv.appTitle.length > 0) return;

  const answers = await inquirer.prompt([
    {
      name: "appTitle",
      type: "input",
      message: chalk.white("How do you want to call your app title?"),
      default: capitalize(path.basename(process.cwd())),
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return "Please enter your app title";
        }
        return true;
      },
    },
  ]);

  argv.appTitle = answers.appTitle.trim();
};
