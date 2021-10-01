import jwt from 'jsonwebtoken';

import UnauthenticatedError from '@error/unauthenticated';
import { JWT_SECRET } from '@src/config';

export default (func) => async (parent, args, context, info) => {
  if (!context.token) {
    throw new UnauthenticatedError();
  }
  try {
    const payload = jwt.verify(context.token, JWT_SECRET);
    const user = await context.services.userService.getUser((payload as any).username);
    if (!user) {
      throw new UnauthenticatedError();
    }
    context.user = payload;
  } catch (err) {
    throw new UnauthenticatedError();
  }
  return func(parent, args, context, info);
};
