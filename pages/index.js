//@flow
import * as React from "react";
import Link from "next/link";

const PostLink = ({ path, children }: { path: string, children: React$Element<string> }) => (
    <Link as={`/post/${path}`} href={{ pathname: "/post", query: { path } }}>
        {children}
    </Link>
);

export default (): React$Element<string> => (
    <div>
        <PostLink path="test">
            <a>test</a>
        </PostLink>
        <PostLink path="1990/02/21/hoge">
            <a>hoge</a>
        </PostLink>
        <PostLink path="foo">
            <a>foo</a>
        </PostLink>
    </div>
);
