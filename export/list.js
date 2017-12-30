// @flow
import path from "path";
import glob from "glob-promise";

export default async () => {
    const files = await glob("post/**/*", { nodir: true });
    const posts = [];
    const statics = [];
    for (const file of files) {
        if (path.extname(file) === ".md") {
            posts.push({ file, route: `/${file.replace(/(\/index)?\.md$/, "")}/index.json` });
        } else {
            statics.push({ file, route: `/${file}` });
        }
    }
    return { posts, statics };
};
