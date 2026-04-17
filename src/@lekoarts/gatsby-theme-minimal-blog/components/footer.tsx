/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import { StaticImage } from "gatsby-plugin-image";

const Footer = () => {
  const { siteTitle } = useSiteMetadata();

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
        minHeight: ["140px", "140px", "0"],
      }}
    >
      <div>
        &copy; {new Date().getFullYear()}, {siteTitle}.
      </div>
      <div>
        <a href="https://aftra.io/">
          <StaticImage
            src="../../../../static/aftra-dark.png"
            sx={{maxWidth: "220px" }}
            quality={100}
            placeholder="none"
            alt="Aftra"
          />
        </a>
      </div>
      <div>
        <a href="https://syndis.com/">
          <StaticImage
            src="../../../../static/syndis-dark.png"
            sx={{maxWidth: "220px" }}
            quality={100}
            placeholder="none"
            alt="Syndis"
          />
        </a>
      </div>
      <div>
        <Link
          aria-label="Link to the theme's GitHub repository"
          href="https://github.com/LekoArts/gatsby-themes/tree/main/themes/gatsby-theme-minimal-blog"
        >
          Þema
        </Link>
        {` `}
        eftir
        {` `}
        <Link
          aria-label="Link to the theme author's website"
          href="https://www.lekoarts.de?utm_source=minimal-blog&utm_medium=Theme"
        >
          LekoArts
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
