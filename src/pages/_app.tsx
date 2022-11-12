import type { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import '~/common/styles/base.scss';
import { uiStore } from '~/store/ui';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { overflowMenu, overflowUser } = uiStore();

  useEffect(() => {
    if (overflowMenu) {
      document.body.classList.remove('overflow-auto');
      document.body.classList.add('overflow-hidden');
      return;
    }

    document.body.classList.remove('overflow-hidden');
    document.body.classList.add('overflow-auto');
  }, [overflowMenu]);

  useEffect(() => {
    if (overflowUser) {
      document.body.classList.remove('overflow-auto');
      document.body.classList.add('overflow-hidden');
      return;
    }

    document.body.classList.remove('overflow-hidden');
    document.body.classList.add('overflow-auto');
  }, [overflowUser]);
  return (
    <div id="root">
      {/* <GlobalStyles /> */}
      <Component {...pageProps} />
      {/* <Toastify /> */}
    </div>
  );
};

export default MyApp;
