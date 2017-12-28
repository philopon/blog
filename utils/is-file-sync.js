// @flow
import fs from "fs";

export default (path: string): boolean => {
    try {
        return fs.lstatSync(path).isFile();
    } catch (e) {
        return false;
    }
};
