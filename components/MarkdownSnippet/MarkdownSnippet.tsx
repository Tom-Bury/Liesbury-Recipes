import * as React from 'react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import remark from 'remark'
import html from 'remark-html'
import styles from './MarkdownSnippet.module.css'

type TProps = {
  markdownContent: string
  className?: string
}

const MarkdownSnippet: React.FC<TProps> = ({ markdownContent, className }) => {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    ;(async () => {
      const processed = await remark().use(html).process(markdownContent)
      setHtmlContent(processed ? processed.toString() : 'Syntax error')
    })()
  }, [markdownContent])

  return <div className={classNames(styles.markdownWrap, className)} dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default MarkdownSnippet
