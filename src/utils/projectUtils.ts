/**
 * Utility functions for project-related operations
 */

/**
 * Safely get the primary language from a project
 * Handles both the new multi-language format and legacy single language format
 * 
 * @param project Project object that may contain languages or language property
 * @returns The primary language as a string, or empty string if none found
 */
export function getPrimaryLanguage(project: any): string {
  if (!project) return '';
  
  // If languages array exists and has items, use the first one
  if (project.languages && Array.isArray(project.languages) && project.languages.length > 0) {
    return project.languages[0];
  }
  
  // Otherwise fall back to the language field or empty string
  return project.language || '';
}
