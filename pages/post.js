//@flow
import * as React from "react";
import Link from "../components/link-with-data";
import hast2hyperscript from "hast-to-hyperscript";
import Router from "next/router";
import fetch from "../utils/cached-fetch";

const isServer = typeof window === "undefined";

const fetchPost = async (path: string): Promise<Object> => {
    path = path.replace(/^\/|\/$/g, "");
    if (isServer) {
        const { default: renderer } = require("../renderer");
        return await renderer(`post/${path}`);
    } else {
        return await fetch(`/post/${path}/post.json`);
    }
};

const createElement = (type: string, props: {}, children) => {
    if (type === "x-link") {
        return React.createElement(Link, { ...props, prefetch: true, withData: true }, children[0]);
    }

    return React.createElement(type, props, children);
};

const Index = ({ body }: { body: Object }) => {
    return <div>{hast2hyperscript(createElement, body)}</div>;
};

Index.getInitialProps = async ({ query, res, asPath }) => {
    if (asPath && !isServer && !/\/$/.test(asPath)) {
        Router.push({ pathname: "/post", query }, asPath + "/");
        return {};
    }
    return await fetchPost(query.path);
};

export default Index;
