import chalk from "chalk";
import inquirer from "inquirer";
import { ArgumentsCamelCase } from "yargs";

export const promptImportAlias = async (argv: ArgumentsCamelCase<any>) => {
  const answers = await inquirer.prompt([
    {
      name: "enableImportAlias",
      type: "confirm",
      default: argv.enableImportAlias,
      message: chalk.whiteBright("Would you like to use import alias?"),
    },
  ]);

  argv.enableImportAlias = answers.enableImportAlias;

  if (argv.enableImportAlias) {
    console.log(chalk.green("Nice! Now you gonna have better import paths 🎉"));
  } else {
    console.log(chalk.yellow("Ok, no import aliases for you 😢"));
  }
};
