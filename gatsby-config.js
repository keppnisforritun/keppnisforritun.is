require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.js
    siteTitle: `Keppnisforritunarfélag Íslands`,
    siteTitleAlt: `Keppnisforritunarfélag Íslands`,
    siteHeadline: `Keppnisforritunarfélag Íslands`,
    siteUrl: `https://keppnisforritun.is`,
    siteDescription: `Félag keppnisforritara á Íslandi`,
    siteImage: `/banner.jpg`,
    author: `Stjórn Keppnisforritunarfélags Íslands`,
  },
  trailingSlash: `never`,
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Forsíða`,
            slug: `/`,
          },
          {
            title: `Félagsaðild`,
            slug: `/felagsadild`,
          },
          {
            title: `Keppnir`,
            slug: `/keppnir`,
          },
          {
            title: `Um félagið`,
            slug: `/um-felagid`,
          },
        ],
        externalLinks: [
          {
            name: `GitHub`,
            url: `https://github.com/keppnisforritun`,
          },
          {
            name: `Discord`,
            url: `https://discord.gg/Umz2pJz`,
          },
          {
            name: `Facebook`,
            url: `https://www.facebook.com/groups/901241436655594/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Keppnisforritunarfélag Íslands`,
        short_name: `Keppnisforritunarfélag Íslands`,
        description: `Félag keppnisforritara á Íslandi`,
        start_url: `/`,
        background_color: `#fff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#6B46C1`,
        display: `standalone`,
        icon: "static/logo/cropped-Logo-Black-300x300.png",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                };
              }),
            query: `{
  allPost(sort: {date: DESC}) {
    nodes {
      title
      date(formatString: "MMMM D, YYYY")
      excerpt
      slug
    }
  }
}`,
            output: `rss.xml`,
            title: `Minimal Blog - @lekoarts/gatsby-theme-minimal-blog`,
          },
        ],
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
  ].filter(Boolean),
};
