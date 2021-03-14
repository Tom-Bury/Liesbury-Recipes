import * as React from 'react'

const LinkWrap: React.ForwardRefExoticComponent<any> = React.forwardRef(({ href, onClick, children }, ref) => {
  return (
    <a className="w-full" href={href} onClick={onClick} ref={ref}>
      {children}
    </a>
  )
})

export default LinkWrap
