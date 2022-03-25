const path = require(`path`);

exports.createPages = async ({ graphql, actions: { createPage } }) => {

  /* Site data query */
  const {
    data: {
      datoCmsSite: { allLanguages, favicon },
    },
  } = await graphql(`
    query {
      datoCmsSite {
        allLanguages: locales
        favicon: faviconMetaTags {
          tags
        }
      }
    }
  `);

  const [defaultLanguage] = allLanguages;

  /* Get index template */
  const HomePageTemplate = path.resolve('src/templates/index.js');

  /* Create index pages */
  allLanguages.forEach(locale => {
    createPage({
      path: locale === defaultLanguage ? '/' : `/${locale}`,
      component: HomePageTemplate,
      context: { locale, favicon }
    });
  });



  /* Post data query */
  const {
    data: {
      allDatoCmsPost: { postPagesNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsPost(
        sort: { fields: date, order: DESC },
        limit: 20) {
        postPagesNodes: nodes {
          locale
          title
          slug
          excerpt
          date
          coverImage {
            large: gatsbyImageData(width: 1500)
            small: gatsbyImageData(width: 760)
          }
          seo: seoMetaTags {
            tags
          }
          content {
            value
              blocks {
              __typename
              ... on DatoCmsImageBlock {
                id: originalId
                image {
                  gatsbyImageData(width: 700)
                }
              }
              ... on DatoCmsVideoBlock {
                id: originalId
                video{
                    url
                    video{
                      thumbnailUrl
                    }
                }
              }
            }
          }
          author {
            name
            picture {
              gatsbyImageData(
                layout: FIXED
                width: 48
                height: 48
                imgixParams: { sat: -100 }
              )
            }
          }
        }
      }
    }
  `);


  /* Get post template */
  const PostPagesTemplate = path.resolve('src/templates/post.js');

  /* Create post pages */
  postPagesNodes.forEach(post => {
    const { locale, slug } = post
    createPage({
      path: locale === defaultLanguage ? `/posts/${slug}` : `/${locale}/posts/${slug}`,
      component: PostPagesTemplate,
      context: {
        post,
        favicon
      },
    });
  });

};