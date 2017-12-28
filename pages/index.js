//@flow
import * as React from "react";
import Link from "next/link";
import fetch from "../utils/cached-fetch";
import * as dataFile from "../route/data-file";

const prefetch = async (path: string) => {
    await fetch(dataFile.post(path));
};

const PostLink = ({ path, children }: { path: string, children: any }) => (
    <Link prefetch as={`/post/${path}/`} href={{ pathname: "/post", query: { path } }}>
        <a onMouseOver={() => prefetch(path)}>{children}</a>
    </Link>
);

export default (): React$Element<string> => (
    <div>
        <PostLink path="test">test</PostLink>
        <PostLink path="1990/02/21/hoge">hoge</PostLink>
        <PostLink path="foo">foo</PostLink>
    </div>
);
