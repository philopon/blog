// @flow
import route from "../route";
import visit from "unist-util-visit";
import * as url from "url";
import * as path from "path";
import canonicalize from "../utils/canonicalize-path";

const canonicalizeUrl = (urlString: string, base?: string): string => {
    const u = url.parse(urlString);
    if (u.pathname && !path.isAbsolute(u.pathname)) {
        u.pathname = base !== undefined ? `${base}/${u.pathname}` : u.pathname;
    }
    u.pathname = canonicalize(u.pathname);
    return url.format(u);
};

export default ({ base }: { base?: string } = {}) => {
    const visitor = node => {
        if (node.type !== "element") return;

        if (node.tagName === "a" && node.properties.href) {
            const href = canonicalizeUrl(node.properties.href, base);
            const { pathname, type } = route(href);
            if (type === "page") {
                node.properties = {
                    tagName: node.tagName,
                    pathname,
                    as: href,
                    childProps: { ...node.properties, href: undefined },
                };
                node.type = "element";
                node.tagName = "x-link";
                return "skip";
            }
            if (type === "static") {
                node.properties.href = href;
            }
        }

        if (node.tagName === "img" && node.properties.src) {
            node.properties.src = canonicalizeUrl(node.properties.src, base);
        }
    };

    return (ast: any) => visit(ast, visitor);
};
