// @flow
import path from "path";
import glob from "glob-promise";

const toPostPath = p => p.replace(/^post\/|\/index\.md$|\.md$/g, "");

export default async () => {
    const files = await glob("post/**/*", { nodir: true });
    const posts = [];
    const statics = [];
    for (const file of files) {
        if (path.extname(file) === ".md") {
            posts.push(toPostPath(file));
        } else {
            statics.push(file);
        }
    }
    return { posts, statics };
};
