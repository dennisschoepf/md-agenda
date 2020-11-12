export enum AssignmentStatus {
  'OPEN' = 'OPEN',
  'DONE' = 'DONE',
}

export interface Assignment {
  title: string;
  deadline: Date;
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

export interface FrontmatterData {
  [key: string]: string;
}
