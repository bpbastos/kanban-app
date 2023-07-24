// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'kanban-app',
        // URL to the GraphQL API
        url: 'http://localhost:1337/graphql',
        headers: {
            "X-Parse-Application-Id": "kanbanapp",
            "X-Parse-Master-Key": "dev"
        }        
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }