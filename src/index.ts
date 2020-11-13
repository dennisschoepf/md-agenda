#!/usr/bin/env node
import { getFilePathsWithExtension, readMultipleFiles } from './lib/fs';
import { getFrontmatterFromFile } from './lib/parse';
import { validateAssignmentFrontmatter } from './lib/validate';
import {
  Assignment,
  AssignmentFile,
  AssignmentStatus,
  File,
  FileWithFrontmatter,
} from './types';
// TODO: Move date operations to own file
import { DateTime } from 'luxon';

// TODO: Give these as options from the outside, or use cwd instead
const notesDir = '/home/dennis/Dropbox/orgnzr/';

async function main() {
  // 1. Get all md files in directory
  const mdFilePaths = await getFilePathsWithExtension(notesDir, '.md');
  const files: File[] = await readMultipleFiles(mdFilePaths);
  const filesWithFrontmatter: FileWithFrontmatter[] = files.map((file) => ({
    ...file,
    frontmatter: getFrontmatterFromFile(file),
  }));

  // 2. Filter those who have frontmatter with title, deadline & status
  const filesWithAssignmentFrontmatter = filesWithFrontmatter.filter((file) =>
    validateAssignmentFrontmatter(file.frontmatter)
  );

  // 3. Store the assignments somehow
  // TODO: Move the conversation somewhere else and make it more robust
  const assignmentFiles: AssignmentFile[] = filesWithAssignmentFrontmatter.map(
    (file) => ({
      ...file,
      assignmentData: {
        title: file.frontmatter.TITLE as string,
        deadline: DateTime.fromISO(file.frontmatter.DEADLINE as string),
        status: file.frontmatter.STATUS as AssignmentStatus,
      },
    })
  );

  const assignments: Assignment[] = assignmentFiles
    .map((file) => file.assignmentData)
    .filter((assignment) => assignment.status === AssignmentStatus.OPEN);

  // 4. Print out deadlines chronologically
  // TODO: Move sorting and somewhere else
  const sortedAssignments: Assignment[] = assignments.sort(
    (assignmentDataA, assignmentDataB) =>
      assignmentDataA.deadline < assignmentDataB.deadline ? -1 : 1
  );

  // TODO: Actually beautify it
  const beautifiedAssignments = sortedAssignments
    .map(
      ({ title, deadline }) =>
        `WHEN?: ${deadline
          .setLocale('de')
          .toLocaleString(DateTime.DATETIME_SHORT)} | WHAT?: ${title}`
    )
    .join('\n');

  console.log(beautifiedAssignments);
}

main();
