import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { comments, posts, authors } from "./models/mock";
import { PostType } from "./models/PostType";
import { CommentType } from "./models/CommentType";
import { AuthorType } from "./models/AuthorType";




export const RootQueryType = new GraphQLObjectType({
    name: "Root",
    description: "Root Query",
    fields: () => ({
        posts: {
            type: new GraphQLList(PostType),
            resolve: () => posts
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: () => comments
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: () => authors
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLInt
                }
            },
            resolve: (parent, args) => {
                console.log(args.id);
                return authors.find(author => author.id === args.id)
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
                return posts.find(post => post.id === args.id);
            }
        },
        comment: {
            type: CommentType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (args) => {
                return comments.find(comment => comment.id === args.id);
            }
        }
    })
});