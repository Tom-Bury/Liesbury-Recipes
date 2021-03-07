import * as React from 'react'

const ColumnLayout: React.FC = ({ children }) => {
  return <div className="md:container mx-auto px-4">{children}</div>
}

export default ColumnLayout
