/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import { graphql, useStaticQuery } from "gatsby";

const ContestArchive = ({ name }) => {
  const data = useStaticQuery(graphql`
    query ContestQuery {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
            tags
            date
          }
        }
      }
    }
  `);

  const contests = data.allMdx.nodes.filter(
    (node) => node.frontmatter.tags && node.frontmatter.tags.includes(name)
  );

  contests.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {contests.map((node) => {
          return (
            <li key={node.frontmatter.slug}>
              <Link to={node.frontmatter.slug}>
                {node.frontmatter.title.replace(name, "").trim()}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContestArchive;
