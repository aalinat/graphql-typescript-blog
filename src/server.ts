import "reflect-metadata";
import { GraphQLSchema } from "graphql";
import { createConnection } from "typeorm";
import { RootMutationType } from "./Schema/RootMutationType";

const { RootQueryType } = require('./Schema/RootQueryType');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: RootQueryType,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
createConnection();