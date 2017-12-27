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
            node.type = "element";
            node.tagName = "x-link";
            node.properties = { href: { pathname, query }, as: node.properties.href };
            node.children = [
                {
                    type: "element",
                    tagName: "a",
                    properties: { ...node.properties, href: undefined },
                    children: node.children,
                },
            ];
            return "skip";
        }
    });
