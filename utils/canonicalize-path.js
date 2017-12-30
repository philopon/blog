import * as path from "path";

const { normalize } = path.posix || path;

export default (p: string): string => `/${normalize(p).replace(/^\/+|\/+$/g, "")}`;
