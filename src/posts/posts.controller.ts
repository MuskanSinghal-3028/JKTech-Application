import { Controller, Post, Get, Delete, Put, Body, Query, Res, Inject } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../posts/posts.service';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  @ApiOperation({ description: " Add Post " })
  @ApiResponse({ status: 200, description: "successful" })
  @ApiResponse({ status: 500, description: "internal server error" })
  @ApiResponse({ status: 404, description: "not found" })
  async createPost(
    @Body() CreatePostDto: CreatePostDto,
    @Res() resp: Response
  ) {
    try {
     const data = await this.postsService.createPost(CreatePostDto);
      if(Object.keys(data).length>0){
        return resp.status(200).send({
          status: 200,
          message: "Post created successfully",
          data: data,
        });
      } 
    } catch (e) {
      return resp.status(500).send({
        status: 500,
        message: e.message.toString(),
      });
    }
  }

  @Get("get-all")
  @ApiOperation({ description: "Get all posts by user" })
  @ApiResponse({ status: 200, description: "successful" })
  @ApiResponse({ status: 500, description: "internal server error" })
  @ApiResponse({ status: 404, description: "not found" })
  async getAllPostsByUser(
    @Query('userId') userId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Res() resp: Response
  ) {
    try {
      const data = await this.postsService.getAllPostsByUser(userId, limit, offset);
    //   if (data.length > 0) {
        return resp.status(200).send({
          status: 200,
          message: "Posts retrieved successfully",
          data: data?.posts,
          total: data?.total,
        });
    //   } 
    } catch (e) {
      return resp.status(500).send({
        status: 500,
        message: e.message.toString(),
      });
    }
  }

  @Delete("delete")
  @ApiOperation({ description: "Delete post by ID" })
  @ApiResponse({ status: 200, description: "successful" })
  @ApiResponse({ status: 500, description: "internal server error" })
  @ApiResponse({ status: 404, description: "not found" })
  async deletePostById(
    @Query('id') id: number,
    @Res() resp: Response
  ) {
    try {
      const result = await this.postsService.deletePostById(id);
      return resp.status(200).send({
        status: 200,
        message: result.message,
      });
    } catch (e) {
      if (e.message === 'Post not found') {
        return resp.status(404).send({
          status: 404,
          message: e.message,
        });
      }
      return resp.status(500).send({
        status: 500,
        message: e.message.toString(),
      });
    }
  }

  @Get("getPostById")
  @ApiOperation({ description: "Get post by ID" })
  @ApiResponse({ status: 200, description: "successful" })
  @ApiResponse({ status: 500, description: "internal server error" })
  @ApiResponse({ status: 404, description: "not found" })
  async getPostById(
    @Query('id') id: number,
    @Res() resp: Response
  ) {
    try {
      const data = await this.postsService.getPostById(id);
      return resp.status(200).send({
        status: 200,
        message: "Post retrieved successfully",
        data: data,
      });
    } catch (e) {
      if (e.message === 'Post not found') {
        return resp.status(404).send({
          status: 404,
          message: e.message,
        });
      }
      return resp.status(500).send({
        status: 500,
        message: e.message.toString(),
      });
    }
  }

  @Put("update")
  @ApiOperation({ description: "Update post" })
  @ApiResponse({ status: 200, description: "successful" })
  @ApiResponse({ status: 500, description: "internal server error" })
  @ApiResponse({ status: 404, description: "not found" })
  async updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Res() resp: Response
  ) {
    try {
      const data = await this.postsService.updatePost(updatePostDto);
      return resp.status(200).send({
        status: 200,
        message: "Post updated successfully",
        data: data,
      });
    } catch (e) {
      if (e.message === 'Post not found') {
        return resp.status(404).send({
          status: 404,
          message: e.message,
        });
      }
      return resp.status(500).send({
        status: 500,
        message: e.message.toString(),
      });
    }
  }
  @Get('generate-test-data')
  @ApiOperation({ description: 'Generate 500 test posts in batches of 100' })
  @ApiResponse({ status: 200, description: 'Test data created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async generateTestPosts(@Query('user') userEmail: string, @Res() resp: Response) {
    try {
      if (!userEmail) {
        return resp.status(400).send({
          status: 400,
          message: 'User email is required',
        });
      }

      const totalInserted = await this.postsService.generateTestPosts(userEmail);

      return resp.status(200).send({
        status: 200,
        message: 'Test posts created successfully',
        totalInserted,
      });
    } catch (error) {
      return resp.status(500).send({
        status: 500,
        message: error.message.toString(),
      });
    }
  }
}
