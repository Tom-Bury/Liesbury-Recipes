import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  // Could extend this if needed: https://nextjs.org/docs/advanced-features/custom-document

  // static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  public render(): JSX.Element {
    return (
      <Html lang="nl">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
