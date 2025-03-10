import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { urlencoded } from "body-parser";

const urlEncoded = urlencoded();

export class BodyParserUrlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.path.includes("backend")) {
      next();
    } else {
      urlEncoded(req, res, next);
    }
  }
}