import type { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyles from '../ui/core/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>어떤 하루</title>
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
