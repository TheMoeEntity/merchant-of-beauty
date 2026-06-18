import { getSiteSettings } from '@/sanity/queries'
import { WhatsAppButton } from './WhatsAppButton'

export async function WhatsAppButtonWrapper() {
  const settings = await getSiteSettings()
  if (!settings?.whatsapp) return null
  return <WhatsAppButton whatsapp={settings.whatsapp} />
}
