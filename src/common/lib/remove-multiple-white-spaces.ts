export function removeMultipleWhiteSpaces(str: string): string {
  return str.replaceAll('\n', ' ').replace(/\s+/g, ' ').trim()
}
