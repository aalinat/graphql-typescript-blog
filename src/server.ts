import { GraphQLSchema } from "graphql";

const { RootQueryType } = require('./Schema/RootQueryType');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = new GraphQLSchema({
    query: RootQueryType
});
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: RootQueryType,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
