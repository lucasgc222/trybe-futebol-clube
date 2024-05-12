import * as jwt from 'jsonwebtoken';
import { Payload } from '../types/Login';

export default class JWT {
  private static secret: jwt.Secret = process.env.JWT_SECRET || 'jwt_secret';

  static createToken(payload: Payload): string {
    return jwt.sign(payload, this.secret);
  }

  static decodeToken(token: string): Payload {
    return jwt.decode(token) as Payload;
  }

  static verifyToken(token: string): Payload | string {
    try {
      return jwt.verify(token, this.secret) as Payload;
    } catch (error) {
      return 'Token must be a valid token';
    }
  }
}
