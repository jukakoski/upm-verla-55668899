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


  /* Site data query */
  const {
    data: {
      allDatoCmsBlog: { homePageNodes, localeDatas  },
    },
  } = await graphql(`
        query {
          allDatoCmsBlog {
            localeDatas: edges {
              node {
                allLocaleData:_allLocaleFlagLocales {
                  locale
                  value {
                    url
                  }
                }
              }
            }
            homePageNodes:nodes {
              locale
              seo {
                title
                description
                logo: image {
                  small: gatsbyImageData(width: 200)
                }
              }
              heroMedia {
                video {
                  mp4Url
                  thumbnailUrl
                }
              }
            }
          }
        }
      `);


  const localeDataArr = localeDatas[0].node.allLocaleData


  /* Products data query */
  const {
    data: {
      allDatoCmsProduct: { productPagesNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsProduct(limit: 20) {
        productPagesNodes: nodes {
          locale
          title
          slug
          excerpt
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
                video {
                  url
                  video {
                    thumbnailUrl
                  }
                }
              }
            }
          }
          productMedia {
            video {
              thumbnailUrl
              mp4Url
            }
          }
        }
      }
    }
  `);


  /* Get index template */
  const HomePageTemplate = path.resolve('src/templates/index.js');

  /* Create index pages */
  homePageNodes.forEach(homePageNode => {

    const { locale, seo, heroMedia } = homePageNode
    createPage({
      path: locale === defaultLanguage ? '/' : `/${locale}`,
      component: HomePageTemplate,
      context: {
        seo,
        locale,
        favicon,
        heroMedia,
        localeDataArr,
        allPosts: productPagesNodes
      }
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
  const PostPageTemplate = path.resolve('src/templates/post.js');

  /* Create post pages */
  postPagesNodes.forEach(post => {

    const { locale, slug } = post
    const pageTitle = homePageNodes.filter(node => node.locale === locale)[0].seo.title

    const path = locale === defaultLanguage ? `/posts/${slug}` : `/${locale}/posts/${slug}`
    const url = `https://upm-bioarki.web.app${path}`
    createPage({
      path: path,
      component: PostPageTemplate,
      context: {
        post,
        favicon,
        pageTitle,
        url
      },
    });
  });



  /* Get product template */
  const ProductPageTemplate = path.resolve('src/templates/product.js');

  /* Create product pages */
  productPagesNodes.forEach(product => {

    const { locale, slug } = product
    const pageTitle = homePageNodes.filter(node => node.locale === locale)[0].seo.title

    const path = locale === defaultLanguage ? `/products/${slug}` : `/${locale}/products/${slug}`
    const url = `https://upm-bioarki.web.app${path}`
    createPage({
      path: path,
      component: ProductPageTemplate,
      context: {
        product,
        favicon,
        pageTitle,
        url
      },
    });
  });

};