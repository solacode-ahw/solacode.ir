import React from "react";
import { Helmet } from "react-helmet";

function Home() {

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="keywords" content="solacode" />
      </Helmet>
      <h2>Home page</h2>
    </>
  );
}

export default Home;