import chalk from "chalk";
import inquirer from "inquirer";
import { kebabCase } from "lodash";
import path from "path";
import { ArgumentsCamelCase } from "yargs";

export const promptPackageName = async (argv: ArgumentsCamelCase<any>) => {
  if (argv.packageName && argv.packageName.length > 0) return;

  const answers = await inquirer.prompt([
    {
      name: "packageName",
      type: "input",
      message: chalk.white(
        "How do you want your package name (Android) and bundle ID (iOS)?"
      ),
      default: `com.${kebabCase(path.basename(process.cwd()))}`,
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return "Please enter your package name";
        }
        return true;
      },
    },
  ]);

  argv.packageName = answers.packageName.trim();
};
