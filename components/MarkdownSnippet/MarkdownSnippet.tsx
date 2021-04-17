import * as React from 'react'
import classNames from 'classnames'
import styles from './MarkdownSnippet.module.css'

type TProps = {
  instructionsHtml: string
  className?: string
}

const MarkdownSnippet: React.FC<TProps> = ({ instructionsHtml, className }) => {
  return <div className={classNames(styles.markdownWrap, className)} dangerouslySetInnerHTML={{ __html: instructionsHtml }} />
}

export default MarkdownSnippet
