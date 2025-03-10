import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { json } from "body-parser";

const jsonParseMiddleware = json();

export class BodyParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    jsonParseMiddleware(req, res, next);
  }
}
