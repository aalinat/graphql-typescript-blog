import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from "graphql";
import { AuthorType } from "./AuthorType";
import { AuthorService } from "../Services/AuthorService";
import { Author } from "../entity/Author";
import { PostType } from "./PostType";
import { Post } from "../entity/Post";
import { PostService } from "../Services/PostService";
import { CommentType } from "./CommentType";
import { Comment } from "../entity/Comment";
import { CommentService } from "../Services/CommentService";

export const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString), description: 'Author Name' }
      },
      resolve: async (parent, args) => {
        const author = new Author();
        author.name = args.name;
        return await new AuthorService().addAuthor(author);
      }
    },
    addPost: {
      type: PostType,
      description: 'Add a Book',
      args: {
        title: { type: GraphQLNonNull(GraphQLString), description: 'Post Title' },
        content: { type: GraphQLNonNull(GraphQLString), description: 'Post Content' },
        authorId: { type: GraphQLNonNull(GraphQLInt), description: 'Author Id' }
      },
      resolve: async (parent, args) => {
        const post = new Post();
        post.title = args.title;
        post.content = args.content;
        post.author = await new AuthorService().getAuthor(args.authorId);
        if (post.author != null) {
          return await new PostService().addPost(post);
        } else {
          throw new Error("cannot find author");
        }
      }
    },
    addComment: {
      type: CommentType,
      description: 'Add a Comment',
      args: {
        content: { type: GraphQLNonNull(GraphQLString), description: 'Post Content' },
        authorId: { type: GraphQLNonNull(GraphQLInt), description: 'Author Id' },
        postId: { type: GraphQLNonNull(GraphQLInt), description: 'Post Id' }
      },
      resolve: async (parent, args) => {
        const comment = new Comment();
        comment.content = args.content;
        comment.author = await new AuthorService().getAuthor(args.authorId);
        comment.post = await new PostService().getPost(args.postId);
        if (comment.author == null) {
          throw new Error("cannot find author");
        }
        if (comment.post == null) {
          throw new Error("cannot find post");
        }
        return await new CommentService().addComment(comment);
      }
    }
  })
})