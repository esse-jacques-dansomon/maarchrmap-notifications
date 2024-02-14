import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`.env.${dest}`);
  const filename: string = env ? `.env.${env}.` : '.env.prod';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  console.log(`[getEnvPath] filePath: ${filePath}`);

  return filePath;
}
