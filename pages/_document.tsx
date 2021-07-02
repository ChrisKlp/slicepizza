import { ColorModeScript } from '@chakra-ui/react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import theme from 'styles/theme';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;700&family=Lato:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" type="image/icon" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
