import Image from 'next/image'
import { LOGO_HEIGHT, LOGO_SRC, LOGO_WIDTH } from '@/lib/site'
import { LogoProps } from '@/types/ui.types'

export function Logo({ height = 48, priority = false, className }: LogoProps) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height)

  return (
    <Image
      src={LOGO_SRC}
      alt="Merchant of Beauty"
      width={width}
      height={height}
      quality={100}
      priority={priority}
      className={className}
    />
  )
}
