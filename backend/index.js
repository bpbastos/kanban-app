// index.js
import express from 'express';
import { ParseServer, ParseGraphQLServer } from 'parse-server';

// Create express app
const app = express();

// Create a Parse Server Instance
const parseServer = new ParseServer({
  databaseURI: process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://192.168.33.249:27017/dev',
  appId: process.env.APP_ID || 'kanbanapp',
  masterKey: process.env.MASTER_KEY || 'dev',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
  publicServerURL: process.env.PUBLIC_SERVER_URL ||'http://localhost:1337/parse',
  restAPIKey: process.env.RESTAPI_KEY || 'dev',
  javascriptKey: process.env.JAVASCRIPT_KEY || 'dev',  
});

// Create the GraphQL Server Instance
const parseGraphQLServer = new ParseGraphQLServer(
  parseServer,
  {
    graphQLPath: '/graphql',
    playgroundPath: '/playground'
  }
);

// (Optional) Mounts the REST API
await parseServer.start();
app.use('/parse', parseServer.app);
// Mounts the GraphQL API using graphQLPath: '/graphql'
parseGraphQLServer.applyGraphQL(app);
// (Optional) Mounts the GraphQL Playground - do NOT use in Production
parseGraphQLServer.applyPlayground(app);

// Start the server
app.listen(1337, function() {
  console.log('REST API running on http://localhost:1337/parse');
  console.log('GraphQL API running on http://localhost:1337/graphql');
  console.log('GraphQL Playground running on http://localhost:1337/playground');
});