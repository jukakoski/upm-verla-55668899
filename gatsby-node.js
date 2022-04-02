const path = require(`path`);
const fs = require('fs');

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
              productsTitle
              seoMetaTags {
                tags
              }
              seo {
                title
                description
                logo: image {
                  small: gatsbyImageData(width: 200)
                }
              }
              heroVideoUrl
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
          productVideoUrl
          surveyTitle
          question
          thankYou
          answers
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
            isImage
            gatsbyImage: gatsbyImageData(width: 700)
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
  const HomePageTemplate = path.resolve('src/templates/index.tsx');

  /* Create index pages */
  homePageNodes.forEach(homePageNode => {

    const { locale, seo, heroVideoUrl, seoMetaTags, productsTitle } = homePageNode
    createPage({
      path: locale === defaultLanguage ? '/' : `/${locale}`,
      component: HomePageTemplate,
      context: {
        seo,
        locale,
        favicon,
        heroVideoUrl,
        productsTitle,
        localeDataArr,
        allProducts: productPagesNodes,
        seoMetaTags
      }
    });
  });



  /* Get product template */
  const ProductPageTemplate = path.resolve('src/templates/product.tsx');

  /* Create product pages */
  productPagesNodes.forEach(product => {

    const { locale, slug } = product
    const pageTitle = homePageNodes.filter(node => node.locale === locale)[0].seo.title
    const logo = homePageNodes.filter(node => node.locale === locale)[0].seo.logo

    const path = locale === defaultLanguage ? `/products/${slug}` : `/${locale}/products/${slug}`
    const url = `https://upm-bioarki.web.app${path}`
    createPage({
      path: path,
      component: ProductPageTemplate,
      context: {
        product,
        favicon,
        pageTitle,
        url,
        logo
      },
    });
  });

};

// need to copy firebase.json manually as gatsby cloud
exports.onPostBuild = () => {
  fs.copyFile(
    path.join(__dirname, '/firebase.json'),
    path.join(__dirname, '/public/firebase.json'),
    callback
  )
}

function callback(err) {
  if (err) throw err;
  console.log('/firebase.json was copied to /public/firebase.json');
}