import React from "react";
import Head from "next/head";

interface props {
  title: string;
  description: string;
}

export const Seo = ({ title, description }: props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
