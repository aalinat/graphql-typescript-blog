import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { PostType } from "./PostType";
import { AuthorType } from "./AuthorType";
export const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "Comment",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    content: { type: GraphQLNonNull(GraphQLString) },
    postId: { type: GraphQLNonNull(GraphQLInt) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    post: {
      type: PostType, resolve: (comment) => {
        return comment.post;
      }
    },
    author: {
      type: AuthorType, resolve: (comment) => {
        return comment.author;
      }
    }
  })
});