// @flow
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head />
        <body className="sidebar-mini white-content" data="green">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
