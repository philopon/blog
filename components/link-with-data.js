import React from "react";
import Link from "next/link";
import { format, resolve, parse } from "url";
import Router from "next/router";

export default class LinkWithData extends Link {
    static propTypes = {};

    async prefetch() {
        if (!this.props.prefetch) return;
        if (typeof window === "undefined") return;

        const url = typeof this.props.href !== "string" ? format(this.props.href) : this.props.href;
        const { pathname } = window.location;
        const href = resolve(pathname, url);
        const Component = await Router.prefetch(href);

        if (this.props.withData && Component && Component.getInitialProps) {
            const { query } =
                typeof this.props.href !== "string" ? this.props.href : parse(url, true);
            const ctx = { pathname: href, query, isVirtualCall: true, asPath: this.props.as };
            await Component.getInitialProps(ctx);
        }
    }
}
