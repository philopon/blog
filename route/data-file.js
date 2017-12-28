//@flow
import urlJoin from "url-join";
export const post = (p: string): string => urlJoin("/post", p.replace(/^\/+/, ""), "index.json");

export const isPost = (p: string): boolean => /^\/?post\/.*\/index\.json$/.test(p);
