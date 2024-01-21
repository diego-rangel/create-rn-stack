import { CommandModule } from "yargs";

import { CONSTANTS } from "../@types/constants";
import { CreateProjectCommandOptions } from "../@types/commands";
import { promptAppIdentifier } from "../prompts/promptAppIdentifier";
import { promptBackend } from "../prompts/promptBackend";
import { promptEslint } from "../prompts/promptEslint";
import { promptIcon } from "../prompts/promptIcon";
import { promptNavigation } from "../prompts/promptNavigation";
import { promptPackageManager } from "../prompts/promptPackageManager";
import { promptSplash } from "../prompts/promptSplash";
import { promptStateManagement } from "../prompts/promptStateManagement";
import { promptStyling } from "../prompts/promptStyling";
import { promptImportAlias } from "../prompts/promptImportAlias";
import { createProjectHandler } from "../handlers/createProjectHandler";
import { promptAppName } from "../prompts/promptAppName";
import { promptPackageName } from "../prompts/promptPackageName";
import chalk from "chalk";

export const createCommand: CommandModule<{}, CreateProjectCommandOptions> = {
  command: ["create [name]"],
  describe: "🚀 Create a react native project",
  builder: (yargs) => {
    return yargs
      .positional("appName", {
        describe: "🔤 The project name",
        type: "string",
      })
      .positional("appIdentifier", {
        describe: "🔤 The project identifier",
        type: "string",
      })
      .positional("packageName", {
        describe: "🔤 The package name (Android) and bundle ID (iOS)",
        type: "string",
      })
      .positional("directory", {
        describe: "🔨 A custom directory to output the project",
        type: "string",
      })
      .option("enableImportAlias", {
        alias: "ia",
        describe: "🔨 Setup the usage of import aliases",
        type: "boolean",
        default: true,
      })
      .option("navigation", {
        alias: "nav",
        describe: "🧭 Setup a navigation library",
        type: "string",
        default: "none",
        choices: CONSTANTS.NAVIGATION_CHOICES,
      })
      .option("styling", {
        alias: "stl",
        describe: "🎨 Setup a styling library",
        type: "string",
        default: "none",
        choices: CONSTANTS.STYLING_CHOICES,
      })
      .option("state-management", {
        alias: "sm",
        describe: "📦 Setup a state management library",
        type: "string",
        default: "none",
        choices: CONSTANTS.STATE_MANAGEMENT_CHOICES,
      })
      .option("backend", {
        alias: "b",
        describe: "🌐 Setup a backend library",
        type: "string",
        default: "none",
        choices: CONSTANTS.BACKEND_CHOICES,
      })
      .option("eslint", {
        alias: "es",
        describe: "🔨 Setup eslint",
        type: "string",
        default: "none",
        choices: CONSTANTS.ESLINT_CHOICES,
      })
      .option("splash", {
        alias: "sp",
        describe: "📱 Setup the app splash screen",
        type: "string",
        default: "none",
        choices: CONSTANTS.SPLASH_CHOICES,
      })
      .option("icon", {
        alias: "ic",
        describe: "🎲 Setup the app icon",
        type: "string",
        default: "none",
        choices: CONSTANTS.ICON_CHOICES,
      })
      .option("package-manager", {
        alias: "pm",
        describe: "📦 Setup the package manager",
        type: "string",
        default: "yarn",
        choices: CONSTANTS.PACKAGE_MANAGER_CHOICES,
      })
      .option("skip-install", {
        alias: "si",
        describe: "🔨 Skips the package installing proccess",
        type: "boolean",
        default: false,
      });
  },
  handler: async (argv) => {
    try {
      await promptAppName(argv);
      await promptAppIdentifier(argv);
      await promptPackageName(argv);
      await promptImportAlias(argv);
      await promptNavigation(argv);
      await promptStyling(argv);
      await promptStateManagement(argv);
      await promptBackend(argv);
      await promptEslint(argv);
      await promptSplash(argv);
      await promptIcon(argv);
      await promptPackageManager(argv);

      await createProjectHandler(argv);

      console.log(chalk.green("✅ Your project was created successfully"));
    } catch (error) {
      console.log(chalk.red("❌ An error occurred while creating the project"));
      console.log(chalk.red(error));
    }
  },
};
