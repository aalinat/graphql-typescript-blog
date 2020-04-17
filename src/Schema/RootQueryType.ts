import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList } from "graphql";
import { PostType } from "./PostType";
import { CommentType } from "./CommentType";
import { AuthorType } from "./AuthorType";
import { PostService } from '../Services/PostService';
import PaginationRequest from "../DTO/PaginationRequest";
import { Post } from "../entity/Post";
import { AuthorService } from "../Services/AuthorService";
import { CommentService } from "../Services/CommentService";
export const RootQueryType = new GraphQLObjectType({
    name: "Root",
    description: "Root Query",
    fields: () => ({
        posts: {
            args: {
                start: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            type: new GraphQLList(PostType),

            resolve: async (parent, args) => {
                const pagination = new PaginationRequest(args.start, args.offset);
                return await new PostService().getPosts(pagination);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            args: {
                start: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const pagination = new PaginationRequest(args.start, args.offset);
                return await new CommentService().getComments(pagination);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: {
                start: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                const pagination = new PaginationRequest(args.start, args.offset);
                return await new AuthorService().getAuthors(pagination);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: async (parent, args) => {
                return await new AuthorService().getAuthor(args.id);
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (parent, args) => {
                const post: Post = await new PostService().getPost(args.id);
                return post;
            }
        },
        comment: {
            type: CommentType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (args) => {
                return await new CommentService().getComment(args.id);
            }
        }
    })
});