/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import Navigation from "@lekoarts/gatsby-theme-minimal-blog/src/components/navigation";
import HeaderTitle from "@lekoarts/gatsby-theme-minimal-blog/src/components/header-title";
import HeaderExternalLinks from "@lekoarts/gatsby-theme-minimal-blog/src/components/header-external-links";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import { StaticImage } from "gatsby-plugin-image";

const Header = () => {
  const { siteDescription } = useSiteMetadata();
  const { navigation: nav } = useMinimalBlogConfig();

  return (
    <header sx={{ mb: [3, 4] }}>
      <Flex
        sx={{
          flexDirection: [`column`, `row`, `row`],
          alignItems: [`center`, `flex-start`, `flex-start`],
        }}
      >
        <StaticImage
          src="../../../../static/icon.png"
          alt="Logo"
          loading="eager"
          layout="constrained"
          placeholder="none"
          sx={{
            my: ["1", "3", "3"],
            marginLeft: "3",
            marginRight: "4",
            width: ["50px", "45px", "45px"],
          }}
        />
        <Flex
          sx={{ flexDirection: `column`, mt: "3", mb: ["3", "none", "none"] }}
        >
          <HeaderTitle />
          <div
            sx={{
              mt: "-1",
              fontSize: [1, 1],
              color: `secondary`,
            }}
          >
            {siteDescription}
          </div>
        </Flex>
      </Flex>
      <div
        sx={{
          boxSizing: `border-box`,
          display: `flex`,
          variant: `dividers.bottom`,
          alignItems: [`flex-start`, `flex-start`, `center`],
          justifyContent: `space-between`,
          mt: 3,
          color: `secondary`,
          a: { color: `secondary`, ":hover": { color: `heading` } },
          flexFlow: `wrap`,
          flexDirection: [`column`, `column`, `row`],
          minHeight: ["85px", "85px", "0"],
        }}
      >
        <Navigation nav={nav} />
        <HeaderExternalLinks />
      </div>
    </header>
  );
};

export default Header;
