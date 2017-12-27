// @flow

import fs from "fs";

export const isFile = (path: string): Promise<boolean> => {
    return new Promise(resolve => {
        fs.lstat(path, (err, stats) => {
            if (err) return resolve(false);
            resolve(stats.isFile());
        });
    });
};

export const isFileSync = (path: string): boolean => {
    try {
        return fs.lstatSync(path).isFile();
    } catch (e) {
        return false;
    }
};
