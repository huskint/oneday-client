import type { AppProps } from 'next/app';
import Head from 'next/head';

import GlobalStyles from '@ui/core/GlobalStyles';
import { StoreProvider } from '@lib/store/stores';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>어떤 하루</title>
      </Head>
      <GlobalStyles />
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}

export default MyApp;
