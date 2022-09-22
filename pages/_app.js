import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import React, { useEffect, Suspense } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle.min.js') : null;
  }, []);

  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...pageProps} />
      </Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
