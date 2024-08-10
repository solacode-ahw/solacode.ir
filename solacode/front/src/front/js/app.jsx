import React, { useReducer } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/footer";

import { SettingsContext, settingsReducer } from "./utils/context";

import '../css/app.sass';


function App() {

  const [settings, updateSettings] = useReducer(settingsReducer,{
    theme: 'light',
    lang: 'fa',
  });

  return (
    <SettingsContext.Provider value={settings}><>
      <header className={settings.theme}>
        <h1 className="hide">SolaCode</h1>
        <a href="/">
          <img src="/assets/front/img/logo.png" />
        </a>
      </header>
      <Outlet />
      <Footer onChangeSettings={updateSettings} />
    </></SettingsContext.Provider>
  );
}

export default App;