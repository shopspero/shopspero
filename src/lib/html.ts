/** Escape untrusted text before inserting it into HTML text or quoted attributes. */
export function escapeHtml(value: string | undefined): string {
  return (value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!);
}
