require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Gatsby Blog Demo",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    /* {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `fi`],
        defaultLanguage: `en`,
        siteUrl: `http://localhost:8000/`,
        i18nextOptions: {
          interpolation: {
            escapeValue: false
          },
          keySeparator: false,
          nsSeparator: false
        },
        pages: [
          {
            matchPath: '/:lang?/posts',
            getLanguageFromPath: true,
          },
          {
            matchPath: '/preview',
            languages: ['en']
          }
        ]
      }
    }, */
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        environment: process.env.DATO_ENVIRONMENT,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-no-index`,
  ],
};
