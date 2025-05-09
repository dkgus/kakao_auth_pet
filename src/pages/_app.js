import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossorigin />

        <link rel="preconnect" href="https://github.com" crossorigin />
        <link
          rel="preconnect"
          href="https://dapi.kakao.com"
          crossorigin="anonymous"
        />
        <link
          rel="preconnect"
          href="http://t1.daumcdn.net"
          crossorigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://avatars.githubusercontent.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://hangeul.pstatic.net"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://pstatic.net" crossOrigin="" />

        <link
          rel="preload"
          href={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`}
          as="script"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
