import { join } from 'path'

// @react-pdf renders in Node, outside the browser, so it needs a filesystem
// path rather than a public URL.
export function getLogoFilePath(): string {
  return join(process.cwd(), 'public', 'logo.png')
}
