import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as https from 'https';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
   
    httpsAgent: any;

    constructor(private readonly httpService: HttpService,
        private readonly jwtService: JwtService, 
        private readonly configservice: ConfigService) {
            this.httpsAgent = new https.Agent({
                rejectUnauthorized: false
            })
        }
    generateToken(req: any) {
       
        const jwtToken = this.jwtService.sign(req.user);
               return jwtToken;
      }
async logout(token:any){
    const parsed_token = token.split(' ')[1]; // Extract JWT
      const decoded: any = jwt.decode(parsed_token);
      const accessToken = decoded.accessToken;
   const output=  await this.httpService.post(`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`);


}
     
    


}
