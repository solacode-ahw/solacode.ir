import React, { useContext } from "react";
import { Helmet } from "react-helmet";

import { SolaButton } from "../components/basic";

import { home } from "../utils/translations";
import { SettingsContext } from "../utils/context";

import '../../css/home.sass';


function Home() {
  const settings = useContext(SettingsContext);

  return (
    <>
      <Helmet>
        <title>SolaCode</title>
        <meta name="keywords" content={home.keywords[settings.lang]}/>
        <meta name="description" content={home.description[settings.lang]} />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="solacode" />
      </Helmet>
      <h2 className="title">{home.title[settings.lang]}</h2>
      <section id="subs">
        {home.subtitles[settings.lang].map(sub=>
          <h3 className="subtitle" key={sub}>{sub}</h3>
        )}
      </section>
      <article id="about">
        <section className="about-section">
          <img src="/assets/front/img/me-img.jpg" alt={home.alts.me[settings.lang]} />
          <h4>{home.about[settings.lang]}</h4>
        </section>
        <section className="about-section">
          <h4>{home.projects[settings.lang]}</h4>
        </section>
      </article>
      <section id="advert">
        <img src={`/assets/front/img/me-clipart-${settings.theme}.png`} alt={home.alts.art[settings.lang]} />
        <section id="advert-content">
          <p>{home.advert.text[settings.lang]}</p>
          <SolaButton url={`/api/resume-${settings.lang}`} label={home.advert.resume[settings.lang]} arrow={true} />
          <SolaButton url="/hire" label={home.advert.hire[settings.lang]} arrow={true} />
        </section>
      </section>
    </>
  );
}

export default Home;