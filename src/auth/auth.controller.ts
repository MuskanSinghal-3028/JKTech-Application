import { Body, Controller, Get, HttpException, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google')) 
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) 
  googleAuthRedirect(@Request() req,@Res() res) {
    const token= this.authService.generateToken(req);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/dashboard?access_token=${token}`);
  }
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    const authHeader = req.headers.authorization;
   return await this.authService.logout(authHeader);
  }
}
