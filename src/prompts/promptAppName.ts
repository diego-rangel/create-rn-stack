import chalk from "chalk";
import inquirer from "inquirer";
import { kebabCase } from "lodash";
import path from "path";
import { ArgumentsCamelCase } from "yargs";

export const promptAppName = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.appName && argv.appName.length > 0) return;

  const answers = await inquirer.prompt([
    {
      name: "appName",
      type: "input",
      message: chalk.white("How do you want to call your app identifier?"),
      default: kebabCase(path.basename(process.cwd())),
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return "Please enter your app name";
        }
        return true;
      },
    },
  ]);

  argv.appName = answers.appName.trim();
};
