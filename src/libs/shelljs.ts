import shelljs from "shelljs";

export const shell = {
  exec: async (command: string) => {
    return new Promise((resolve, reject) => {
      shelljs.exec(command.trim(), (code, stdout, stderr) => {
        if (code !== 0) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      });
    });
  },
};
