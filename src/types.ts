import { DateTime } from 'luxon';

export enum AssignmentStatus {
  'OPEN' = 'OPEN',
  'DONE' = 'DONE',
}

export interface Assignment {
  title: string;
  deadline: DateTime;
  status: AssignmentStatus;
}

export interface AssignmentFile {
  path: string;
  assignmentData: Assignment;
}

export interface File {
  path: string;
  fileContentBuffer: Buffer;
}

export interface FileWithFrontmatter extends File {
  frontmatter: FrontmatterData;
}

export interface AssignmentFile extends FileWithFrontmatter {
  assignmentData: Assignment;
}

export interface FrontmatterData {
  [key: string]: string;
}
