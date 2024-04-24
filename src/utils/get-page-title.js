import { settings } from '@/settings'

export default function getPageTitle (pageTitle) {
  const title = settings.title || 'ElementAdmin'
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
