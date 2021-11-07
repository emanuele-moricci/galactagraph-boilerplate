import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from 'crypto';

export const cryptObject = (secret: string, data: object): string => {
  const iv = randomBytes(16);
  let key = createHash('sha256').update(secret).digest('base64').substr(0, 32);
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const hashedContext = Buffer.concat([
    cipher.update(JSON.stringify(data)),
    cipher.final(),
  ]);

  return `${iv.toString('hex')}:${hashedContext.toString('hex')}`;
};

export const decryptObject = (secret: string, hash: string) => {
  const iv = hash.split(':')[0];
  const content = hash.split(':')[1];
  const key = createHash('sha256')
    .update(secret)
    .digest('base64')
    .substr(0, 32);
  const decipher = createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(content, 'hex')),
    decipher.final(),
  ]);

  return JSON.parse(decrpyted.toString());
};
