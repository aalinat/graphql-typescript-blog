import { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLList } from "graphql";
import { PostType } from "./PostType";
import { CommentType } from "./CommentType";
import { AuthorType } from "./AuthorType";
import { CRUDService } from '../Services/CRUDService'
import PaginationRequest from "../DTO/PaginationRequest";
import { Post, Comment, Author } from "../Models/Models";

const postService = new CRUDService<Post>();
const commentService = new CRUDService<Comment>();
const authorService = new CRUDService<Author>();

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

            resolve: (parent, args) => {
                const pagination = new PaginationRequest(args.start, args.offset);
                return postService.getAll(pagination);
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            args: {
                start: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const pagination = new PaginationRequest(args.start, args.offset);
                return commentService.getAll(pagination);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: {
                start: { type: GraphQLInt },
                offset: { type: GraphQLInt }
            },
            resolve: (parent, args) => {
                const pagination = new PaginationRequest(args.start, args.offset);
                return authorService.getAll(pagination);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (parent, args) => {
                return authorService.getById(args.id);
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (parent, args) => {
                return postService.getById(args.id);
            }
        },
        comment: {
            type: CommentType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (args) => {
                return commentService.getById(args.id);
            }
        }
    })
});