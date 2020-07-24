const { rem } = require("./_util");

module.exports = {
    fontFamily: {
        base: ["Roboto", "Arial", "sans-serif"],
        sans: ["Maax", "Roboto", "Arial", "sans-serif"],
    },
    fontSize: {
        ...rem(10),
        ...rem(12),
        ...rem(14),
        ...rem(16),
        ...rem(18),
        ...rem(20),
        ...rem(24),
        ...rem(32),
        ...rem(48),
        ...rem(64),
        ...rem(96),
    },
};
