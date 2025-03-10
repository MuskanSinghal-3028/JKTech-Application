import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Posts } from '../entities/posts';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Posts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Posts),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Posts>>(getRepositoryToken(Posts));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPostById', () => {
    it('should return a post if found', async () => {
      const postId = 1;
      const post = { id: postId, title: 'Test Post', user: 'user1', description: 'Test Description', created_at: Date.now(), updated_at: Date.now() , onCreation: jest.fn(),
        onUpdate: jest.fn(),};
      jest.spyOn(repository, 'findOne').mockResolvedValue(post);

      expect(await service.getPostById(postId)).toEqual(post);
    });

    it('should throw an error if post not found', async () => {
      const postId = 1;
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.getPostById(postId)).rejects.toThrow('Post not found');
    });
  });

  describe('deletePostById', () => {
    it('should return a success message if post is deleted', async () => {
      const postId = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      expect(await service.deletePostById(postId)).toEqual({ message: 'Post deleted successfully' });
    });

    it('should throw an error if post not found', async () => {
      const postId = 1;
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);

      await expect(service.deletePostById(postId)).rejects.toThrow('Post not found');
    });
  });

  describe('getAllPostsByUser', () => {
    it('should return posts and total count', async () => {
      const userId = 'user1';
      const limit = 10;
      const offset = 0;
      const posts = [{ id: 1, title: 'Test Post', user: userId, description: 'Test Description', created_at: Date.now(), updated_at: Date.now(),onCreation: jest.fn(),
        onUpdate: jest.fn() }];
      const total = 1;
      jest.spyOn(repository, 'findAndCount').mockResolvedValue([posts, total]);

      expect(await service.getAllPostsByUser(userId, limit, offset)).toEqual({ posts, total });
    });

    it('should throw an error if something goes wrong', async () => {
      const userId = 'user1';
      const limit = 10;
      const offset = 0;
      jest.spyOn(repository, 'findAndCount').mockRejectedValue(new Error('Error'));

      await expect(service.getAllPostsByUser(userId, limit, offset)).rejects.toThrow('Error');
    });
  });

  describe('updatePost', () => {
    it('should return updated post if successful', async () => {
      const payload = { id: 1, title: 'Updated Post', user: 'user1', description: 'Updated Description' };
      const updatedPost = { ...payload, created_at: Date.now(), updated_at: Date.now(),onCreation: jest.fn(),
        onUpdate: jest.fn() };
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(repository, 'findOne').mockResolvedValue(updatedPost);

      expect(await service.updatePost(payload)).toEqual(updatedPost);
    });

    it('should throw an error if post not found', async () => {
      const payload = { id: 1, title: 'Updated Post', user: 'user1', description: 'Updated Description' };
      jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any);

      await expect(service.updatePost(payload)).rejects.toThrow('Post not found');
    });
  });

  describe('createPost', () => {
    it('should create and return a new post', async () => {
      const payload = { title: 'New Post', user: 'user1', description: 'New Description' };
      const newPost = { id: 1, ...payload, created_at: Date.now(), updated_at: Date.now() ,onCreation: jest.fn(),
        onUpdate: jest.fn()};
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(newPost as any);
      jest.spyOn(repository, 'save').mockResolvedValue(newPost);

      expect(await service.createPost(payload)).toEqual(newPost);
    });

    it('should throw an error if post with same title already exists for the user', async () => {
      const payload = { title: 'Existing Post', user: 'user1', description: 'Existing Description' };
      const existingPost = { id: 1, ...payload, created_at: Date.now(), updated_at: Date.now() ,onCreation: jest.fn(),
        onUpdate: jest.fn()};
      jest.spyOn(repository, 'findOne').mockResolvedValue(existingPost);

      await expect(service.createPost(payload)).rejects.toThrow('Post with the same title already exists for this user.');
    });
  });
});
