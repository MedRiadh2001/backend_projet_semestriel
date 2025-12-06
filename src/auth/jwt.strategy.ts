import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'projetSemstrielSecretKey123456789',
        });
    }

    async validate(payload: any) {
        console.log('JWT payload:', payload);
        return { id: payload.sub, email: payload.email, role: payload.role };
        
    }
}
