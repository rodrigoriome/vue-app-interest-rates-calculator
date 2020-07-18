const { colors } = require("./colors");

module.exports = {
    boxShadow: {
        none: "none",
        input: `0 0 0 2px ${colors.blue.light}`,
        lg: "0 4px 32px rgba(0, 0, 0, 0.2), 0 8px 64px rgba(0, 0, 0, 0.2)",
    },
};
