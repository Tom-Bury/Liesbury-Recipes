import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import LinkWrap from '../LinkWrap'
import styles from './LinkCard.module.css'

type TProps = {
  url: string | URL
  title: string
  className?: string
}

const LinkCard: React.FC<TProps> = ({ url, title, className }) => {
  const wrapClasses = classNames('rmMobileClickBox', className)
  const spanClasses = classNames(styles.hoverable, 'flex flex-row align-center hoverable')
  return (
    <LinkWrap href={url} className={wrapClasses}>
      <span className={spanClasses}>
        <h4 className="mr-1  underline">{title}</h4>
        <Image className={styles['dark-icon']} src="/icons/link.svg" alt="Link icon" width={18} height={18} />
      </span>
    </LinkWrap>
  )
}

export default LinkCard
