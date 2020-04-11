import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { posts } from "./mock";
import { PostType } from "./PostType";
export const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    posts: {
      type: GraphQLList(PostType),
      resolve: (author) => {
        return posts.filter(post => post.authorId === author.id)
      }
    }
  })
});