// @flow

import LRU from "lru-cache";
import fetch from "isomorphic-unfetch";

const cache = LRU({ max: 100, maxAge: 1000 * 60 * 60 });

export default async function<T>(url: string, options?: any): Promise<T> {
    let cached = cache.get(url);

    if (!cached) {
        cached = await fetch(url, options).then(r => r.json());
        cache.set(url, cached);
    }

    return cached;
}
