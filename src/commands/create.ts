import inquirer from "inquirer";
import chalk from "chalk";
import { ArgumentsCamelCase, CommandModule } from "yargs";
import path from "path";
import { kebabCase } from "lodash";

const CONSTANTS = {
  STYLING_CHOICES: ["none", "nativewind", "tamagui", "tailwind", "unistyles"],
  NAVIGATION_CHOICES: ["none", "react-navigation"],
  REACT_NAVIGATION_CHOICES: ["stack", "tab", "drawer"],
  STATE_MANAGEMENT_CHOICES: ["none", "redux", "zustand"],
  TESTING_CHOICES: ["none", "jest"],
  BACKEND_CHOICES: ["none", "firebase", "supabase", "hasura"],
  ESLINT_CHOICES: ["none", "airbnb", "standard", "google", "shopify"],
  SPLASH_CHOICES: ["none", "custom"],
  ICON_CHOICES: ["none", "custom"],
  PACKAGE_MANAGER_CHOICES: ["npm", "yarn"],
};

type CreateCommandOptions = {
  name?: string;
  typescript?: boolean;
  navigation?: string;
  styling?: string;
  stateManagement?: string;
  backend?: string;
  testing?: string;
  eslint?: string;
  splash?: string;
  icon?: string;
  packageManager?: string;
  skipInstall?: boolean;
};

export const createCommand: CommandModule<{}, CreateCommandOptions> = {
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
    await ensureAppName(argv);
    await ensureTypescript(argv);
    await ensureNavigation(argv);
    await ensureStyling(argv);
    await ensureStateManagement(argv);
    await ensureBackend(argv);
    await ensureTesting(argv);
    await ensureEslint(argv);
    await ensureSplash(argv);
    await ensureIcon(argv);
    await ensurePackageManager(argv);
  },
};

export const ensureAppName = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.name && argv.name.length > 0) return;

  const answers = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: chalk.white("How do you want to call your app?"),
      default: kebabCase(path.basename(process.cwd())),
      validate: (value: string) => {
        if (!value || value.length === 0) {
          return "Please enter your app name";
        }
        return true;
      },
    },
  ]);

  argv.name = answers.name.trim();
};

export const ensureTypescript = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
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

export const ensureNavigation = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.navigation && argv.navigation !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "navigation",
      type: "list",
      default: "none",
      message: chalk.white("What navigation library do you want to use?"),
      choices: CONSTANTS.NAVIGATION_CHOICES,
    },
  ]);

  argv.navigation = answers.navigation;

  if (argv.navigation === "none") {
    console.log(chalk.yellow("Ok, no navigations"));
  }
};

export const ensureStyling = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.styling && argv.styling !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "styling",
      type: "list",
      default: "none",
      message: chalk.white("What styling library do you want to use?"),
      choices: CONSTANTS.STYLING_CHOICES,
    },
  ]);

  argv.styling = answers.styling;

  if (argv.styling === "none") {
    console.log(chalk.yellow("Ok, no styling"));
  }
};

export const ensureStateManagement = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.stateManagement && argv.stateManagement !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "stateManagement",
      type: "list",
      default: "none",
      message: chalk.white("What state management library do you want to use?"),
      choices: CONSTANTS.STATE_MANAGEMENT_CHOICES,
    },
  ]);

  argv.stateManagement = answers.stateManagement;

  if (argv.stateManagement === "none") {
    console.log(chalk.yellow("Ok, no state management"));
  }
};

export const ensureBackend = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.backend && argv.backend !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "backend",
      type: "list",
      default: "none",
      message: chalk.white("What backend library do you want to use?"),
      choices: CONSTANTS.BACKEND_CHOICES,
    },
  ]);

  argv.backend = answers.backend;

  if (argv.backend === "none") {
    console.log(chalk.yellow("Ok, no backend service"));
  }
};

export const ensureTesting = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.testing && argv.testing !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "testing",
      type: "list",
      default: "none",
      message: chalk.white("What testing library do you want to use?"),
      choices: CONSTANTS.TESTING_CHOICES,
    },
  ]);

  argv.testing = answers.testing;

  if (argv.testing === "none") {
    console.log(chalk.yellow("Ok, no testing"));
  }
};

export const ensureEslint = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.eslint && argv.eslint !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "eslint",
      type: "list",
      default: "none",
      message: chalk.white("What eslint configuration do you want to use?"),
      choices: CONSTANTS.ESLINT_CHOICES,
    },
  ]);

  argv.eslint = answers.eslint;

  if (argv.eslint === "none") {
    console.log(chalk.yellow("Ok, no eslint"));
  }
};

export const ensureSplash = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.splash && argv.splash !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "splash",
      type: "list",
      default: "none",
      message: chalk.white("What splash screen do you want to use?"),
      choices: CONSTANTS.SPLASH_CHOICES,
    },
  ]);

  argv.splash = answers.splash;

  if (argv.splash === "none") {
    console.log(chalk.yellow("Ok, no splash screen"));
  }
};

export const ensureIcon = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.icon && argv.icon !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "icon",
      type: "list",
      default: "none",
      message: chalk.white("What icon do you want to use?"),
      choices: CONSTANTS.ICON_CHOICES,
    },
  ]);

  argv.icon = answers.icon;

  if (argv.icon === "none") {
    console.log(chalk.yellow("Ok, no icon"));
  }
};

export const ensurePackageManager = async (
  argv: ArgumentsCamelCase<CreateCommandOptions>
) => {
  if (argv.packageManager && argv.packageManager !== "none") return;

  const answers = await inquirer.prompt([
    {
      name: "packageManager",
      type: "list",
      default: "yarn",
      message: chalk.white("What package manager do you want to use?"),
      choices: CONSTANTS.PACKAGE_MANAGER_CHOICES,
    },
  ]);

  argv.packageManager = answers.packageManager;
};
