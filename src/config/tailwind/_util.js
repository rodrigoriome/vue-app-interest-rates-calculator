function rem(value) {
    return {
        [value]: `${value / 16}rem`,
    };
}

function fraction(factor = 12) {
    const obj = {};

    for (let i = 1; i <= factor; i++) {
        let calc = (100 / factor) * i;

        if (calc % 1 !== 0) {
            calc = calc.toFixed(4);
        }

        obj[`${i}/${factor}`] = `${calc}%`;
    }

    return obj;
}

module.exports = {
    rem,
    fraction,
};
