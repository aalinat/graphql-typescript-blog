import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { posts } from "../entity/Mock";
import { PostType } from "./PostType";
import { PostService } from "../Services/PostService";
import { CommentService } from "../Services/CommentService";
import { CommentType } from "./CommentType";
export const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    posts: {
      type: GraphQLList(PostType),
      resolve: (author) => {
        return new PostService().getByAuthor(author.id);
      }
    },
    comments: {
      type: GraphQLList(CommentType),
      resolve: (author) => {
        return new CommentService().getByAuthor(author.id);
      }
    }
  })
});