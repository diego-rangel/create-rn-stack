import { CommandModule } from "yargs";

import { CONSTANTS } from "../@types/constants";
import { CreateProjectCommandOptions } from "../@types/commands";
import { promptAppName } from "../prompts/promptAppName";
import { promptBackend } from "../prompts/promptBackend";
import { promptEslint } from "../prompts/promptEslint";
import { promptIcon } from "../prompts/promptIcon";
import { promptNavigation } from "../prompts/promptNavigation";
import { promptPackageManager } from "../prompts/promptPackageManager";
import { promptSplash } from "../prompts/promptSplash";
import { promptStateManagement } from "../prompts/promptStateManagement";
import { promptStyling } from "../prompts/promptStyling";
import { promptTesting } from "../prompts/promptTesting";
import { promptTypescript } from "../prompts/promptTypescript";
import { promptImportAlias } from "../prompts/promptImportAlias";
import { createProjectHandler } from "../handlers/createProjectHandler";
import { promptAppTitle } from "../prompts/promptAppTitle";
import { promptPackageName } from "../prompts/promptPackageName";

export const createCommand: CommandModule<{}, CreateProjectCommandOptions> = {
  command: ["create [name]"],
  describe: "🚀 Create a react native project",
  builder: (yargs) => {
    return yargs
      .positional("name", {
        describe: "🔤 The project name",
        type: "string",
      })
      .option("typescript", {
        alias: "ts",
        describe: "🔨 Setup the usage of Typescript",
        type: "boolean",
        default: true,
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
      .option("testing", {
        alias: "test",
        describe: "🧪 Setup a testing library",
        type: "string",
        default: "none",
        choices: CONSTANTS.TESTING_CHOICES,
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
    await promptAppName(argv);
    await promptAppTitle(argv);
    await promptPackageName(argv);
    await promptTypescript(argv);
    await promptImportAlias(argv);
    await promptNavigation(argv);
    await promptStyling(argv);
    await promptStateManagement(argv);
    await promptBackend(argv);
    await promptTesting(argv);
    await promptEslint(argv);
    await promptSplash(argv);
    await promptIcon(argv);
    await promptPackageManager(argv);
    await createProjectHandler(argv);
  },
};
