import { FrontmatterData } from '../types';

export function validateAssignmentFrontmatter(
  frontmatter: FrontmatterData
): boolean {
  if (!frontmatter.TITLE || !frontmatter.DEADLINE || !frontmatter.STATUS)
    return false;
  return true;
}
