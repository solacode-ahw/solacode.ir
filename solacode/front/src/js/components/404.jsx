import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { error } from "../utils/translations";
import { SettingsContext } from "../utils/context";


function NotFound() {
  const settings = useContext(SettingsContext);

  return (
    <>
      <Helmet>
        <title>{error.title[settings.lang]}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <h2>hello</h2>
    </>
  );
}

export default NotFound;