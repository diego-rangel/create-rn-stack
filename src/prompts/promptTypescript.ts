import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";

export const promptTypescript = async (argv: ArgumentsCamelCase<any>) => {
  const answers = await inquirer.prompt([
    {
      name: "typescript",
      type: "confirm",
      default: argv.typescript,
      message: chalk.whiteBright("Would you like to use Typescript?"),
    },
  ]);

  argv.typescript = answers.typescript;

  if (argv.typescript) {
    console.log(chalk.green("Good call! Now we are type safe 🎉"));
  } else {
    console.log(chalk.yellow("Ok, no Typescript for you 😢"));
  }
};
