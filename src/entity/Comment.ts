import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { Author } from "./Author";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(type => Post, post => post.comments)
  post: Post;
  @ManyToOne(type => Author, author => author.comments)
  author: Author;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}