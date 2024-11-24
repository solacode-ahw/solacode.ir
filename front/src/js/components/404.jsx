import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { SolaButton } from "./basic";

import { error } from "../utils/translations";
import { SettingsContext } from "../utils/context";

import '../../css/404.sass';


function NotFound({items}) {
  const settings = useContext(SettingsContext);

  return (
    <>
      <Helmet>
        <title>{error.title[settings.lang]}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <section className="s404">
        <p>{error.pre[settings.lang]}</p>
        <img src={`/assets/front/img/404-${settings.theme}.png`} alt="404" />
        <p>{error.post[settings.lang]}</p>
        <nav>
          {Object.keys(items[settings.lang]).map(key=>
            <SolaButton url={items[settings.lang][key]} key={key} label={key} arrow={true} />
          )}
        </nav>
      </section>
    </>
  );
}

export default NotFound;