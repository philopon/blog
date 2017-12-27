import list from "./export/list";

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
            acc[`/post/${v}`] = { page: "/post", query: { path: v } };
            return acc;
        }, {});

        return {
            "/": { page: "/" },
            ...posts,
        };
    },
};
