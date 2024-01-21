import chalk from "chalk";
import inquirer from "inquirer";
import { kebabCase } from "lodash";
import path from "path";
import { ArgumentsCamelCase } from "yargs";

export const promptAppIdentifier = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.appIdentifier && argv.appIdentifier.length > 0) return;

  const answers = await inquirer.prompt([
    {
      name: "appIdentifier",
      type: "input",
      message: chalk.white("How do you want your app identifier?"),
      default: kebabCase(path.basename(process.cwd())),
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return "Please enter your app identifier";
        }
        return true;
      },
    },
  ]);

  argv.appIdentifier = answers.appIdentifier.trim();
};
