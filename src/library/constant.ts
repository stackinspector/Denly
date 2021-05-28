/**
 * @author mrxiaozhuox<mrxzx@qq.com>
 * some useful constant!
 */

/** Get the root directory */
export const _dirname = (() => {
    // return (Deno.mainModule).substring(0, Deno.mainModule.lastIndexOf("/") + 1).substr(8);
    return Deno.cwd();
})();

/** Get Denly framework version */
export const _version = "V0.23";

/** Get Platform Separator */
export const _separator: string = (() => {
    if (Deno.build.os === "windows") {
        return "\\";
    } else {
        return "/";
    }
})();

/** Get Temp Directory Path */
export const _tempdir: string = (() => {
    try {
        const temp: string = Deno.makeTempDirSync();
        const index = temp.lastIndexOf(_separator);

        const folder: string = temp.substring(0, index);

        Deno.removeSync(temp, { recursive: true });

        return folder;
    } catch {
        return _dirname + "/temp/";
    }
})();
