import { getRepository, FindManyOptions, Repository } from "typeorm";
import PaginationRequest from "../DTO/PaginationRequest";
import { Author } from "../entity/Author";

export class AuthorService {
  addAuthor(author: Author): Promise<Author> {
    const authorRepository = getRepository(Author);
    return authorRepository.save(author);
  }
  getAuthor(authorId: number): Promise<Author> {
    const authorRepository = getRepository(Author);
    return authorRepository.findOne(authorId);
  }
  getAuthors(pagination: PaginationRequest): Promise<Author[]> {
    const authorRepository = getRepository(Author);
    const options: FindManyOptions = { skip: pagination.start, take: pagination.offset }
    return authorRepository.find(options);
  }
}