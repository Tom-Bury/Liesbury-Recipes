import * as React from 'react'
import classNames from 'classnames'
import styles from './RecipeInstructions.module.css'

type TProps = {
  instructionsHtml: string
  className?: string
}

const RecipeInstructions: React.FC<TProps> = ({ instructionsHtml, className }) => {
  return <div className={classNames(styles.instructions, className)} dangerouslySetInnerHTML={{ __html: instructionsHtml }} />
}

export default RecipeInstructions
