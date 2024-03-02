import * as React from 'react'
import Link from 'next/link'

type TProps = React.PropsWithChildren<{
  href: string | URL
  id?: string
  className?: string
  onClick?: () => void
}>

const LinkWrap = React.forwardRef<HTMLAnchorElement, TProps>(({ id, href, className, onClick, children }, ref: any) => {
  return (
    <Link key={id} href={href} passHref>
      <a rel="dns-prefetch" className={className} href={href.toString()} ref={ref} onClick={onClick}>
        {children}
      </a>
    </Link>
  )
})

export default LinkWrap
