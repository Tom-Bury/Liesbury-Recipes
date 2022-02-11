import * as React from 'react'
import MarkdownSnippet from '~/components/MarkdownSnippet/MarkdownSnippet'

type TProps = {
  label: string
  id: string
  textAreaValue?: string | undefined
  onChange: (newTextAreaValue: string) => void
}

const MarkdownInputArea: React.FC<TProps> = ({ label, id, textAreaValue, onChange }) => {
  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    const { value } = event.target
    onChange(value)
  }

  return (
    <>
      <p className="font-semibold">{label}</p>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <textarea
            id={id}
            name={id}
            className="w-full min-h-full p-2 rounded-sm bg-lightest focus:outline-none focus:border-primary focus:ring-primary focus:ring-2 resize-y"
            onChange={handleTextAreaChange}
            value={textAreaValue || ''}
            rows={4}
          />
        </div>
        <span className="h-1 w-auto md:h-auto md:w-1 my-4 md:my-0 mx-0 md:mx-4 bg-primary" />
        <div className="flex-1 overflow-auto rounded-sm border-primary border-2">
          <MarkdownSnippet markdownContent={textAreaValue || ''} className="p-2 text-darkest" />
        </div>
      </div>
    </>
  )
}

export default MarkdownInputArea
