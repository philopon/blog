//@flow
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import * as path from "path";
import { serveStatic, sendJSON } from "next/dist/server/render";
import renderer from "./renderer";
import route from "./route";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        (async () => {
            const parsedUrl = parse(req.url, true);
            const { pathname } = parsedUrl;

            if (!pathname) {
                return await handle(req, res, parsedUrl);
            }

            const { pathname: page, query, type: resType } = await route(pathname);
            if (resType === "page") {
                return await app.render(req, res, page, query);
            }
            if (resType === "json/page") {
                const data = await renderer(__dirname + path.dirname(pathname));
                return await sendJSON(res, data);
            }
            if (resType === "static") {
                return await serveStatic(req, res, __dirname + pathname);
            }
            return await handle(req, res, parsedUrl);
        })();
    }).listen(3000, err => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
    });
});
