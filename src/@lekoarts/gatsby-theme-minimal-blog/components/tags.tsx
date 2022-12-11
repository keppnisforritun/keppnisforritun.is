/** @jsx jsx */
import { jsx, Heading, Box, Flex } from "theme-ui";
// @ts-ignore
import { kebabCase } from "@lekoarts/themes-utils";
import { HeadFC, Link } from "gatsby";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";

export type MBTagsProps = {
  list: {
    fieldValue: string;
    totalCount: number;
  }[];
};

const Tags = ({ list }: MBTagsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig();

  return (
    <Layout>
      <Heading as="h1" variant="styles.h1">
        Flokkar
      </Heading>
      <Box mt={[4, 5]}>
        {list.map((listItem) => (
          <Flex
            key={listItem.fieldValue}
            mb={[1, 1, 2]}
            sx={{ alignItems: `center` }}
          >
            <Link
              sx={(t) => ({ ...t.styles?.a, variant: `links.listItem`, mr: 2 })}
              to={replaceSlashes(
                `/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`
              )}
            >
              {listItem.fieldValue}{" "}
              <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </Link>
          </Flex>
        ))}
      </Box>
    </Layout>
  );
};

export default Tags;

export const Head: HeadFC = () => <Seo title="Flokkar" />;
