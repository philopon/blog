// @flow
import route from "../route";
import visit from "unist-util-visit";

export default (hast: any) =>
    visit(hast, (node, index, parent) => {
        if (node.type === "element" && node.tagName === "a") {
            const { pathname, query, type } = route(node.properties.href);
            if (type !== "page") {
                return;
            }
            node.properties = {
                tagName: node.tagName,
                pathname,
                query,
                as: node.properties.href,
                childProps: { ...node.properties, href: undefined },
            };
            node.type = "element";
            node.tagName = "x-link";
            return "skip";
        }
    });
