import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTService } from '../../Services/JWT/Jwt.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../configs/Guards/Public.guard.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JWTService,
    private reflector: Reflector,
  ) {}

  // If Public Route then pass otherwise check JWT if not valid throw error otherwise pass
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }
    try {
      const payload = await this.jwtService.verifyToken(token);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }
  // Extract Access Token From Headers
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
