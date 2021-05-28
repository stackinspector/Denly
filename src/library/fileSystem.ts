/** determine whether the directory exists */
export function dirExist(path: string) {
    try {
        Deno.readDirSync(path);
    } catch {
        return false;
    }

    return true;
}

/** if directory not found, then create a new */
export function dirCheck(path: string) {
    if (!dirExist(path)) {
        try {
            Deno.mkdirSync(path, { recursive: true });
        } catch {
            return false;
        }
    }

    return true;
}

/** determine whether the file exists */
export function fileExist(path: string) {
    try {
        Deno.readFileSync(path);
    } catch {
        return false;
    }
    return true;
}
