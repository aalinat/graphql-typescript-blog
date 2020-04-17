import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { comments, authors } from "../entity/Mock";
import { AuthorType } from "./AuthorType";
import { CommentType } from "./CommentType";
import { PostService } from "../Services/PostService";
import { Post } from "../entity/Post";

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
        return post.author;
      }
    },
    comments: {
      type: GraphQLList(CommentType),
      resolve: (post) => {
        return post.comments;
      }
    },
    commentsCount: {
      type: GraphQLInt,
      resolve: (post) => {
        return post.comments.length;
      }
    }
  })
});