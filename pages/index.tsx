import * as React from 'react'
import { NextPage } from 'next'
import ColumnLayout from 'layouts/ColumnLayout'

const IndexPage: NextPage = () => (
  <ColumnLayout>
    <h1>This is the title</h1>
    <h2>This is the subtitle</h2>
    <p>Some text</p>
  </ColumnLayout>
)

export default IndexPage
