import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dto/create-post.dto';
import { Posts } from '../entities/posts';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async createPost(payload: CreatePostDto) {
    try {
      const existingPost = await this.postsRepository.findOne({
        where: { user: payload.user, title: payload.title },
      });

      if (existingPost) {
        throw new Error('Post with the same title already exists for this user.');
      }

      const newPost = this.postsRepository.create(payload);
      this.postsRepository.save(newPost);
      return newPost;
    } catch (e) {
      throw e;
    }
  }

  async getAllPostsByUser(userId: string, limit: number, offset: number) {
    try {
      const [posts, total] = await this.postsRepository.findAndCount({
        where: { user: userId },
        order: { updated_at: 'DESC' },
        take: limit,
        skip: offset,
      });
      return { posts, total };
    } catch (e) {
      throw e;
    }
  }

  async getPostById(postId: number) {
    try {
      const post = await this.postsRepository.findOne({where: { id: postId }});
      if (!post) {
        throw new Error('Post not found');
      }
      return post;
    } catch (e) {
      throw e;
    }
  }

  async deletePostById(postId: number) {
    try {
      const result = await this.postsRepository.delete(postId);
      if (result.affected === 0) {
        throw new Error('Post not found');
      }
      return { message: 'Post deleted successfully' };
    } catch (e) {
      throw e;
    }
  }

  async updatePost(payload: UpdatePostDto) {
    try {
      const result = await this.postsRepository.update(payload.id, payload);
      if (result.affected === 0) {
        throw new Error('Post not found');
      }
      const updatedPost = await this.postsRepository.findOne({ where: { id: payload.id } });
      return updatedPost;
    } catch (e) {
      throw e;
    }
  }
}
