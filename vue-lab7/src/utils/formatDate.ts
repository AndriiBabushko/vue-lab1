export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
