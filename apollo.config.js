module.exports = {
  client: {
    service: {
      name: 'slice pizza',
      url: 'http://localhost:1337/graphql',
      excludes: ['node_modules/*'],
      tagName: 'gql',
    },
  },
};
