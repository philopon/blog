// @flow
import route from "../route";
import visit from "unist-util-visit";
import * as url from "url";
import * as path from "path";
import urlJoin from "url-join";

const canonicalizeUrl = (urlString: string, base: string): string => {
    const u = url.parse(urlString);
    if (u.pathname && !path.isAbsolute(u.pathname)) {
        u.pathname = urlJoin(base, u.pathname);
    }
    return url.format(u);
};

export default (hast: any, base: string) =>
    visit(hast, (node, index, parent) => {
        if (node.type !== "element") return;

        if (node.tagName === "a" && node.properties.href) {
            const href = canonicalizeUrl(node.properties.href, base);
            const { pathname, query, type } = route(href);
            if (type === "page") {
                node.properties = {
                    tagName: node.tagName,
                    pathname,
                    query,
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
    });
