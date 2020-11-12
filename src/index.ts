#!/usr/bin/env node
import { getFilePathsWithExtension, readMultipleFiles } from './lib/fs';
import { getFrontmatterFromFile } from './lib/parse';
import { validateAssignmentFrontmatter } from './lib/validate';
import { File } from './types';

// TODO: Give these as options from the outside, or use cwd instead
const notesDir = '/home/dennis/Dropbox/orgnzr/';

async function main() {
  // 1. Get all md files in directory
  const mdFilePaths = await getFilePathsWithExtension(notesDir, '.md');
  const files: File[] = await readMultipleFiles(mdFilePaths);
  console.log(
    files
      .map((file) => getFrontmatterFromFile(file))
      .filter((frontmatter) => validateAssignmentFrontmatter(frontmatter))
  );

  // 2. Check if they have frontmatter, deadline & status

  // 3. Store the assignments somehow

  // 4. Print out deadlines chronologically
}

main();
