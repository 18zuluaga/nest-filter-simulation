import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      domain: 'dev-abklmtby8ai4wr78.us.auth0.com',
      clientID: 'mjWRLXjoE3Z0CWGblhj4OlT7m70SKp3i',
      clientSecret: 'jUWZhaijaPYCfnyyQu4sZGDJCOfl8EISiqcZrKonAMfEivEAZbN328iw8jFgvICI',
      callbackURL: 'http://localhost:3000/auth/callback',
      scope: 'openid profile email',
    });
  }

  async validate(accessToken: string, refreshToken: string, extraParams: any, profile: any) {
    return profile;
  }
}
