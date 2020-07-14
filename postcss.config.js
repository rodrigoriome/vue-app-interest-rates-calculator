const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const postcssPurgecss = require("@fullhuman/postcss-purgecss");

const purgecss = postcssPurgecss({
    content: ["./public/**/*.html", "./src/**/*.vue"],
});

const plugins = [tailwindcss, autoprefixer];

if (process.env.NODE_ENV === "production") {
    plugins.push(purgecss);
}

module.exports = { plugins };
