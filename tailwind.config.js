const rem = value => ({ [value]: `${value / 16}rem` });

module.exports = {
    theme: {
        fontSize: {
            ...rem(10),
            ...rem(12),
            ...rem(14),
            ...rem(16),
            ...rem(18),
            ...rem(20),
            ...rem(24),
            ...rem(28),
            ...rem(32),
            ...rem(36),
            ...rem(40),
            ...rem(48),
            ...rem(56),
            ...rem(64),
            ...rem(72),
            ...rem(80),
            ...rem(96),
        },
        extend: {
            colors: {
                blue: "#0052CC",
            },
        },
    },
    variants: {},
    plugins: [],
};
