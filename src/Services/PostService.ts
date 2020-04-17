import { getRepository, FindManyOptions, createQueryBuilder, FindOneOptions } from "typeorm";
import { Post } from "../entity/Post";
import PaginationRequest from "../DTO/PaginationRequest";

export class PostService {
  addPost(post: Post) {
    const postRepository = getRepository(Post);
    return postRepository.save(post);
  }

  getPost(postId: number) {
    const postRepository = getRepository(Post);
    return postRepository.findOne(postId, { relations: ["author", "comments", "comments.author"] });
  }
  getPosts(pagination: PaginationRequest) {
    const postRepository = getRepository(Post);
    const options: FindManyOptions = { skip: pagination.start, take: pagination.offset, relations: ["comments", "author", "comments.author"] }
    return postRepository.find(options);
  }
  getByAuthor(authorId) {
    const postQueryBuilder = createQueryBuilder("post");
    return postQueryBuilder.where("post.authorId = :authorId", { authorId: authorId }).limit(10).orderBy("authorId");
  }
}