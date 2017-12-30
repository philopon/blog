import list from "./export/list";
import { dirname } from "path";

module.exports = {
    webpack(config) {
        config.externals = {
            fs: "fs",
        };
        return config;
    },

    async exportPathMap() {
        const { posts: postFiles } = await list();
        const posts = postFiles.reduce((acc, v) => {
            const route = dirname(v.route);
            acc[route] = { page: "/post", as: route };
            return acc;
        }, {});

        return {
            "/": { page: "/" },
            ...posts,
        };
    },
};
