module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "prettier", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module",
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
};
