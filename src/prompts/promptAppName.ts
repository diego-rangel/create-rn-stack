import chalk from "chalk";
import inquirer from "inquirer";
import { startCase } from "lodash";
import path from "path";
import { ArgumentsCamelCase } from "yargs";

const sanitize = (value: string) => {
  return value
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s\s+/g, " ")
    .trim();
};

export const promptAppName = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.appName && argv.appName.length > 0) return;

  const folderName = path.basename(process.cwd());
  const defaultValue = startCase(sanitize(folderName));

  const answers = await inquirer.prompt([
    {
      name: "appName",
      type: "input",
      message: chalk.white("How do you want to call your app?"),
      default: defaultValue,
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return "Please enter your app name";
        }
        return true;
      },
    },
  ]);

  argv.appName = answers.appName.trim();
  argv.appProjectName = startCase(sanitize(argv.appName)).replace(/\s+/g, "");
};
