const { rem, fraction } = require("./_util");

module.exports = {
    spacing: {
        ...rem(1),
        ...rem(2),
        ...rem(4),
        ...rem(8),
        ...rem(10),
        ...rem(12),
        ...rem(16),
        ...rem(20),
        ...rem(24),
        ...rem(32),
        ...rem(40),
        ...rem(48),
        ...rem(56),
        ...rem(64),
        ...rem(72),
        ...rem(80),
        ...rem(96),
        ...rem(100),

        ...fraction(1),
        ...fraction(2),
        ...fraction(3),
        ...fraction(4),
        ...fraction(5),
        ...fraction(6),
        ...fraction(10),
        ...fraction(12),

        0: 0,
    },
};
