const path = require(`path`);
const fs = require('fs');
const https = require('https');

exports.createPages = async ({ graphql, actions: { createPage } }) => {

  const {
    data: {
      datoCmsSite: { allLanguages },
    },
  } = await graphql(`
    query {
      datoCmsSite {
        allLanguages: locales
      }
    }
  `);

  const [defaultLanguage] = allLanguages;

  const HomePageTemplate = path.resolve('src/templates/index.js');

  allLanguages.forEach(locale => {
    createPage({
      path: locale === defaultLanguage ? '/' : `/${locale}`,
      component: HomePageTemplate,
      context: { locale }
    });
  });


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


  const PostPagesTemplate = path.resolve('src/templates/post.js');

  postPagesNodes.forEach(post => {

    console.log(post)

    const { locale, slug } = post
    createPage({
      path: locale === defaultLanguage ? `/posts/${slug}` : `/${locale}/posts/${slug}`,
      component: PostPagesTemplate,
      context: {
        post
      },
    });
  });



};






/* Promise.all(
  locales.map(locale => {
    graphql(`
      {
        allPosts: allDatoCmsPost(
          filter: { locale: { eq: "${locale}" } }
          sort: { fields: date, order: DESC },
          limit: 20) {
          nodes {
            locale
            title
            slug
            excerpt
            date
            coverImage {
              large: gatsbyImageData(width: 1500)
              small: gatsbyImageData(width: 760)
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
    `).then(result => {
      console.log(result);

      result.data.allPosts.nodes.forEach(item => {
        const prefix = locale === "en" ? "" : `/${locale}`;
        let p = `${prefix}/posts/${item.node.slug}`;
        createPage({
          path: p,
          component: path.resolve(`./src/posts/Post.jsx`),
          context: {
            slug: item.node.slug,
            locale
          }
        });
      });
    });
  })
); */