import matter from 'gray-matter';
import { File } from '../types';

export function getFrontmatterFromFile(file: File): { [key: string]: string } {
  return matter(file.fileContentBuffer)?.data;
}
