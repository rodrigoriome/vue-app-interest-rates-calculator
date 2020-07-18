module.exports = {
    theme: {
        ...require("./src/config/tailwind/colors"),
        ...require("./src/config/tailwind/spacing"),
        ...require("./src/config/tailwind/typography"),
        ...require("./src/config/tailwind/border"),
        ...require("./src/config/tailwind/shadow"),
        extend: {},
    },
    variants: {
        zIndex: ["responsive", "hover"],
    },
    plugins: [],
};
