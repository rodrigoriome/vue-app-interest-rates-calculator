const { keyword } = require("./_util");

module.exports = {
    colors: {
        ...keyword("transparent"),
        ...keyword("black"),
        ...keyword("white"),

        blue: {
            darker: "#010E28",
            dark: "#010E3C",
            default: "#015FFF",
            light: "#BFD7FF",
            lighter: "#F2F8FF",
        },

        gray: {
            50: "#FAFAFA",
            100: "#F5F5F5",
            200: "#EEEEEE",
            300: "#E0E0E0",
            400: "#BDBDBD",
            500: "#9E9E9E",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
        },
    },
};
