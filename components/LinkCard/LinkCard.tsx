import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Card from '../Card/Card'
import LinkWrap from '../LinkWrap'
import styles from './LinkCard.module.css'

type TProps = {
  url: string
  title: string
}

const LinkCard: React.FC<TProps> = ({ url, title }) => {
  return (
    <LinkWrap href={url}>
      <Card hoverable className={classNames('flex p-8 m-8', styles['card-icon-hoverable'])}>
        <h4 className="text-dark mr-2">{title}</h4>
        <Image className={styles['dark-icon']} src="/icons/link.svg" alt="Link icon" width={24} height={24} />
      </Card>
    </LinkWrap>
  )
}

export default LinkCard
