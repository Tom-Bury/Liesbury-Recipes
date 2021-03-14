import * as React from 'react'

const GridLayout: React.FC = ({ children }) => (
  <div className="grid gap-x-5 gap-y-2 justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{children}</div>
)

export default GridLayout
