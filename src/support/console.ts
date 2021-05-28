export const colorTab = {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Purple: "\x1b[35m",
    White: "\x1b[37m",
    Clean: "\x1b[0m",
};

export class EConsole {
    public static blank(): void {
        console.log("");
    }

    public static log(message: string): void {
        console.log(message);
    }

    public static info(message: string, source = "Denly"): void {
        const temp = `[INFO] @${source}:> ${message}`;
        console.log(temp);
    }

    public static warn(message: string, source = "Denly"): void {
        const temp = `[WARN] @${source}:> ${message}`;
        console.warn(colorTab.Yellow + temp + colorTab.Clean);
    }

    public static error(message: string, source = "Denly"): void {
        const temp = `[ERROR] @${source}:> ${message}`;
        console.error(colorTab.Red + temp + colorTab.Clean);
    }

    public static debug(message: string, source = "Denly"): void {
        const temp = `[DEBUG] @${source}:> ${message}`;
        console.error(colorTab.Green + temp + colorTab.Clean);
    }
}
