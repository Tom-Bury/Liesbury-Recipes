import * as React from 'react'
import Link from 'next/link'

type TProps = React.PropsWithChildren<{
  href: string
  id?: string
}>

const LinkWrap: React.ForwardRefExoticComponent<TProps> = React.forwardRef(({ id, href, children }, ref) => {
  return (
    <Link key={id} href={href} passHref>
      <a className="w-full" href={href} ref={ref}>
        {children}
      </a>
    </Link>
  )
})

export default LinkWrap
