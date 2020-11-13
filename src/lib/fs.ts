import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import g from 'glob';
import { File } from '../types';

const glob = promisify(g);

export async function getFilePathsWithExtension(
  dir: string,
  extension: string
): Promise<string[]> {
  return await glob(path.join(dir, `**/*${extension}`));
}

export async function readMultipleFiles(filePaths: string[]): Promise<File[]> {
  const fileContentPromises = filePaths.map((filePath) =>
    fs.promises.readFile(filePath)
  );
  const fileContentBuffers = await Promise.all(fileContentPromises);

  return fileContentBuffers.map((fileContentBuffer, i) => ({
    path: filePaths[i],
    fileContentBuffer,
  }));
}
