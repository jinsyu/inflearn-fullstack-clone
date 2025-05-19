import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUserId = createParamDecorator(
  (data: never, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.sub;
  },
);
