import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Author } from "./Author";
import { Comment } from "./Comment";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(type => Author, author => author.posts)
    author: Author;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: number;
}
