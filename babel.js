require("babel-register")({
    presets: ["react", "env"],
    plugins: [
        "transform-object-rest-spread",
        "transform-runtime",
        "transform-flow-strip-types",
        "transform-class-properties",
    ],
});
