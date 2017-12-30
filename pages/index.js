//@flow
import * as React from "react";
import Link from "next/link";
import fetch from "../utils/cached-fetch";
import canonicalize from "../utils/canonicalize-path";

const PostLink = ({ path, children }: { path: string, children: any }) => {
    path = canonicalize(path);
    return (
        <Link prefetch as={`/post${path}`} href="/post">
            <a onMouseOver={() => fetch(`/post${path}/index.json`)}>{children}</a>
        </Link>
    );
};

export default (): React$Element<string> => (
    <div>
        <PostLink path="test">test</PostLink>
        <PostLink path="1990/02/21/hoge">hoge</PostLink>
        <PostLink path="foo">foo</PostLink>
    </div>
);
