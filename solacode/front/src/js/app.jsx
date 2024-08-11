import React, { useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/footer";
import Navigation from "./components/nav";

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

function App() {

  const [settings, updateSettings] = useReducer(settingsReducer,{
    theme: 'light',
    lang: 'fa',
  });
  
  useEffect(()=>{
    document.getElementById('root').className = `${settings.theme} ${settings.lang}`;
  },[settings]);

  return (
    <SettingsContext.Provider value={settings}><>
      <header>
        <h1 className="hide">SolaCode</h1>
        <a href="/">
          <img src="/assets/front/img/logo.png" />
        </a>
      </header>
      <Navigation items={navItems} />
      <Outlet />
      <Footer onChangeSettings={updateSettings} />
    </></SettingsContext.Provider>
  );
}

export default App;