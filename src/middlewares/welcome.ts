import figlet from "figlet";
import chalk from "chalk";
import { MiddlewareFunction } from "yargs";

export const welcomeMiddleware: MiddlewareFunction = async (argv) => {
  return new Promise((resolve, reject) => {
    figlet.text(
      "create-rn-stack",
      {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 100,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          reject(err);
        } else {
          console.log(chalk.blue(data));
          resolve();
        }
      }
    );
  });
};
