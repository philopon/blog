//@flow
import * as React from "react";
import Link from "next/link";
import hast2hyperscript from "hast-to-hyperscript";
import Router from "next/router";
import fetch from "../utils/cached-fetch";
import * as dataFile from "../route/data-file";

const isServer = typeof window === "undefined";

const fetchPost = async (path: string): Promise<Object> => {
    path = path.replace(/^\/|\/$/g, "");
    if (isServer) {
        const { default: renderer } = require("../renderer");
        return await renderer(`post/${path}`);
    } else {
        return await fetch(dataFile.post(path));
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
        const { tagName, pathname, query, as, rawChildProps, key } = props;
        let childProps = rawChildProps;
        if (pathname === "/post") {
            childProps = {
                ...rawChildProps,
                onMouseOver: () => fetch(dataFile.post(query.path)),
            };
        }
        return (
            <Link href={{ pathname, query }} key={key} as={as}>
                {React.createElement(tagName, childProps, children)}
            </Link>
        );
    }

    return React.createElement(type, props, children);
};

const Index = ({ body }: { body: Object }) => {
    return <div>{hast2hyperscript(createElement, body)}</div>;
};

Index.getInitialProps = async args => {
    return await fetchPost(args.query.path);
};

export default Index;
