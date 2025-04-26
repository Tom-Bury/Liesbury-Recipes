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
    <Link key={id} href={href} passHref ref={ref} onClick={onClick} className={className}>
      {children}
    </Link>
  )
})

export default LinkWrap
