import { getRepository, FindManyOptions } from "typeorm";
import { Comment } from "../entity/Comment";
import PaginationRequest from "../DTO/PaginationRequest";

export class CommentService {
  addComment(comment: Comment) {
    const commentRepository = getRepository(Comment);
    return commentRepository.save(comment);
  }
  async getByAuthor(id: any): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }

  async getComment(commentId: number) {
    const commentRepository = getRepository(Comment);
    return commentRepository.findOne(commentId);
  }
  async getComments(pagination: PaginationRequest) {
    const commentRepository = getRepository(Comment);
    const options: FindManyOptions = { skip: pagination.start, take: pagination.offset }
    return commentRepository.find(options);
  }
}