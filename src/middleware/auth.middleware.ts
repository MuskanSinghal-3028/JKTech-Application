import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GoogleAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // Extract JWT

    try {
      // Decode JWT to extract access_token
      const decoded: any = jwt.decode(token);

      if (!decoded || !decoded.accessToken) {
        throw new UnauthorizedException('Invalid JWT structure, access_token missing');
      }

      const accessToken = decoded.accessToken;

      // Verify access token with Google
      const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);

      // Attach Google user data to request object
      req.user = googleResponse?.data?.email;
      next();
    } catch (error) {
      console.error('Google Token Validation Error:', error.response?.data || error.message);
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
