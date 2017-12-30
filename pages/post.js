//@flow
import * as React from "react";
import Link from "next/link";
import hast2hyperscript from "hast-to-hyperscript";
import Router from "next/router";
import fetch from "../utils/cached-fetch";
import canonicalize from "../utils/canonicalize-path";

const isServer = typeof window === "undefined";

const fetchPost = async (path: string): Promise<Object> => {
    if (isServer) {
        const { renderRoute } = require("../renderer");
        return await renderRoute(path);
    } else {
        return await fetch(`${path}/index.json`);
    }
};

interface Props {
    tagName: string;
    pathname: string;
    query: { path: string };
    as: string;
    rawChildProps: {};
    key: string;
}

const createElement = (type: string, props: Props, children) => {
    if (type === "x-link") {
        const { tagName, pathname, as, rawChildProps, key } = props;
        let childProps = rawChildProps;
        if (pathname === "/post") {
            childProps = {
                ...rawChildProps,
                onMouseOver: () => fetch(`${as}/index.json`),
            };
        }
        return (
            <Link href={pathname} key={key} as={as}>
                {React.createElement(tagName, childProps, children)}
            </Link>
        );
    }

    return React.createElement(type, props, children);
};

const Index = ({ body }: { body: Object }) => {
    return <div>{hast2hyperscript(createElement, body)}</div>;
};

Index.getInitialProps = async ({ asPath }) => {
    return await fetchPost(canonicalize(asPath));
};

export default Index;
