// @flow
import { isFileSync } from "./utils/is-file";

type RouteType = "page" | "json/page" | "static" | "none";

interface Route {
    type: RouteType;
    pathname?: string;
    query?: { path?: string };
}

export default (pathname: string): Route => {
    pathname = pathname.replace(/^\/|\/$/g, "");
    if (pathname === "") {
        return { pathname: "/", type: "page" };
    }

    // post/path/to/post.json
    if (/^post\/.*\/post\.json$/.test(pathname)) {
        return { pathname, type: "json/page" };
    }

    // post/path/to/article
    if (/^post\//.test(pathname)) {
        if (isFileSync(`${pathname}.md`) || isFileSync(`${pathname}/index.md`)) {
            return {
                pathname: "/post",
                query: { path: pathname.replace(/^post\//, "") },
                type: "page",
            };
        } else {
            if (isFileSync(pathname)) {
                return { pathname, type: "static" };
            }
        }
    }

    return { type: "none" };
};
