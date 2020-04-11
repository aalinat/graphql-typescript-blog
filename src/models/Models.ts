export class Post {
  constructor(public id: number, title: string, content: string, authorId: number) {

  }
}
export class Author {
  constructor(public id: number, public name: string) {

  }
}
export class Comment {
  constructor(public id: number, public content: string, public authorId: number, public postId: number) {

  }
}