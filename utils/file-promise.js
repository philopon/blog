//@flow
import fs from "fs";

export const isFile = (path: string): Promise<boolean> =>
    new Promise(resolve =>
        fs.lstat(path, (err, stats) => {
            if (err) return resolve(false);
            resolve(stats.isFile());
        })
    );

export const readFile = (path: string): Promise<Buffer> =>
    new Promise((resolve, reject) =>
        fs.readFile(path, (err, content) => {
            if (err) return reject(err);
            resolve(content);
        })
    );

export const writeFile = (filename: string, data: Buffer | string): Promise<void> =>
    new Promise((resolve, reject) =>
        fs.writeFile(filename, data, err => {
            if (err) return reject(err);
            resolve();
        })
    );

export const copyFile = (src: string, dst: string): Promise<string> =>
    new Promise((resolve, reject) => {
        (fs: any).copyFile(src, dst, err => {
            if (err) return reject(err);
            resolve(dst);
        });
    });
