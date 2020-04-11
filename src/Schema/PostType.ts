import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { comments, authors } from "../Models/Mock";
import { AuthorType } from "./AuthorType";
import { CommentType } from "./CommentType";

export const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (post) => {
        return authors.find(author => author.id === post.authorId)
      }
    },
    comments: {
      type: GraphQLList(CommentType),
      args: {
        start: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve: (post, args) => {
        const start = !!args.start && args.start > 0 ? parseInt(args.start) : 0;
        const limit = !!args.limit && args.limit > 0 ? parseInt(args.limit) : 10;
        return comments.filter(comment => comment.postId === post.id).slice(start, start + limit);
      }
    },
    commentsCount: {
      type: GraphQLInt,
      resolve: (post) => {
        return comments.filter(comment => comment.postId === post.id).length;
      }
    }
  })
});