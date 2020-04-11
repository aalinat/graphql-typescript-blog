import PaginationRequest from "../DTO/PaginationRequest";

export class CRUDService<T> {
  async add(post: T): Promise<T> {
    return null;
  }
  async update(post: T): Promise<T> {
    return null;
  }
  async delete(id: number): Promise<boolean> {
    return false;
  }
  async getById(id: number): Promise<T> {
    return null;
  }
  async getAll(request: PaginationRequest): Promise<T[]> {
    return null;
  }
}