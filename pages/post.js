//@flow
import * as React from "react";
import Link from "next/link";
import hast2hyperscript from "hast-to-hyperscript";
import Router from "next/router";

const isServer = typeof window === "undefined";

const fetchPost = async (path: string): Promise<Object> => {
    path = path.replace(/^\/|\/$/g, "");
    if (isServer) {
        const { default: renderer } = require("../renderer");
        return await renderer(`post/${path}`);
    } else {
        const resp = await fetch(`/post/${path}/post.json`);
        return await resp.json();
    }
};

const createElement = (type: string, props: {}, children) => {
    if (type === "x-link") {
        return React.createElement(Link, props, children[0]);
    }

    return React.createElement(type, props, children);
};

const Index = ({ body }: { body: Object }) => {
    return <div>{hast2hyperscript(createElement, body)}</div>;
};

Index.getInitialProps = async ({ query, res, asPath }) => {
    if (!isServer && !/\/$/.test(asPath)) {
        Router.push({ pathname: "/post", query }, asPath + "/");
        return {};
    }
    return await fetchPost(query.path);
};

export default Index;
