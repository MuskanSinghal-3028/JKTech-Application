import { Body, Controller, Get, HttpException, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import * as dotenv from 'dotenv';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

dotenv.config();

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
  @Get('google')
    @ApiOperation({ description: "Google Login" })
    @ApiResponse({ status: 200, description: "successful" })
    @ApiResponse({ status: 500, description: "internal server error" })
    @ApiResponse({ status: 404, description: "not found" })
  @UseGuards(AuthGuard('google')) 
  async googleAuth() {}

  @Get('google/callback')
  @ApiOperation({ description: "Google Login Callback" })
  @ApiResponse({ status: 200, description: "successful" })
  @ApiResponse({ status: 500, description: "internal server error" })
  @ApiResponse({ status: 404, description: "not found" })
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
