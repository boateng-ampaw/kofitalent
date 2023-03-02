import { useEffect, useState } from 'react';
import '../styles/globals.css'
// import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Head from 'next/head'
import Script from 'next/script'
import "bootstrap/dist/css/bootstrap.css";
import NextNProgress from 'nextjs-progressbar';


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // require("bootstrap/dist/js/bootstrap.bundle.min.js");
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap.bundle.min.js') : null
}, [])


  return <>
        <Head>          
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-dark.min.css" crossOrigin="anonymous" /> */}

        {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/js/darkmode.min.js"></script> */}
        </Head>
        {/* <Script id="bootstrap-cdn" src="https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/js/darkmode.min.js" /> */}
        <NextNProgress color="#000" />
        <Component {...pageProps} />
  </>
}

export default MyApp
