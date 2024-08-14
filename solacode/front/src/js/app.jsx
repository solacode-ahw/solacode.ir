import React, { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/footer";
import Navigation from "./components/nav";
import NotFound from "./components/404";

import { SettingsContext, settingsReducer } from "./utils/context";

import '../css/app.sass';


const navItems = {
  'fa': {
    'خانه': '/',
    'وبلاگ': '/blog',
    'دانلودها': '/resources',
  },
  'en': {
    'Home': '/',
    'Blog': '/blog',
    'Resources': '/resources',
  }
};

function App({error}) {

  const [settings, updateSettings] = useReducer(settingsReducer,{
    theme: 'light',
    lang: 'fa',
  });
  useEffect(()=>{
    let val = localStorage.getItem('solaTheme');
    if(val && val!==settings.theme){
      updateSettings('theme');
    }
    val = localStorage.getItem('solaLang');
    if(val && val!==settings.lang){
      updateSettings(val);
    }
  },[]);
  
  useEffect(()=>{
    document.getElementById('root').className = `${settings.theme} ${settings.lang}`;
  },[settings]);

  return (
    <SettingsContext.Provider value={settings}><>
      <header>
        <h1 className="hide">SolaCode</h1>
        <a href="/" title="SolaCode Home">
          <img src="/assets/front/img/logo.png" alt="Logo" />
        </a>
      </header>
      {error?
        <NotFound />:
        <>
          <Navigation items={navItems} />
          <section id="body">
            <Outlet />
          </section>
        </>
      }
      <Footer onChangeSettings={updateSettings} />
    </></SettingsContext.Provider>
  );
}

export default App;