import { merge } from "theme-ui";
import lekoTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui";

const theme = merge(lekoTheme, {
  section_hero: {
    mb: [4, 4, 5],
    p: { fontSize: [1, 1, 2], mt: [1, 1, 2] },
  },
  layout: {
    content: {
      my: 2,
      "& figcaption": {
        textAlign: "center",
        color: "secondary",
        mt: "-4",
        mb: "4",
      },
    },
  },
  styles: {
    header: {
      mb: [1, 2],
    },
    h1: {
      fontSize: [4, 5, 5, 5],
    },
    h2: {
      fontSize: [3, 4, 4, 4],
    },
    h3: {
      fontSize: [2, 3, 3, 3],
    },
    h4: {
      fontSize: [1, 2, 2, 2],
    },
    h5: {
      fontSize: [1, 2],
    },
    h6: {
      fontSize: 1,
    },
  },
});

export default theme;
