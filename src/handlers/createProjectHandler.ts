import fs from "fs";
import path from "path";
import chalk from "chalk";
import { CreateProjectCommandOptions } from "../@types/commands";
import { shell } from "../libs/shelljs";
import inquirer from "inquirer";

export const createProjectHandler = async (
  options: CreateProjectCommandOptions
) => {
  await handleDestinationFolder(options);
  await handleProjectCreation(options);
};

const getDestinationFolder = (options: CreateProjectCommandOptions) => {
  const directory = options.directory ?? options.appIdentifier;
  return path.join(process.cwd(), directory!);
};

const handleDestinationFolder = async (
  options: CreateProjectCommandOptions
) => {
  const folder = getDestinationFolder(options);
  console.log(
    chalk.blue(`🔧 Preparing the destination folder at: ${chalk.grey(folder)}`)
  );

  if (fs.existsSync(folder)) {
    const answers = await inquirer.prompt([
      {
        name: "confirm",
        type: "confirm",
        default: true,
        message: chalk.magenta(
          "The destination folder already exists. Do you want to overwrite it?"
        ),
      },
    ]);

    if (!answers.confirm) {
      console.log(chalk.red("❌ The project creation was canceled"));
      process.exit(0);
    }

    console.log(chalk.blue("🔧 The destination folder has been cleared"));
    fs.rmSync(folder, { recursive: true });
  }
};

const handleProjectCreation = async (options: CreateProjectCommandOptions) => {
  console.log(chalk.blue("🔧 Creating the react native project..."));

  let command = `npx react-native init ${options.appProjectName} `;
  command += `--title ${options.appName} `;
  command += `--package-name ${options.packageName} `;
  command += `--pm ${options.packageManager} `;

  if (options.skipInstall) command += `--skip-install `;
  if (options.directory) command += `--directory ${options.directory} `;

  await shell.exec(command);
};
