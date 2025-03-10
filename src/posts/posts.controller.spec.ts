import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Response } from 'express';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            createPost: jest.fn(),
            getAllPostsByUser: jest.fn(),
            deletePostById: jest.fn(),
            getPostById: jest.fn(),
            updatePost: jest.fn()
          },
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  describe('createFilter', () => {
    it('should create a post and return success response', async () => {
      const createPostDto: CreatePostDto = {
        title: 'POst6',
        description: 'post223',
        user: 'ashruti925@gmail.com',
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = {
        id: 1,
        title: 'POst6',
        description: 'post223',
        user: 'ashruti925@gmail.com',
        created_at: Date.now(),
        updated_at: Date.now(),
        onCreation: jest.fn(),
        onUpdate: jest.fn(),
      };
      jest.spyOn(postsService, 'createPost').mockResolvedValue(result);

      await postsController.createFilter(createPostDto, mockResponse);

      expect(postsService.createPost).toHaveBeenCalledWith(createPostDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 200,
        message: "Post created successfully",
        data: result,
      });
    });

    it('should return 500 if an error occurs', async () => {
      const createPostDto: CreatePostDto = {
        title: 'POst6',
        description: 'post223',
        user: 'ashruti925@gmail.com',
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Internal server error');
      jest.spyOn(postsService, 'createPost').mockRejectedValue(error);

      await postsController.createFilter(createPostDto, mockResponse);

      expect(postsService.createPost).toHaveBeenCalledWith(createPostDto);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 500,
        message: error.message,
      });
    });
  });

  describe('getAllPostsByUser', () => {
    it('should return all posts for a given user', async () => {
      const userId = 'ashruti925@gmail.com';
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = {
        posts: [
          {
            id: 1,
            title: 'POst6',
            description: 'post223',
            user: 'ashruti925@gmail.com',
            created_at: Date.now(),
            updated_at: Date.now(),
            onCreation: jest.fn(),
        onUpdate: jest.fn(),
          },
          {
            id: 2,
            title: 'POst7',
            description: 'post224',
            user: 'ashruti925@gmail.com',
            created_at: Date.now(),
            updated_at: Date.now(),
            onCreation: jest.fn(),
        onUpdate: jest.fn(),
          },
        ],
        total: 2,
      };
      
      jest.spyOn(postsService, 'getAllPostsByUser').mockResolvedValue(result);

      const limit = 10; // or any appropriate value
      const offset = 0; // or any appropriate value
      await postsController.getAllPostsByUser(userId, limit, offset, mockResponse);

      expect(postsService.getAllPostsByUser).toHaveBeenCalledWith(userId, limit, offset);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 200,
        message: "Posts retrieved successfully",
        data: result.posts, // Change this line
        total: result.total, // Add this line
      });
    });

    it('should return 500 if an error occurs', async () => {
      const userId = 'ashruti925@gmail.com';
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Internal server error');
      jest.spyOn(postsService, 'getAllPostsByUser').mockRejectedValue(error);
      const limit = 10; // or any appropriate value
      const offset = 0;
      await postsController.getAllPostsByUser(userId, limit, offset, mockResponse);

      expect(postsService.getAllPostsByUser).toHaveBeenCalledWith(userId, limit, offset);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 500,
        message: error.message,
      });
    });
  });

  describe('deletePostById', () => {
    it('should delete a post and return success response', async () => {
      const postId = 1;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = { message: 'Post deleted successfully' };
      jest.spyOn(postsService, 'deletePostById').mockResolvedValue(result);

      await postsController.deletePostById(postId, mockResponse);

      expect(postsService.deletePostById).toHaveBeenCalledWith(postId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 200,
        message: result.message,
      });
    });

    it('should return 404 if post is not found', async () => {
      const postId = 1;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Post not found');
      jest.spyOn(postsService, 'deletePostById').mockRejectedValue(error);

      await postsController.deletePostById(postId, mockResponse);

      expect(postsService.deletePostById).toHaveBeenCalledWith(postId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 404,
        message: error.message,
      });
    });

    it('should return 500 if an error occurs', async () => {
      const postId = 1;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Internal server error');
      jest.spyOn(postsService, 'deletePostById').mockRejectedValue(error);

      await postsController.deletePostById(postId, mockResponse);

      expect(postsService.deletePostById).toHaveBeenCalledWith(postId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 500,
        message: error.message,
      });
    });
  });

  describe('getPostById', () => {
    it('should return a post for a given ID', async () => {
      const postId = 1;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = {
        id: 1,
        title: 'POst6',
        description: 'post223',
        user: 'ashruti925@gmail.com',
        created_at: Date.now(),
        updated_at: Date.now(),
        onCreation: jest.fn(),
        onUpdate: jest.fn(),
      };

      jest.spyOn(postsService, 'getPostById').mockResolvedValue(result);

      await postsController.getPostById(postId, mockResponse);

      expect(postsService.getPostById).toHaveBeenCalledWith(postId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 200,
        message: "Post retrieved successfully",
        data: result,
      });
    });

    it('should return 404 if post is not found', async () => {
      const postId = 1;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Post not found');
      jest.spyOn(postsService, 'getPostById').mockRejectedValue(error);

      await postsController.getPostById(postId, mockResponse);

      expect(postsService.getPostById).toHaveBeenCalledWith(postId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 404,
        message: error.message,
      });
    });

    it('should return 500 if an error occurs', async () => {
      const postId = 1;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Internal server error');
      jest.spyOn(postsService, 'getPostById').mockRejectedValue(error);

      await postsController.getPostById(postId, mockResponse);

      expect(postsService.getPostById).toHaveBeenCalledWith(postId);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 500,
        message: error.message,
      });
    });
  });

  describe('updatePost', () => {
    it('should update a post and return success response', async () => {
      const updatePostDto = {
        id: 1,
        title: 'Updated Post',
        description: 'Updated description',
        user: 'ashruti925@gmail.com',
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const result = {
        id: 1,
        title: 'Updated Post',
        description: 'Updated description',
        user: 'ashruti925@gmail.com',
        created_at: Date.now(),
        updated_at: Date.now(),
        onCreation: jest.fn(),
        onUpdate: jest.fn(),
      };
      jest.spyOn(postsService, 'updatePost').mockResolvedValue(result);

      await postsController.updatePost(updatePostDto, mockResponse);

      expect(postsService.updatePost).toHaveBeenCalledWith(updatePostDto);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 200,
        message: "Post updated successfully",
        data: result,
      });
    });

    it('should return 404 if post is not found', async () => {
      const updatePostDto = {
        id: 1,
        title: 'Updated Post',
        description: 'Updated description',
        user: 'ashruti925@gmail.com',
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Post not found');
      jest.spyOn(postsService, 'updatePost').mockRejectedValue(error);

      await postsController.updatePost(updatePostDto, mockResponse);

      expect(postsService.updatePost).toHaveBeenCalledWith(updatePostDto);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 404,
        message: error.message,
      });
    });

    it('should return 500 if an error occurs', async () => {
      const updatePostDto = {
        id: 1,
        title: 'Updated Post',
        description: 'Updated description',
        user: 'ashruti925@gmail.com',
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const error = new Error('Internal server error');
      jest.spyOn(postsService, 'updatePost').mockRejectedValue(error);

      await postsController.updatePost(updatePostDto, mockResponse);

      expect(postsService.updatePost).toHaveBeenCalledWith(updatePostDto);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        status: 500,
        message: error.message,
      });
    });
  });
});
