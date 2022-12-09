function px(value) {
  return `${value}px`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    "@media (min-width:600px)": {
      fontSize: px(sm)
    },
    "@media (min-width:900px)": {
      fontSize: px(md)
    },
    "@media (min-width:1200px)": {
      fontSize: px(lg)
    }
  };
}

const FONT_PRIMARY = "Arial, sans-serif";

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 300,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: px(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 })
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: px(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 })
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: px(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 })
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: px(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: px(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 })
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: px(17),
    ...responsiveFontSizes({ sm: 16, md: 18, lg: 18 })
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: px(16)
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: px(14)
  },
  body1: {
    lineHeight: 1.5,
    fontSize: px(16)
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: px(14)
  },
  caption: {
    lineHeight: 1.5,
    fontSize: px(12)
  },
  overline: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: px(12),
    letterSpacing: 1.1,
    textTransform: "uppercase"
  },
  button: {
    fontWeight: 400,
    lineHeight: 24 / 14,
    fontSize: px(14),
    textTransform: "capitalize"
  }
};

export default typography;
