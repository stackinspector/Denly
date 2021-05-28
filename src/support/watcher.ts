import { _dirname, Denly, EConsole } from "../mod.ts";

type callback = (status: string) => unknown;

/** Debug File Watcher */
export class Watcher {
    /** watcher config information */
    public static info: {
        path: string;
        suffix: string[];
    } = { path: _dirname + "/", suffix: ["ts"] };

    /** the denly application object */
    public static app: Denly;

    /** watcher triggered callback */
    private static callback: callback = (status: string) => {
        Watcher.defaultCallback(status);
    };

    /** the timestamp for the last reload */
    private static lastReload: number = new Date().getTime();

    /** default Controller */
    public static defaultCallback(status: string) {
        if (this.app.deop.options?.debug) {
            if (Deno.args.length > 0 && Deno.args[0] === "-CHILD") {
                EConsole.debug("The file has changed, server has been restarted!");
                Deno.exit(0);
            }
        }
    }

    /** bind a new callback to watcher */
    public static bind(callback: callback) {
        Watcher.callback = callback;
    }

    /** start to listen the file modify */
    public static async listen() {
        const watcher = Deno.watchFs(Watcher.info.path, { recursive: true });
        for await (const event of watcher) {
            if (new Date().getTime() > Watcher.lastReload + 1000) {
                Watcher.lastReload = new Date().getTime();
                Watcher.callback(event.kind);
            }
        }
    }
}
