import { CreateProjectCommandOptions } from "../@types/commands";
import { shell } from "../libs/shelljs";

export const createProjectHandler = async (
  options: CreateProjectCommandOptions
) => {
  let command = `npx react-native init ${options.appName} `;
  command += `--title ${options.appTitle} `;
  command += `--package-name ${options.packageName} `;
  command += `--pm ${options.packageManager} `;

  if (options.skipInstall) command += `--skip-install `;

  console.log("🚀 ~ command:", command);
  // await shell.exec(command);
};
