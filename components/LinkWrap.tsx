import * as React from 'react'
import Link from 'next/link'

type TProps = React.PropsWithChildren<{
  href: string
  id?: string
  className?: string
}>

const LinkWrap: React.ForwardRefExoticComponent<TProps> = React.forwardRef(({ id, href, className, children }, ref: any) => {
  return (
    <Link key={id} href={href} passHref>
      <a className={className} href={href} ref={ref}>
        {children}
      </a>
    </Link>
  )
})

export default LinkWrap