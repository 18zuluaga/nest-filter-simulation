import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const decodedToken = jwt.decode(rawJwtToken, { complete: true });
        const kid = decodedToken.header.kid;

        const client = jwksRsa({
          jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
        });

        client.getSigningKey(kid, (err, key) => {
          if (err) {
            return done(err);
          }
          done(null, key.getPublicKey());
        });
      },
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
