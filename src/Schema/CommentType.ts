import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { posts, authors } from "../Models/Mock";
import { PostType } from "./PostType";
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
        return posts.find(post => post.id === comment.postId)
      }
    },
    author: {
      type: PostType, resolve: (comment) => {
        return authors.find(authors => authors.id === comment.authorId)
      }
    }
  })
});