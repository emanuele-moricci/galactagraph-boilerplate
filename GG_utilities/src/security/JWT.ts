import { verify, sign } from 'jsonwebtoken';

export const signToken = (object: object, secret: string): string =>
  sign(object, secret, { expiresIn: '3d' });

export const verifyToken = (token: string, secret: string) => {
  let resultData = null;
  if (!token) return {};

  try {
    resultData = <any>verify(token, secret, {});
  } catch (error) {}

  return resultData;
};
